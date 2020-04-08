package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/snipspin/mars-colony-game/controllers"
	"github.com/snipspin/mars-colony-game/models"
	"github.com/snipspin/mars-colony-game/packages/db"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// fs := http.FileServer(http.Dir("build"))

	r := gin.Default()

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

	// serve static files first
	r.Use(static.Serve("/", static.LocalFile("./build", true)))

	r.GET("/users", controllers.FindUsers)

	r.GET("/test", func(c *gin.Context) {
		// create a new user
		userRecord := models.User{}
		var newUser = models.User{Nickname: "TestRouteUser", Email: "testrouteuser@example.com", Password: "3yV-HyCPHEf9CYPZWELUy3eoaWTMrb9K"}
		var newStockpile = models.Stockpile{}
		result := conn.NewRecord(&newUser)
		if result {
			conn.Create(&newUser)
			result = conn.NewRecord(&newUser)
			if !result {
				// create a new stockpile for that user
				conn.Where("nickname = ?", newUser.Nickname).First(&userRecord)
				// store that record in a variable
				newStockpile = models.Stockpile{UserID: userRecord.ID, Water: "100", Food: "100", People: "100"}
				conn.Create(&newStockpile)
				result = conn.NewRecord(&newStockpile)
				// delete the records
				if result {
					fmt.Println("Stockpile not created")
				} else {
					conn.Where("user_id = ?", newUser.ID).Delete(&models.Stockpile{})
				}
				conn.Where("nickname = ?", newUser.Nickname).Delete(&models.User{})
			}
		}
		// respond with the users data and stockpile
		c.JSON(http.StatusOK, gin.H{"stockpile": newStockpile, "user": userRecord})
	})

	r.Run(":" + port)
}
