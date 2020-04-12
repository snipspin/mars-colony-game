package main

import (
	"os"
	"fmt"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
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

	r.POST("/api/signup", controllers.SignUp)
	r.POST("/api/signin", controllers.SignIn)
	r.POST("/api/checknick", controllers.CheckForNickname)
	r.POST("/api/save", controllers.SetUserState)
	r.POST("/api/load", controllers.GetUserState)

	r.Run(":" + port)
}
