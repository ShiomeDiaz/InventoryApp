package main

import (
	"log"
	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/handlers"

	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/ShiomeDiaz/InventoryApp/routes"
	"github.com/gorilla/mux"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Executing CORS middleware", r.Method)

		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, Authorization, Token, Accept, XMLHttpRequest")
		w.Header().Set("Content-Type", "application/json")

		// Stop here for a Preflighted OPTIONS request.
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK) // Indicate that the CORS protocol is understood
			return
		}

		// Call the next handler, which can be another middleware in the chain, or the final handler.
		next.ServeHTTP(w, r)
	})
}

func main() {
	connect.DBConnection()
	connect.DB.AutoMigrate(models.User{})
	connect.DB.AutoMigrate(models.Computer{})
	connect.DB.AutoMigrate(models.Company{})
	connect.DB.AutoMigrate(models.CompanyComputer{})

	r := mux.NewRouter()
	r.HandleFunc("/users", routes.GetUsersHandler).Methods("GET")
	r.HandleFunc("/users/{id}", routes.GetUserHandler).Methods("GET")
	r.HandleFunc("/users", routes.PostUsersHandler).Methods("POST")
	r.HandleFunc("/users/{id}", routes.DeleteUsersHandler).Methods("DELETE")

	r.HandleFunc("/computers", routes.GetComputersHandler).Methods("GET")
	r.HandleFunc("/computers/{id}", routes.UpdateComputerHandler).Methods("PUT")
	r.HandleFunc("/computeraf/{CompanyID}", routes.GetComputerAFHandler).Methods("GET")
	r.HandleFunc("/computers", routes.PostComputersHandler).Methods("POST")
	r.HandleFunc("/computers/{id}", routes.DeleteComputersHandler).Methods("DELETE")
	r.HandleFunc("/computers/{id}", routes.GetComputerHandler).Methods("GET")
	r.HandleFunc("/login", handlers.LoginHandler).Methods("POST")

	// Rutas para el manejo de empresas
	r.HandleFunc("/companies", routes.GetAllCompaniesHandler).Methods("GET")
	r.HandleFunc("/companies/{id}", routes.GetCompanyHandler).Methods("GET")
	r.HandleFunc("/companies", routes.PostCompanyHandler).Methods("POST")
	r.HandleFunc("/companies/{id}", routes.UpdateCompanyHandler).Methods("PUT")
	r.HandleFunc("/companies/{id}", routes.DeleteCompanyHandler).Methods("DELETE")
	// Rutas para el manejo de asignaciones de computadoras a empresas
	r.HandleFunc("/companycomputers", routes.GetAllCompanyComputersHandler).Methods("GET")
	r.HandleFunc("/companycomputers/{id}", routes.GetCompanyComputerHandler).Methods("GET")
	r.HandleFunc("/companycomputers", routes.AddCompanyComputerHandler).Methods("POST")
	r.HandleFunc("/companycomputers2", routes.AddCompanyComputersHandler).Methods("POST")
	r.HandleFunc("/companycomputers/{id}", routes.UpdateCompanyComputerHandler).Methods("PUT")
	r.HandleFunc("/companycomputers/{id}", routes.DeleteCompanyComputerHandler).Methods("DELETE")
	// Rutas para el manejo de pdf
	r.HandleFunc("/generate-pdf/{companyComputerID}/{actType}", routes.GeneratePDFHandler).Methods("GET")

	log.Fatal(http.ListenAndServe(":3000", corsMiddleware(r)))
}
