package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func SetupModels(conn *gorm.DB) {
	conn.AutoMigrate(&User{})
	conn.AutoMigrate(&Stockpile{})
	conn.AutoMigrate(&Building{})
	conn.AutoMigrate(&Session{})
	conn.AutoMigrate(&Managers{})
	// Add the foreign key
	conn.Model(&Stockpile{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	conn.Model(&Building{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	conn.Model(&Managers{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
}
