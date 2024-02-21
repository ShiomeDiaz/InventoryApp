package models

import "gorm.io/gorm"

type User struct {
	gorm.Model

	UserName string `gorm:"type:varchar(50);not null"`
	Password string `gorm:"type:varchar(50);not null"`
}
