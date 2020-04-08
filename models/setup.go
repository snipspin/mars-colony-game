package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func SetupModels(conn *gorm.DB) {
	conn.AutoMigrate(&User{})
}
