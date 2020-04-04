package main

import (
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fs := http.FileServer(http.Dir("build"))
	http.Handle("/", fs)
	http.ListenAndServe(":"+port, nil)
}
