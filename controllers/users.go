package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	uuid "github.com/nu7hatch/gouuid"
	"github.com/snipspin/mars-colony-game/models"
)

// SignUp handles /api/signup route
func SignUp(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var json = models.SignUp{}
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

	newManagers := models.Managers{UserID: userCreated.ID, WaterManager: false, FoodManager: false, PeopleManager: false}
	db.Create(&newManagers)
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

	guid, err := uuid.NewV4()
	if err != nil {
		fmt.Println("error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	sessionRecord := models.Session{}
	db.Where("user_id = ?", newUser.ID).First(&sessionRecord)
	if len(sessionRecord.SESSION) == 0 {
		// store new session id
		sessionRecord.UserID = newUser.ID
		sessionRecord.SESSION = fmt.Sprintf("%s", guid)
		sessionRecord.EXPIRES = time.Now().AddDate(0, 1, 0)
		db.Create(&sessionRecord)
	}

	c.Set("userLoggedIn", true)
	c.Set("userID", userCreated.ID)
	c.SetCookie("user", userCreated.Nickname, 0, "/", "", false, true)
	c.SetCookie("sessionid", sessionRecord.SESSION, 0, "/", "", false, true)
	// respond with user created, the stockpile and default buildings
	c.JSON(http.StatusOK, gin.H{"status": "created", "stockpile": db.Where("user_id = ?", userCreated.ID).First(&newStockpile), "buildings": newBuildings, "user": userCreated, "session": sessionRecord})
	return
}

func SignIn(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var json = models.SignIn{}
	errStr := ""
	errStrSet := false
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if len(json.Nickname) == 0 && len(json.Email) == 0 {
		errStr += "No username or email found. "
		errStrSet = true
	}

	if len(json.Password) == 0 {
		errStr += "No password found. "
		errStrSet = true
	}

	if errStrSet {
		c.JSON(http.StatusBadRequest, gin.H{"error": errStr})
		return
	}

	userRecord := models.User{}
	// check if there is a user record with provided nickname
	if hasNick := UserExists(db, json.Nickname); hasNick == true {
		db.Where("nickname = ?", json.Nickname).First(&userRecord)
	} else if hasEmail := EmailExists(db, json.Email); hasEmail == true {
		// or if there is a user record with provided email
		db.Where("email = ?", json.Email).First(&userRecord)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No record found"})
		return
	}
	// compare passwords
	if hasPassword := models.VerifyPassword(userRecord.Password, json.Password); hasPassword == nil {
		// user exists
		// create a GUID
		guid, err := uuid.NewV4()
		if err != nil {
			fmt.Println("error:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		sessionRecord := models.Session{UserID: userRecord.ID, SESSION: fmt.Sprintf("%s", guid), EXPIRES: time.Now().AddDate(0, 1, 0)}
		db.Where("user_id = ?", userRecord.ID).Assign(sessionRecord).FirstOrCreate(&sessionRecord)

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
		userManagers := models.Managers{}
		if err := db.Where("user_id = ?", userRecord.ID).Find(&userManagers).Error; err != nil {
			userManagers = models.Managers{UserID: userRecord.ID, WaterManager: false, FoodManager: false, PeopleManager: false}
			db.Create(&userManagers)
			//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			//return
		}
		c.Set("userLoggedIn", true)
		c.Set("userID", userRecord.ID)
		c.SetCookie("user", userRecord.Nickname, 0, "/", "", false, true)
		c.SetCookie("sessionid", sessionRecord.SESSION, 0, "/", "", false, true)
		c.JSON(http.StatusOK, gin.H{"status": "success", "data": userRecord, "session": sessionRecord, "Resources": userResources, "Buildings": userBuildings, "Managers": userManagers})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": hasPassword.Error()})
	}
}

func SignOut(c *gin.Context) {
	if c.MustGet("userLoggedIn") == true {
		db := c.MustGet("db").(*gorm.DB)
		sessionRecord := models.Session{}
		db.Where("user_id = ?", c.MustGet("userID")).First(&sessionRecord)
		db.Delete(&sessionRecord)

		c.Set("userLoggedIn", false)
		c.Set("userID", 0)
		c.SetCookie("user", "", 0, "/", "", false, true)
		c.SetCookie("sessionid", "", 0, "/", "", false, true)
		c.JSON(http.StatusOK, gin.H{"status": "success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not signed in"})
	}
}
func UserExists(conn *gorm.DB, nickname string) bool {
	userRecord := models.User{}
	conn.Where("nickname = ?", nickname).First(&userRecord)
	if userRecord.Nickname != "" {
		return true
	}
	return false
}

func EmailExists(conn *gorm.DB, email string) bool {
	userRecord := models.User{}
	conn.Where("email = ?", email).First(&userRecord)
	if userRecord.Email != "" {
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
