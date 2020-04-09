package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/snipspin/mars-colony-game/models"
)

func GetUserState(c *gin.Context) {
	// // db := c.MustGet("db").(*gorm.DB)
	// newBuildings := [9]models.SingleBuilding{}
	// newMultiBuildings := models.MultiBuildings{Building: newBuildings}

	// emptyUserState := models.SaveUserState{Buildings: newMultiBuildings}
	c.JSON(http.StatusOK, gin.H{"data": "emptyUserState"})
}

func SetUserState(c *gin.Context) {
	// db := c.MustGet("db").(*gorm.DB)
	json := models.SaveUserState{}

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": json})
	return
}
