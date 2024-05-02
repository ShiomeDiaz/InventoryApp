package models

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CompanyComputer struct {
	gorm.Model
	ID         uuid.UUID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	ComputerID uuid.UUID `gorm:"type:uuid;not null;unique"`
	CompanyID  uuid.UUID `gorm:"type:uuid;not null"`
}

func (cc *CompanyComputer) BeforeCreate(tx *gorm.DB) (err error) {
	// Verifica si ya existe un registro con el mismo ComputerID
	var existingCount int64
	if err := tx.Model(&CompanyComputer{}).Where("computer_id = ?", cc.ComputerID).Count(&existingCount).Error; err != nil {
		return err
	}
	if existingCount > 0 {
		return errors.New("este computador ya ha sido asignado a una empresa")
	}

	// Genera un nuevo ID si aún no está definido
	if cc.ID == uuid.Nil {
		cc.ID = uuid.New()
	}
	return nil
}

func (cc *CompanyComputer) AfterCreate(tx *gorm.DB) error {
	var company Company
	var computer Computer

	// Buscar el nombre de la empresa usando CompanyID.
	if err := tx.First(&company, "id = ?", cc.CompanyID).Error; err != nil {
		return err
	}

	// Buscar el computador para actualizar su estado.
	if err := tx.First(&computer, "id = ?", cc.ComputerID).Error; err != nil {
		return err
	}

	// Actualizar el estado del computador con el nombre de la empresa.
	computer.Status = company.Name
	if err := tx.Save(&computer).Error; err != nil {
		return err
	}

	return nil
}

func (cc *CompanyComputer) AfterDelete(tx *gorm.DB) error {
	var computer Computer

	// Buscar el computador asociado.
	if err := tx.First(&computer, "id = ?", cc.ComputerID).Error; err != nil {
		return err
	}

	// Restablecer el estado del computador a "Bodega".
	computer.Status = "Bodega"
	if err := tx.Save(&computer).Error; err != nil {
		return err
	}

	return nil
}
