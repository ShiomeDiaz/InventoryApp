package routes

import (
	"fmt"
	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/ShiomeDiaz/InventoryApp/services" // Asegúrate de importar correctamente el servicio
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// GeneratePDFHandler maneja la petición GET para generar un PDF
func GeneratePDFHandler(w http.ResponseWriter, r *http.Request) {
	// Obtener el parámetro de la URL (ID de la relación)
	params := mux.Vars(r)
	companyComputerIDStr := params["companyComputerID"] // El ID de la relación entre empresa y computador
	actType := params["actType"]                        // Puede ser "Renta" o "Devolución"

	// Validar el parámetro
	if companyComputerIDStr == "" || actType == "" {
		http.Error(w, "Faltan parámetros requeridos", http.StatusBadRequest)
		return
	}

	// Convertir el ID de la relación a UUID
	companyComputerID, err := uuid.Parse(companyComputerIDStr)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al parsear companyComputerID: %v", err), http.StatusBadRequest)
		return
	}

	// Buscar la relación en la base de datos
	var companyComputer models.CompanyComputer
	if err := connect.DB.First(&companyComputer, "id = ?", companyComputerID).Error; err != nil {
		http.Error(w, fmt.Sprintf("Error al obtener la relación: %v", err), http.StatusInternalServerError)
		return
	}

	// Llamar al servicio GeneratePDF pasando el companyComputerID
	// pdfBytes, err := services.GeneratePDF(companyComputerID, actType, connect.DB)
	// if err != nil {
	// 	http.Error(w, fmt.Sprintf("Error al generar PDF: %v", err), http.StatusInternalServerError)
	// 	return
	// }
	pdfBytes, err := services.GeneratePDF(companyComputerID, actType, connect.DB)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al generar PDF: %v", err), http.StatusInternalServerError)
		return
	}

	// Verificar que los bytes del PDF no estén vacíos
	if len(pdfBytes) == 0 {
		http.Error(w, "El PDF generado está vacío", http.StatusInternalServerError)
		return
	}

	// Debugging
	fmt.Println("PDF generado correctamente, tamaño:", len(pdfBytes))

	// Establecer los encabezados para la respuesta de un archivo PDF
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", "attachment; filename=acta.pdf")

	// Escribir el contenido del PDF como respuesta
	w.Write(pdfBytes)
}
