package models

import "gorm.io/gorm"

type ComputerAccessory struct {
	gorm.Model
	ComputerID  int
	AccessoryID int
}
