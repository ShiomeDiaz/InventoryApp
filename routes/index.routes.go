package routes

import "net/http"

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Home"))
}
func UserHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Negro"))
}
func LapHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hp"))
}
