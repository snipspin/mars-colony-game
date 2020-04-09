package models

import (
	"time"
)

type Stockpile struct {
	ID        uint32    `gorm:"primary_key;auto_increment" json:"id"`
	UserID    uint32    `gorm:"ForeignKey:id"  json:"user_id"`
	Water     string    `gorm:"size:100;not null;default:'100'" json:"water"`
	Food      string    `gorm:"size:100;not null;default:'100'" json:"food"`
	People    string    `gorm:"size:100;not null;default:'100'" json:"people"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}
