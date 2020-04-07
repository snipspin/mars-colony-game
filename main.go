package main

import (
	"os"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"github.com/snipspin/mars-colony-game/controllers"
	"github.com/snipspin/mars-colony-game/models"

)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// fs := http.FileServer(http.Dir("build"))

	r := gin.Default()
	db := models.SetupModels() // new

	r.Use(static.Serve("/", static.LocalFile("./build", true))) // static files have higher priority over dynamic routes
	// when no route is found, serving static files is tried.
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	// r.StaticFS("/", http.Dir("build"))
	// r.StaticFS("/lots/", http.StripPrefix("/lots/", http.Dir("build")))
	r.GET("/users", controllers.FindUsers)

	// r.GET("/", )

	// r.GET("/", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{"data": "hello world"})
	// })

	r.Run(":" + port)

	// http.Handle("/lots/", http.StripPrefix("/lots/", fs))
	// http.ListenAndServe(":"+port, nil)

}
