package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Computer struct {
	gorm.Model
	ID           uuid.UUID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Type         string    `gorm:"type:varchar(10)"`
	Brand        string    `gorm:"type:varchar(20)"`
	Reference    string    `gorm:"type:varchar(50)"`
	Processor    string    `gorm:"type:varchar(50)"`
	RAM          int
	Storage      int
	HasEthernet  bool
	HasWifi      bool
	HasBluetooth bool
	GPU          string `gorm:"type:varchar(100)"`
	Battery      string `gorm:"type:varchar(10)"`
	PurchaseDate string `gorm:"type:date"`
	Status       string `gorm:"type:varchar(50)"`
	CompanyID    string `gorm:"type:varchar(10);unique"`
}
