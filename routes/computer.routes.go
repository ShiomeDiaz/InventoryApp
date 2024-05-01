package routes

import (
	"encoding/json"
	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func GetComputersHandler(w http.ResponseWriter, r *http.Request) {
	var computers []models.Computer
	connect.DB.Find(&computers)
	json.NewEncoder(w).Encode(&computers)
}

func GetComputerHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer
	params := mux.Vars(r)

	// Convertir el parámetro de la ruta a un UUID
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid UUID format"))
		return
	}

	connect.DB.First(&computer, "id = ?", id)

	if computer.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Computer not found"))
		return
	}
	json.NewEncoder(w).Encode(&computer)
}

func GetComputerAFHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer
	params := mux.Vars(r)

	// Convertir el parámetro de la ruta a un UUID
	companyID, err := uuid.Parse(params["CompanyID"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid UUID format"))
		return
	}

	connect.DB.First(&computer, "company_id = ?", companyID)

	if computer.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Computer not found"))
		return
	}
	json.NewEncoder(w).Encode(&computer)
}

// func DeleteComputersHandler(w http.ResponseWriter, r *http.Request) {
// 	var computer models.Computer
// 	params := mux.Vars(r)

// 	// Convertir el parámetro de la ruta a un UUID
// 	id, err := uuid.Parse(params["id"])
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		w.Write([]byte("Invalid UUID format"))
// 		return
// 	}

//		connect.DB.First(&computer, "id = ?", id)
//		if computer.ID == uuid.Nil {
//			w.WriteHeader(http.StatusNotFound)
//			w.Write([]byte("Computer not found"))
//			return
//		}
//		connect.DB.Delete(&computer)
//	}
func DeleteComputersHandler(w http.ResponseWriter, r *http.Request) {
	// Verificar el rol del usuario antes de permitir la eliminación
	userRole := getUserRoleFromContext(r.Context()) // Supongamos que tienes una función para obtener el rol del usuario desde el contexto

	if userRole != "admin" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var computer models.Computer
	params := mux.Vars(r)

	// Convertir el parámetro de la ruta a un UUID
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid UUID format"))
		return
	}

	connect.DB.First(&computer, "id = ?", id)
	if computer.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Computer not found"))
		return
	}
	connect.DB.Delete(&computer)
}

func UpdateComputerHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer
	params := mux.Vars(r)

	// Convertir el parámetro de la ruta a un UUID
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid UUID format"))
		return
	}

	// Obtener el registro de computadora existente
	connect.DB.First(&computer, "id = ?", id)
	if computer.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Computer not found"))
		return
	}
	// Decodificar los datos actualizados desde el cuerpo de la solicitud
	json.NewDecoder(r.Body).Decode(&computer)
	// Actualizar el registro en la base de datos
	connect.DB.Save(&computer)
	// Devolver la computadora actualizada como respuesta
	json.NewEncoder(w).Encode(&computer)
}
func PostComputersHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer

	// Decodificar los datos del cuerpo de la solicitud en la estructura de la computadora
	err := json.NewDecoder(r.Body).Decode(&computer)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request body"))
		return
	}

	// Generar un nuevo UUID para la computadora
	computer.ID = uuid.New()

	// Crear la computadora en la base de datos
	result := connect.DB.Create(&computer)
	if result.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error creating computer"))
		return
	}

	// Devolver la computadora creada como respuesta
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&computer)
}
