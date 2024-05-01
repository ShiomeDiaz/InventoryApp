// package handlers

// import (
// 	"encoding/json"
// 	"net/http"

// 	"github.com/ShiomeDiaz/InventoryApp/auth"
// )

// func LoginHandler(w http.ResponseWriter, r *http.Request) {
// 	var credentials struct {
// 		Username string `json:"username"`
// 		Password string `json:"password"`
// 	}
// 	err := json.NewDecoder(r.Body).Decode(&credentials)
// 	if err != nil {
// 		http.Error(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}

// 	token, err := auth.SignIn(credentials.Username, credentials.Password)
// 	if err != nil {
// 		http.Error(w, "Unauthorized", http.StatusUnauthorized)
// 		return
// 	}

//		json.NewEncoder(w).Encode(map[string]string{"token": token})
//	}
package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ShiomeDiaz/InventoryApp/auth"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var credentials struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	token, user, err := auth.SignIn(credentials.Username, credentials.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	response := map[string]string{
		"token": token,
		"role":  string(user.Role), // Convert role to string if necessary
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
