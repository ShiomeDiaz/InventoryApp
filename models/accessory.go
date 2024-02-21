package models

import "gorm.io/gorm"

type Accessory struct {
	gorm.Model
	Name string `gorm:"type:varchar(50)"`
}
