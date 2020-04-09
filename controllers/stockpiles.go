package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	// "github.com/snipspin/mars-colony-game/models"
)

func GetUserStockpile(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"newBuildings": "new", "exists": true})
}
