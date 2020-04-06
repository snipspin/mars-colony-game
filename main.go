package main

import (
	"os"
<<<<<<< HEAD
	"github.com/gin-gonic/gin"
=======

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/snipspin/mars-colony-game/controllers"
	"github.com/snipspin/mars-colony-game/models"
>>>>>>> 838101191badaa141d68ed014939558b1af7e51c
)

func main() {
	r := gin.Default()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
<<<<<<< HEAD
	r.GET("/", func(c ))
	fs := http.FileServer(http.Dir("build"))
	http.Handle("/", fs)
	http.ListenAndServe(":"+port, nil)
=======
	// fs := http.FileServer(http.Dir("build"))

	r := gin.Default()
	db := models.SetupModels() // new

	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})
	r.Use(static.Serve("/", static.LocalFile("./build", true))) // static files have higher priority over dynamic routes
	// when no route is found, serving static files is tried.

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
>>>>>>> 838101191badaa141d68ed014939558b1af7e51c
}
