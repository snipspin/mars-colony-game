package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/snipspin/mars-colony-game/models"
)

func GetUserStockpile(c *gin.Context) {
	// db := c.MustGet("db").(*gorm.DB)
	json := models.CheckNick{}
	// check if context matches requirements
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// check if there is a user with that nickname and respond
	c.JSON(http.StatusOK, gin.H{"nickname": json.Nickname, "exists": true})
}
