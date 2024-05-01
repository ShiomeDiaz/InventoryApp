package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Role string

const (
	RoleAdmin Role = "admin"
	RoleUser  Role = "user"
)

type User struct {
	gorm.Model
	ID       uuid.UUID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	UserName string    `gorm:"type:varchar(50);not null;unique"`
	Password string    `gorm:"type:varchar(100);not null"` // Asegurando que la contraseña no se incluya en respuestas JSON
	Role     Role      `gorm:"type:varchar(20);not null"`
}

func (r Role) GormDataType() string {
	return "varchar(20)"
}
