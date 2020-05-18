package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/snipspin/mars-colony-game/models"
)

func GetUserState(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	userRecord := models.User{}

	// check if the user is logged in or not
	if c.MustGet("userLoggedIn") == false || c.MustGet("userID") == 0 {
		json := models.LoadUserState{}

		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// get the user record with transmitted data
		if err := db.Where("nickname = ?", json.Nickname).First(&userRecord).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		// get the user record with context data
		if err := db.Where("id = ?", c.MustGet("userID")).First(&userRecord).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	// get the users resources
	userResources := models.Stockpile{}
	if err := db.Where("user_id = ?", userRecord.ID).First(&userResources).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// get the users buildings
	userBuildings := []models.Building{}
	if err := db.Where("user_id = ?", userRecord.ID).Find(&userBuildings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//get the users managers
	userManagers := models.Managers{WaterManager: false, FoodManager: false, PeopleManager: false}
	if err := db.Where("user_id = ?", userRecord.ID).Find(&userManagers).Error; err != nil {
		return
		//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"test": "test", "user": userRecord.Nickname, "Resources": userResources, "Buildings": userBuildings, "Managers": userManagers})
}

func SetUserState(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userRecord := models.User{}
	json := models.SaveUserState{}
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// check if the user is logged in or not
	if c.MustGet("userLoggedIn") == false || c.MustGet("userID") == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not signed in"})
		return

	} else {
		// get the user record with context data
		if err := db.Where("id = ?", c.MustGet("userID")).First(&userRecord).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	// take the resources from json and update the stockpile table
	saveResources(db, json.Resources, userRecord)
	saveManagers(db, json.ManagersExtern, userRecord)
	// take the buildings from json and store them
	buildingRecord := models.Building{}
	buildingRecord.UserID = userRecord.ID

	saveBuildings(db, json.Buildings.Building, userRecord)
	c.JSON(http.StatusOK, gin.H{"status": "success", "Buildings": json.Buildings.Building, "Managers": json.ManagersExtern})
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
func saveManagers(db *gorm.DB, r models.ManagersExtern, u models.User) error {
	tx := db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()
	managersRecord := models.Managers{}
	tx.Where("user_id = ?", u.ID).First(&managersRecord)
	managersRecord.WaterManager = r.WaterManager
	managersRecord.FoodManager = r.FoodManager
	managersRecord.PeopleManager = r.PeopleManager
	if err := tx.Save(&managersRecord).Error; err != nil {
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
