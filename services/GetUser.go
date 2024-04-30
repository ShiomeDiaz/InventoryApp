package services

import (
	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
)

func GetUserByUsername(username string) (models.User, error) {
	var user models.User
	result := connect.DB.Where("user_name = ?", username).First(&user)
	if result.Error != nil {
		return models.User{}, result.Error
	}
	return user, nil
}
