package routes

import (
	"encoding/json"
	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// GetAllCompaniesHandler maneja la petición GET para obtener todas las empresas
func GetAllCompaniesHandler(w http.ResponseWriter, r *http.Request) {
	var companies []models.Company
	connect.DB.Find(&companies)
	json.NewEncoder(w).Encode(companies)
}

// GetCompanyHandler maneja la petición GET para obtener una empresa por su ID
func GetCompanyHandler(w http.ResponseWriter, r *http.Request) {
	var company models.Company
	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid UUID format"))
		return
	}
	connect.DB.First(&company, "id = ?", id)
	if company.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("company not found"))
		return
	}
	json.NewEncoder(w).Encode(&company)
}

// PostCompanyHandler maneja la petición POST para crear una nueva empresa
func PostCompanyHandler(w http.ResponseWriter, r *http.Request) {
	var company models.Company
	json.NewDecoder(r.Body).Decode(&company)

	createdCompany := connect.DB.Create(&company)
	err := createdCompany.Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	json.NewEncoder(w).Encode(&company)
}

// UpdateCompanyHandler maneja la petición PUT para actualizar una empresa
func UpdateCompanyHandler(w http.ResponseWriter, r *http.Request) {
	var company models.Company
	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid UUID format"))
		return
	}

	// Buscar primero la empresa existente
	connect.DB.First(&company, "id = ?", id)
	if company.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("company not found"))
		return
	}

	// Decodificar la nueva información y actualizar
	json.NewDecoder(r.Body).Decode(&company)
	connect.DB.Save(&company)
	json.NewEncoder(w).Encode(&company)
}

// DeleteCompanyHandler maneja la petición DELETE para eliminar una empresa
func DeleteCompanyHandler(w http.ResponseWriter, r *http.Request) {
	var company models.Company
	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid UUID format"))
		return
	}
	connect.DB.First(&company, "id = ?", id)
	if company.ID == uuid.Nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("company not found"))
		return
	}
	connect.DB.Delete(&company)
	w.Write([]byte("company deleted"))
}
