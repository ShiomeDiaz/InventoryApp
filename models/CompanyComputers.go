package models

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CompanyComputer struct {
	gorm.Model
	ID         uuid.UUID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()"` // Verificar compatibilidad con la base de datos
	ComputerID uuid.UUID `gorm:"type:uuid;not null;unique"`                        // Asegura que no haya duplicados
	CompanyID  uuid.UUID `gorm:"type:uuid;not null"`
}

// BeforeCreate verifica unicidad y asigna un ID si es necesario
func (cc *CompanyComputer) BeforeCreate(tx *gorm.DB) (err error) {
	// Validar si el computador ya está asignado
	var existingCount int64
	if err := tx.Model(&CompanyComputer{}).Where("computer_id = ?", cc.ComputerID).Count(&existingCount).Error; err != nil {
		return err
	}
	if existingCount > 0 {
		return errors.New("el computador ya está asignado a otra empresa")
	}

	// Generar un nuevo ID si aún no está definido
	if cc.ID == uuid.Nil {
		cc.ID = uuid.New()
	}
	return nil
}

// AfterCreate actualiza el estado del computador tras la asignación
func (cc *CompanyComputer) AfterCreate(tx *gorm.DB) error {
	var company Company
	var computer Computer

	// Buscar el nombre de la empresa usando CompanyID
	if err := tx.First(&company, "id = ?", cc.CompanyID).Error; err != nil {
		return errors.New("empresa no encontrada")
	}

	// Buscar el computador usando ComputerID
	if err := tx.First(&computer, "id = ?", cc.ComputerID).Error; err != nil {
		return errors.New("computador no encontrado")
	}

	// Actualizar el estado del computador
	computer.Status = "Asignado a " + company.Name
	if err := tx.Save(&computer).Error; err != nil {
		return errors.New("no se pudo actualizar el estado del computador")
	}

	return nil
}

// AfterDelete restablece el estado del computador tras su eliminación
func (cc *CompanyComputer) AfterDelete(tx *gorm.DB) error {
	var computer Computer

	// Buscar el computador asociado
	if err := tx.First(&computer, "id = ?", cc.ComputerID).Error; err != nil {
		return errors.New("computador no encontrado")
	}

	// Restablecer el estado del computador
	computer.Status = "Bodega"
	if err := tx.Save(&computer).Error; err != nil {
		return errors.New("no se pudo restablecer el estado del computador")
	}

	return nil
}
