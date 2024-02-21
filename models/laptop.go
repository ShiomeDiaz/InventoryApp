package models

import "gorm.io/gorm"

type Laptop struct {
	gorm.Model

	AFId          int16  `gorm:"not null"`
	Brand         string `gorm:"type:varchar(50);not null"`
	ModelLap      string
	Cpu           string `gorm:"not null; unique_index"`
	Gpu           string
	Storage       int `gorm:"default:false"`
	Ram           int `gorm:"default:false"`
	BatteryStatus string
}
