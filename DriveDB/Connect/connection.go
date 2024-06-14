package connect

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host=localhost user=postgres password=password dbname=inventor port=5432 sslmode=disable"
var DB *gorm.DB

func DBConnection() {
	var err error
	DB, err = gorm.Open(postgres.New(postgres.Config{
		DSN:                  DSN,
		PreferSimpleProtocol: true, // Disable implicit prepared statement usage
	}), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("DBConnected")
	}

	// Habilitar la extensión uuid-ossp
	if err := DB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"").Error; err != nil {
		log.Fatal(err)
	}
}
