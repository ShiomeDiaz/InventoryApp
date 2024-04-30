package routes

import (
	"encoding/json"

	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
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
	connect.DB.First(&computer, params["id"])

	if computer.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Computer not found Id"))
		return
	}
	json.NewEncoder(w).Encode(&computer)
}
func GetComputerAFHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer
	params := mux.Vars(r)
	connect.DB.Find(&computer, "company_id = ?", params["CompanyID"])

	if computer.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Computer AF not found"))
		return
	}
	json.NewEncoder(w).Encode(&computer)
}

func PostComputersHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer
	json.NewDecoder(r.Body).Decode(&computer)
	createdComputer := connect.DB.Create(&computer)
	err := createdComputer.Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest) //400
		w.Write([]byte(err.Error()))
	}
	json.NewEncoder(w).Encode(&computer)
	// w.Write([]byte("Post"))
}

func DeleteComputersHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer
	params := mux.Vars(r)
	connect.DB.First(&computer, params["id"])
	if computer.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Computer not found"))
		return
	}
	connect.DB.Delete(&computer)
	//json.NewEncoder(w).Encode(&Computer)
}
func UpdateComputerHandler(w http.ResponseWriter, r *http.Request) {
	var computer models.Computer
	params := mux.Vars(r)
	// Obtener el registro de computadora existente
	connect.DB.First(&computer, params["id"])
	if computer.ID == 0 {
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
