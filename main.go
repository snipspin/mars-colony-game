package main

import (
	"net/http"
	"os"

	static "github.com/gin-gonic/contrib/static"
	gin "github.com/gin-gonic/gin"
	controllers "github.com/snipspin/mars-colony-game/controllers"
	models "github.com/snipspin/mars-colony-game/models"
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

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "pong"})
	})

	r.Run(":" + port)
}
