package main

import (
	"net/http"
	"os"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.GET("/", func(c ))
	fs := http.FileServer(http.Dir("build"))
	http.Handle("/", fs)
	http.ListenAndServe(":"+port, nil)
}
