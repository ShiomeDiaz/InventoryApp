package models

import "gorm.io/gorm"

type Employer struct {
	gorm.Model

	Name     string `gorm:"type:varchar(50);not null"`
	LastName string `gorm:"type:varchar(50);not null"`
	UserID   uint
	Email    string `gorm:"not null; unique_index"`
	JobTitle string
	Done     bool `gorm:"default:false"`
}
