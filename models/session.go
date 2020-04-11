package models

import (
	"time"
)

type Session struct {
	ID        uint32    `gorm:"primary_key;auto_increment" json:"id"`
	UserID    uint32    `gorm:"ForeignKey:id"  json:"user_id"`
	SESSION  string    `gorm:"size:36;not null;unique" json:"sessionid"`
	EXPIRES		time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"expires"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}