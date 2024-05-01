package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Company representa una entidad de empresa en la base de datos.
type Company struct {
	gorm.Model
	ID         uuid.UUID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	NIT        string    `gorm:"type:varchar(100);not null;unique"`
	Name       string    `gorm:"type:varchar(100);not null"`
	Address    string    `gorm:"type:varchar(255);not null"`
	City       string    `gorm:"type:varchar(50);not null"`
	Country    string    `gorm:"type:varchar(50);not null"`
	PostalCode string    `gorm:"type:varchar(20);not null"`
	Phone      string    `gorm:"type:varchar(20);not null"`
	Email      string    `gorm:"type:varchar(100);not null"`
	Website    string    `gorm:"type:varchar(100)"`
}

// Antes de crear una empresa, asegúrate de que el ID se genere si no se ha proporcionado.
func (company *Company) BeforeCreate(tx *gorm.DB) (err error) {
	if company.ID == uuid.Nil {
		company.ID = uuid.New()
	}
	return
}
