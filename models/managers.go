package models

import (
	"time"
)

type Managers struct {
	ID            uint32    `gorm:"primary_key;auto_increment" json:"id"`
	UserID        uint32    `gorm:"ForeignKey:id"  json:"user_id"`
	WaterManager  bool      `gorm:"default:FALSE" json:"waterManager"`
	FoodManager   bool      `gorm:"default:FALSE" json:"foodManager"`
	PeopleManager bool      `gorm:"default:FALSE" json:"peopleManager"`
	CreatedAt     time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt     time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}
