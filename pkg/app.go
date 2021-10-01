package pkg

import (
	"database/sql"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Application struct {
	Router *mux.Router
	DB     *sql.DB
}

func (a *Application) Initialize(user, password, dbname string) { }

func (a *Application) Run(addr string) { }