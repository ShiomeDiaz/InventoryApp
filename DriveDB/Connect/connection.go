package connect

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai"
// db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
var DSN = "host=localhost user=postgres password=password dbname=inventor port=5432 sslmode=disable"
var DB *gorm.DB

func DBConnection() {
	var error error
	DB, error = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if error != nil {
		log.Fatal(error)
	} else {
		log.Println("DBConnected")
	}
}
