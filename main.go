package main

import (
	"os"
	"time"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/snipspin/mars-colony-game/controllers"
	"github.com/snipspin/mars-colony-game/db"
	"github.com/snipspin/mars-colony-game/models"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()

	// serve static files first
	r.Use(static.Serve("/", static.LocalFile("./build", true)))

	db := db.NewDBConnection()
	conn, err := db.Open()

	if err != nil {
		panic("failed to connect database")
	}
	defer conn.Close()

	// setup database models
	models.SetupModels(conn)

	// set db variable to conn
	r.Use(func(c *gin.Context) {
		c.Set("db", conn)
		c.Next()
	})

	// check if user logged in
	r.Use(func(c *gin.Context) {
		db := c.MustGet("db").(*gorm.DB)
		t := [2]bool{false,false}
		u, err := c.Cookie("user")
		if err == nil {
			c.Set("user", u)
			t[0] = true
		}
		s, err := c.Cookie("sessionid")
		if err == nil {
			c.Set("sessionid", s)
			t[1] = true
		}

		c.Set("userLoggedIn", false)
		c.Set("userID", 0)
		if t[0] && t[1] {
			userRecord := models.User{}
			sessionRecord := models.Session{}

			db.Where("nickname = ?", u).First(&userRecord)
			if userRecord.ID > 0 {
				// user exists
				db.Where("user_id = ? AND session = ?", userRecord.ID, s).First(&sessionRecord)
				if sessionRecord.ID > 0 {
					if sessionRecord.EXPIRES.After(time.Now()) {
						c.Set("userLoggedIn", true)
						c.Set("userID", userRecord.ID)
					}
				}
			}
		}
		c.Next()
	})

	r.POST("/api/signup", controllers.SignUp)
	r.POST("/api/signin", controllers.SignIn)
	r.POST("api/signout", controllers.SignOut)
	r.POST("/api/checknick", controllers.CheckForNickname)
	r.POST("/api/save", controllers.SetUserState)
	r.POST("/api/load", controllers.GetUserState)

	r.Run(":" + port)
}
