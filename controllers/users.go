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
	var json = models.Login{}
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create the temporary data
	newUser := models.User{Nickname: json.Nickname, Email: json.Email, Password: json.Password}
	newUser.Prepare()

	// validate user data and respond with an error if any
	err := newUser.Validate("")
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err})
		return
	}

	// create the new user
	userCreated, err := newUser.SaveUser(db)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err})
		return
	}

	// create a new stockpile for the new user
	newStockpile := models.Stockpile{UserID: userCreated.ID, Water: "100", Food: "100", People: "100"}
	db.Create(&newStockpile)

	// create new buildings

	// respond with user created, the stockpile and default buildings
	c.JSON(http.StatusOK, gin.H{"status": "created", "stockpile": db.Where("user_id = ?", userCreated.ID).First(&newStockpile)})
	return
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
	json := models.CheckNick{}
	// check if context matches requirements
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// check if there is a user with that nickname and respond
	c.JSON(http.StatusOK, gin.H{"nickname": json.Nickname, "exists": UserExists(db, json.Nickname)})
}
