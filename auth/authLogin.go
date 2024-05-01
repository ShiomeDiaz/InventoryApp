package auth

import (
	"fmt"
	"log" // Importa el paquete log
	"time"

	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/ShiomeDiaz/InventoryApp/services"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

var secretKey = "miClaveSecretaDeDesarrollo" // Clave de ejemplo, cámbiala en producción

func SignIn(username, password string) (string, *models.User, error) {
	// Log para indicar que se está intentando iniciar sesión
	fmt.Printf("Intento de inicio de sesión para el usuario: %s\n", username)

	user, err := services.GetUserByUsername(username)
	log.Printf("usario: %v\n", username)
	if err != nil {
		log.Printf("Error al obtener el usuario: %v\n", err)
		return "", nil, err
	}
	log.Printf("password: %v\n", password)
	log.Printf("password: %v\n", user.Password)
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		log.Printf("Contraseña incorrecta para el usuario: %s\n", username)
		return "", nil, fmt.Errorf("invalid credentials")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"role":     user.Role,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		log.Printf("Error al generar el token: %v\n", err)
		return "", nil, err
	}

	// Log para indicar que el inicio de sesión fue exitoso
	fmt.Printf("Inicio de sesión exitoso para el usuario: %s\n", username)

	return tokenString, &user, nil
}
