package main

import (
	"net/http"

	connect "github.com/ShiomeDiaz/InventoryApp/DriveDB/Connect"
	"github.com/ShiomeDiaz/InventoryApp/models"
	"github.com/ShiomeDiaz/InventoryApp/routes"
	"github.com/gorilla/mux"
)

func main() {
	connect.DBConnection()
	connect.DB.AutoMigrate(models.User{})
	connect.DB.AutoMigrate(models.Employer{})
	r := mux.NewRouter()
	r.HandleFunc("/", routes.HomeHandler)
	// r.HandleFunc("/user", routes.UserHandler)
	// r.HandleFunc("/lap", routes.LapHandler)
	r.HandleFunc("/users", routes.GetUsersHandler).Methods("GET")
	r.HandleFunc("/users/{id}", routes.GetUserHandler).Methods("GET")
	r.HandleFunc("/users", routes.PostUsersHandler).Methods("POST")
	r.HandleFunc("/users", routes.DeleteUsersHandler).Methods("DELETE")

	http.ListenAndServe(":3000", r)
}
