package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/snipspin/mars-colony-game/models"
)

func FindUsers(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var users []models.User
	db.Find(&users)
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func SignUp(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var json = models.UserJson{}
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// create the temporary data
	newUser := models.User{Nickname: json.Nickname, Email: json.Email, Password: json.Password}
	userRecord := models.User{}
	newStockpile := models.Stockpile{}
	// check if user exists in db
	isUser := UserExists(db, json.Nickname)
	// create the new user
	if !isUser {
		db.Create(&newUser)
		db.Where("nickname = ?", newUser.Nickname).First(&userRecord)
		newStockpile = models.Stockpile{UserID: userRecord.ID, Water: "100", Food: "100", People: "100"}
		db.Create(&newStockpile)
		// respond with user created
		c.JSON(http.StatusOK, gin.H{"status": "created", "stockpile": db.Where("user_id = ?", userRecord.ID).First(&newStockpile)})
		return
	}
	// respond with user exists
	c.JSON(http.StatusOK, gin.H{"status": "exists"})
}

func UserExists(conn *gorm.DB, nickname string) bool {
	userRecord := models.User{}
	conn.Where("nickname = ?", nickname).First(&userRecord)
	if userRecord.Nickname != "" {
		return true
	}
	return false
}

func CheckForNickname(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	json := models.NickJson{}
	// check if context matches requirements
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// check if there is a user with that nickname and respond
	c.JSON(http.StatusOK, gin.H{"nickname": json.Nickname, "exists": UserExists(db, json.Nickname)})
}
