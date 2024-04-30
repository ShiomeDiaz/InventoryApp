package models

import "gorm.io/gorm"

type Computer struct {
	gorm.Model
	Type         string `gorm:"type:varchar(10)"`
	Brand        string `gorm:"type:varchar(20)"`
	Reference    string `gorm:"type:varchar(50)"`
	Processor    string `gorm:"type:varchar(50)"`
	RAM          int
	Storage      int
	HasEthernet  bool
	HasWifi      bool
	HasBluetooth bool
	GPU          string `gorm:"type:varchar(100)"`
	Battery      string `gorm:"type:varchar(10)"`
	PurchaseDate string `gorm:"type:date"`
	Status       string `gorm:"type:varchar(10)"`
	CompanyID    string `gorm:"type:varchar(10);unique"`
}
