package routes

import (
	"encoding/json"
	"errors"
	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// Añadir asignaciones de múltiples computadores a una empresa
func AddCompanyComputersHandler(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		CompanyID   string   `json:"company_id"`
		ComputerIDs []string `json:"computer_ids"`
	}

	// Decodificar el cuerpo de la solicitud
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if len(payload.ComputerIDs) == 0 {
		http.Error(w, "No ComputerIDs provided", http.StatusBadRequest)
		return
	}

	// Convertir CompanyID a uuid.UUID
	companyUUID, err := uuid.Parse(payload.CompanyID)
	if err != nil {
		http.Error(w, "Invalid CompanyID format", http.StatusBadRequest)
		return
	}

	// Crear los registros en la base de datos
	var companyComputers []models.CompanyComputer
	for _, computerID := range payload.ComputerIDs {
		computerUUID, err := uuid.Parse(computerID)
		if err != nil {
			http.Error(w, "Invalid ComputerID format: "+computerID, http.StatusBadRequest)
			return
		}

		companyComputers = append(companyComputers, models.CompanyComputer{
			CompanyID:  companyUUID,
			ComputerID: computerUUID,
		})
	}

	// Insertar en la base de datos
	result := connect.DB.Create(&companyComputers)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	// Responder con los registros creados
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(companyComputers)
}

// Añadir una asignación de computador a una empresa
func AddCompanyComputerHandler(w http.ResponseWriter, r *http.Request) {
	var companyComputer models.CompanyComputer
	err := json.NewDecoder(r.Body).Decode(&companyComputer)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Intentar crear el registro en la base de datos
	result := connect.DB.Create(&companyComputer)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&companyComputer)
}

// Obtener todas las asignaciones de computadoras a empresas
func GetAllCompanyComputersHandler(w http.ResponseWriter, r *http.Request) {
	var companyComputers []models.CompanyComputer
	connect.DB.Find(&companyComputers)
	json.NewEncoder(w).Encode(companyComputers)
}

// Obtener una asignación específica por ID
func GetCompanyComputerHandler(w http.ResponseWriter, r *http.Request) {
	var companyComputer models.CompanyComputer
	params := mux.Vars(r)

	id, err := uuid.Parse(params["id"])
	if err != nil {
		http.Error(w, "Invalid UUID format", http.StatusBadRequest)
		return
	}

	connect.DB.First(&companyComputer, "id = ?", id)
	if companyComputer.ID == uuid.Nil {
		http.Error(w, "Company Computer not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(&companyComputer)
}

// Actualizar una asignación de computadora a empresa
func UpdateCompanyComputerHandler(w http.ResponseWriter, r *http.Request) {
	var companyComputer models.CompanyComputer
	params := mux.Vars(r)

	id, err := uuid.Parse(params["id"])
	if err != nil {
		http.Error(w, "Invalid UUID format", http.StatusBadRequest)
		return
	}

	connect.DB.First(&companyComputer, "id = ?", id)
	if companyComputer.ID == uuid.Nil {
		http.Error(w, "Company Computer not found", http.StatusNotFound)
		return
	}

	err = json.NewDecoder(r.Body).Decode(&companyComputer)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	connect.DB.Save(&companyComputer)
	json.NewEncoder(w).Encode(&companyComputer)
}
func DeleteCompanyComputerHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		http.Error(w, "Invalid UUID format", http.StatusBadRequest)
		return
	}

	// Primero intenta encontrar el registro para asegurarse de que existe antes de intentar eliminarlo.
	var companyComputer models.CompanyComputer
	findResult := connect.DB.First(&companyComputer, "id = ?", id)
	if findResult.Error != nil {
		if errors.Is(findResult.Error, gorm.ErrRecordNotFound) {
			http.Error(w, "Record not found", http.StatusNotFound)
			return
		}
		http.Error(w, findResult.Error.Error(), http.StatusInternalServerError)
		return
	}

	// Realiza el soft delete
	deleteResult := connect.DB.Delete(&companyComputer)
	if deleteResult.Error != nil {
		http.Error(w, deleteResult.Error.Error(), http.StatusInternalServerError)
		return
	}

	if deleteResult.RowsAffected == 0 {
		// No se encontró ningún registro para eliminar, aunque se encontró anteriormente.
		http.Error(w, "No record found to delete", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Company Computer assignment deleted successfully"))
}

// // Eliminar una asignación de computadora a empresa
// func DeleteCompanyComputerHandler(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	id, err := uuid.Parse(params["id"])
// 	if err != nil {
// 		http.Error(w, "Invalid UUID format", http.StatusBadRequest)
// 		return
// 	}

// 	result := connect.DB.Delete(&models.CompanyComputer{}, "id = ?", id)
// 	if result.Error != nil {
// 		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	w.WriteHeader(http.StatusOK)
// 	w.Write([]byte("Company Computer assignment deleted successfully"))
// }
