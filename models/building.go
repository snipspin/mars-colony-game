package models

import (
	"time"
)

type Building struct {
	ID        uint32    `gorm:"primary_key;auto_increment" json:"id"`
	UserID    uint32    `gorm:"ForeignKey:id"  json:"user_id"`
	Type      string    `gorm:"size:100;not null;default:'100'" json:"type"`
	Level     string    `gorm:"size:100;not null;default:'100'" json:"level"`
	Lot       string    `gorm:"size:100;not null;default:'100'" json:"lot"`
	Amount    string    `gorm:"size:100;not null;default:'100'" json:"amount"`
	Timer     string    `gorm:"size:100;not null;default:'100'" json:"timer"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}
