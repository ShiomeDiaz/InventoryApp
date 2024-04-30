package auth

import (
	"fmt"
	"time"

	"github.com/ShiomeDiaz/InventoryApp/services"

	"github.com/golang-jwt/jwt"
)

func SignIn(username, password string) (string, error) {
	fmt.Println("oh oh")
	user, err := services.GetUserByUsername(username)
	if err != nil {
		fmt.Println("oh oh")
		return "", err
	}

	// Verificar contraseña en texto plano
	if user.Password != password {
		fmt.Println("oh oh")
		return "", fmt.Errorf("invalid credentials")
	}

	// Si las credenciales son correctas, genera el token JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte("your_secret_key")) // Asegúrate de usar una clave secreta segura y consistente
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
