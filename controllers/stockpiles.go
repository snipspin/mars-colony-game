package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/snipspin/mars-colony-game/models"
)

func GetUserState(c *gin.Context) {
	newMultiBuildings := models.MultiBuildings{Building: []models.SingleBuilding{
		models.SingleBuilding{Type: "People", Level: "1", Lot: "0", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Water", Level: "1", Lot: "1", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Food", Level: "1", Lot: "2", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Food", Level: "1", Lot: "3", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Water", Level: "1", Lot: "4", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Empty", Level: "0", Lot: "5", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Empty", Level: "0", Lot: "6", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Empty", Level: "0", Lot: "7", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Empty", Level: "0", Lot: "8", Amount: "0", Timer: "0"},
		models.SingleBuilding{Type: "Empty", Level: "0", Lot: "9", Amount: "0", Timer: "0"},
	}}

	emptyUserState := models.SaveUserState{Buildings: newMultiBuildings}
	c.JSON(http.StatusOK, gin.H{"data": emptyUserState})
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
	db.Where("nickname = ?", json.Nickname).First(&userRecord)
	if userRecord.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User does not exist"})
		return
	}
	// take the resources from json and update the stockpile table
	SaveResources(db, json.Resources, userRecord)
	// take the buildings from json and store them
	buildingRecord := models.Building{}
	buildingRecord.UserID = userRecord.ID

	SaveBuildings(db, json.Buildings.Building, userRecord)
	c.JSON(http.StatusOK, gin.H{"jb": len(json.Buildings.Building), "u": json.Nickname, "r": json.Resources, "f": json.Resources.Food})
	return
}

func SaveResources(db *gorm.DB, r models.Resources, u models.User) error {
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

func SaveBuildings(db *gorm.DB, b []models.SingleBuilding, u models.User) error {
	tx := db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	if err := tx.Delete(&models.Building{UserID: u.ID}).Error; err != nil {
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
