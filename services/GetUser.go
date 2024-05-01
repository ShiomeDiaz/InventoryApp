package services

import (
	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
)

func GetUserByUsername(username string) (models.User, error) {
	var user models.User
	result := connect.DB.Where("user_name = ?", username).Take(&user)
	if result.Error != nil {
		return models.User{}, result.Error
	}
	return user, nil
}

// func PostUsersHandler(w http.ResponseWriter, r *http.Request) {
// 	var user models.User
// 	json.NewDecoder(r.Body).Decode(&user)

// 	// Comentar o eliminar la sección de hashing de la contraseña
// 	// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
// 	// if err != nil {
// 	//     w.WriteHeader(http.StatusInternalServerError)
// 	//     w.Write([]byte("Error hashing password"))
// 	//     return
// 	// }
// 	// user.Password = string(hashedPassword)

// 	// Asegurar que se especifica un rol válido
// 	log.Printf("a ver: %v", user.Password)
// 	if user.Role != models.RoleAdmin && user.Role != models.RoleUser {
// 		w.WriteHeader(http.StatusBadRequest)
// 		w.Write([]byte("invalid user role"))
// 		return
// 	}

// 	createdUser := connect.DB.Create(&user)
// 	err := createdUser.Error
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		w.Write([]byte(err.Error()))
// 		return
// 	}
// 	json.NewEncoder(w).Encode(&user)
// }

// func SignIn(username, password string) (string, error) {
// 	user, err := services.GetUserByUsername(username)
// 	if err != nil {
// 		return "", err
// 	}

// 	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
// 	if err != nil {
// 		return "", fmt.Errorf("invalid credentials")
// 	}

// 	secretKey := os.Getenv("JWT_SECRET_KEY") // Leer la clave secreta de la variable de entorno
// 	if secretKey == "" {
// 		return "", fmt.Errorf("secret key not configured")
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"username": username,
// 		"role":     user.Role, // Agregar el rol del usuario al token JWT
// 		"exp":      time.Now().Add(time.Hour * 24).Unix(),
// 	})

// 	tokenString, err := token.SignedString([]byte(secretKey))
// 	if err != nil {
// 		return "", err
// 	}

//		return tokenString, nil
//	}

// package auth

// import (
// 	"fmt"
// 	"log" // Importa el paquete log
// 	"time"

// 	"github.com/ShiomeDiaz/InventoryApp/models"
// 	"github.com/ShiomeDiaz/InventoryApp/services"
// 	"github.com/golang-jwt/jwt"
// )

// var secretKey = "miClaveSecretaDeDesarrollo" // Clave de ejemplo, cámbiala en producción

// func SignIn(username, password string) (string, *models.User, error) {
// 	// Log para indicar que se está intentando iniciar sesión
// 	fmt.Printf("Intento de inicio de sesión para el usuario: %s\n", username)

// 	user, err := services.GetUserByUsername(username)
// 	log.Printf("usario: %v\n", username)
// 	if err != nil {
// 		log.Printf("Error al obtener el usuario: %v\n", err)
// 		return "", nil, err
// 	}

// 	// Compara directamente las contraseñas en texto plano
// 	if user.Password != password {
// 		log.Printf("Contraseña incorrecta para el usuario: %s\n", username)
// 		return "", nil, fmt.Errorf("invalid credentials")
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"username": username,
// 		"role":     user.Role,
// 		"exp":      time.Now().Add(time.Hour * 24).Unix(),
// 	})

// 	tokenString, err := token.SignedString([]byte(secretKey))
// 	if err != nil {
// 		log.Printf("Error al generar el token: %v\n", err)
// 		return "", nil, err
// 	}

// 	// Log para indicar que el inicio de sesión fue exitoso
// 	fmt.Printf("Inicio de sesión exitoso para el usuario: %s\n", username)

// 	return tokenString, &user, nil
// }
