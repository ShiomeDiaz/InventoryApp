package services

import (
	"bytes"
	"fmt"
	"html/template"
	"time" // Asegúrate de importar el paquete "time" para trabajar con fechas

	"github.com/ShiomeDiaz/InventoryApp/models" // Asegúrate de importar tu modelo correcto

	"github.com/SebastiaanKlippert/go-wkhtmltopdf"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// TemplatePath: Ruta del template HTML
const TemplatePath = "./templates/acta_template.html"

// ActaData: Estructura para almacenar la información que se pasará al template
type ActaData struct {
	CompanyName    string
	CompanyNit     string
	ComputerName   string
	ComputerStatus string
	ComputerID     string
	ActType        string // "Renta" o "Devolución"
	Fecha          string // Campo Fecha
	Type           string
	Brand          string
	Reference      string
	Processor      string
	RAM            int
	Storage        int
	HasEthernet    bool
	HasWifi        bool
	HasBluetooth   bool
	GPU            string
	Battery        string
}

// GeneratePDF: Función que genera el PDF a partir del template HTML
func GeneratePDF(companyComputerID uuid.UUID, actType string, db *gorm.DB) ([]byte, error) {
	var companyComputer models.CompanyComputer
	var company models.Company
	var computer models.Computer

	// Obtener la relación companyComputer desde la base de datos
	if err := db.First(&companyComputer, "id = ?", companyComputerID).Error; err != nil {
		return nil, fmt.Errorf("error al obtener la relación de la empresa y el computador: %v", err)
	}

	// Obtener la información de la empresa desde la relación
	if err := db.First(&company, "id = ?", companyComputer.CompanyID).Error; err != nil {
		return nil, fmt.Errorf("error al obtener la empresa: %v", err)
	}

	// Obtener la información del computador desde la relación
	if err := db.First(&computer, "id = ?", companyComputer.ComputerID).Error; err != nil {
		return nil, fmt.Errorf("error al obtener el computador: %v", err)
	}

	// Crear una instancia de ActaData para pasar al template
	data := ActaData{
		CompanyName:    company.Name,
		CompanyNit:     company.NIT,
		ComputerName:   (computer.Brand + " " + computer.Reference),
		ComputerStatus: computer.Status,
		ComputerID:     computer.CompanyID,
		ActType:        actType,
		Fecha:          time.Now().Format("02/01/2006"), // Fecha actual en formato dd/mm/yyyy
		Type:           computer.Type,
		Brand:          computer.Brand,
		Reference:      computer.Reference,
		Processor:      computer.Processor,
		RAM:            computer.RAM,
		Storage:        computer.Storage,
		HasEthernet:    computer.HasEthernet,
		HasWifi:        computer.HasWifi,
		HasBluetooth:   computer.HasBluetooth,
		GPU:            computer.GPU,
		Battery:        computer.Battery,
	}

	// Cargar el template HTML
	tmpl, err := template.ParseFiles(TemplatePath)
	if err != nil {
		return nil, fmt.Errorf("error al cargar el template: %v", err)
	}

	// Ejecutar el template con los datos de la empresa y computador
	var tpl bytes.Buffer
	if err := tmpl.Execute(&tpl, data); err != nil {
		return nil, fmt.Errorf("error al ejecutar el template: %v", err)
	}

	// Configurar wkhtmltopdf para generar el PDF
	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		return nil, fmt.Errorf("error al crear el generador de PDF: %v", err)
	}

	// Usar el contenido del template HTML para generar el PDF
	pdfg.AddPage(wkhtmltopdf.NewPageReader(&tpl))

	// Generar el PDF
	if err := pdfg.Create(); err != nil {
		return nil, fmt.Errorf("error al generar el PDF: %v", err)
	}

	// Retornar el PDF generado como un array de bytes
	return pdfg.Bytes(), nil
}
