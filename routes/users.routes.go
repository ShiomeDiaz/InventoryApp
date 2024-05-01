package routes

import (
	"encoding/json"
	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	connect.DB.Find(&users)
	json.NewEncoder(w).Encode(&users)
}

func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid UUID format"))
		return
	}
	connect.DB.First(&user, "id = ?", id)

	if user.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("user not found"))
		return
	}
	json.NewEncoder(w).Encode(&user)
}

func PostUsersHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	json.NewDecoder(r.Body).Decode(&user)

	// Hashear la contraseña antes de guardarla
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error hashing password"))
		return
	}
	user.Password = string(hashedPassword)

	// Asegurar que se especifica un rol válido
	if user.Role != models.RoleAdmin && user.Role != models.RoleUser {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid user role"))
		return
	}

	createdUser := connect.DB.Create(&user)
	err = createdUser.Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	json.NewEncoder(w).Encode(&user)
}

func DeleteUsersHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid UUID format"))
		return
	}
	connect.DB.First(&user, "id = ?", id)
	if user.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("user not found"))
		return
	}
	connect.DB.Delete(&user)
}
