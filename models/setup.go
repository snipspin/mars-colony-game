package models

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func SetupModels() *gorm.DB {
	sqlport := os.Getenv("SQLPORT")
	if sqlport == "" {
		sqlport = "5432"
	}
	sqlhost := os.Getenv("SQLHOST")
	if sqlhost == "" {
		sqlhost = "localhost"
	}
	sqldb := os.Getenv("SQLDB")
	if sqldb == "" {
		sqldb = "marsian"
	}
	sqluser := os.Getenv("SQLUSER")
	if sqluser == "" {
		sqluser = "postgres"
	}
	sqlpassword := os.Getenv("SQLPASSWORD")
	if sqlpassword == "" {
		sqlpassword = "postgres"
	}
	dbURI := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", sqlhost, sqluser, sqlpassword, sqldb)
	db, err := gorm.Open("postgres", dbURI)
	defer db.Close()

	if err != nil {
		fmt.Println(err)
		panic("Failed to connect to database!")
	}

	db.AutoMigrate(&User{})
	return db
}
