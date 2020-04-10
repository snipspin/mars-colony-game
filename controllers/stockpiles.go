package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/snipspin/mars-colony-game/models"
)

func GetUserState(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	json := models.LoadUserState{}

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// get the user record
	userRecord := models.User{}
	if err := db.Where("nickname = ?", json.Nickname).First(&userRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// get the users resources
	userResources := models.Stockpile{}
	if err := db.Where("user_id = ?", userRecord.ID).First(&userResources).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error3": err.Error()})
		return
	}
	// get the users buildings
	userBuildings := []models.Building{}
	if err := db.Where("user_id = ?", userRecord.ID).Find(&userBuildings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error4": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": userRecord.Nickname, "Resources": userResources, "Buildings": userBuildings})
}

func SetUserState(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	json := models.SaveUserState{}

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// take the user from json and check if it exists, return an error if it doesn't
	userRecord := models.User{}
	if err := db.Where("nickname = ?", json.Nickname).First(&userRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// take the resources from json and update the stockpile table
	saveResources(db, json.Resources, userRecord)

	// take the buildings from json and store them
	buildingRecord := models.Building{}
	buildingRecord.UserID = userRecord.ID

	saveBuildings(db, json.Buildings.Building, userRecord)
	c.JSON(http.StatusOK, gin.H{"status": "success"})
	return
}

func saveResources(db *gorm.DB, r models.Resources, u models.User) error {
	tx := db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	stockpileRecord := models.Stockpile{}
	tx.Where("user_id = ?", u.ID).First(&stockpileRecord)
	stockpileRecord.Food = r.Food
	stockpileRecord.Water = r.Water
	stockpileRecord.People = r.People

	if err := tx.Save(&stockpileRecord).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func saveBuildings(db *gorm.DB, b []models.SingleBuilding, u models.User) error {
	tx := db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	if err := tx.Where("user_id = ?", u.ID).Delete(&models.Building{UserID: u.ID}).Error; err != nil {
		tx.Rollback()
		return err
	}

	for _, e := range b {
		if err := tx.Create(&models.Building{UserID: u.ID, Type: e.Type, Level: e.Level, Lot: e.Lot, Amount: e.Amount, Timer: e.Timer}).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}
