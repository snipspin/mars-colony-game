package controllers

import (
	"net/http"
	"strconv"

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
	newBuildings := [9]models.Building{}
	setNewBuilding("People", "0", &newBuildings[0], userCreated)
	setNewBuilding("Water", "1", &newBuildings[1], userCreated)
	setNewBuilding("Food", "2", &newBuildings[2], userCreated)
	lot := strconv.Itoa(3)
	for count := 3; count <= 8; count++ {
		lot = strconv.Itoa(count)
		setNewBuilding("Empty", lot, &newBuildings[count], userCreated)
	}

	for _, cb := range newBuildings {
		db.Create(&cb)
	}

	// respond with user created, the stockpile and default buildings
	c.JSON(http.StatusOK, gin.H{"status": "created", "stockpile": db.Where("user_id = ?", userCreated.ID).First(&newStockpile), "buildings": newBuildings, "user": userCreated})
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

func setNewBuilding(bType string, bLot string, b *models.Building, u *models.User) {
	b.UserID = u.ID
	b.Type = bType
	b.Level = "1"
	b.Lot = bLot
	b.Amount = "0"
	b.Timer = "0"
}
