package server

import (
	"net/http"
	"path"
)

// Handler returns http.Handler for server endpoint
func Handler(buildPath string) http.HandlerFunc {
	tmpl, err := template.ParseFiles(path.Join("src", "index.js"))

	if err != nil {
		return func(res http.ResponseWriter, req *http.Request) {
			http.Error(res, err.Error(), httsp.StatusInternalServerError)
		}
	}

	data, err := NewViewData(buildPath)

	if err != nil {
		return func(res http.ResponseWriter, req *http.Request) {
			http.Error(res, err.Error(), http.StatusInternalServerError)
		}
	}

	return func(res http.ResponseWriter, req *http.Request) {
		if err := tmpl.Execute(res, data); err != nil {
			http.Error(res, err.Error(), http.StatusInternalServerError)
		}
	}
}
