package datastore

import (
	"fmt"
	"os"
	"strconv"

	"github.com/Kurtz1993/go-contacts/pkg/contacts"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	defaultPostgresPort     = 5432
	defaultPostgresUser     = "kurtz"
	defaultPostgresPassword = ""
	defaultPostgresDatabase = "kurtz"
)

func postgresConnectionString() string {
	host := os.Getenv("POSTGRES_HOST")
	if host == "" {
		host = "localhost"
	}
	port := os.Getenv("POSTGRES_PORT")
	if port == "" {
		port = strconv.Itoa(defaultPostgresPort)
	}
	user := os.Getenv("POSTGRES_USER")
	if user == "" {
		user = defaultPostgresUser
	}
	pwd := os.Getenv("POSTGRES_PASSWORD")
	if pwd == "" {
		pwd = defaultPostgresPassword
	}
	dbname := os.Getenv("POSTGRES_DB")
	if dbname == "" {
		dbname = defaultPostgresDatabase
	}
	return fmt.Sprintf("host='%s' port='%s' user='%s' password='%s' dbname='%s' sslmode=disable",
		host, port, user, pwd, dbname)
}

func ConnectDatabase() (*gorm.DB, error) {
	connStr := postgresConnectionString()

	return gorm.Open(postgres.Open(connStr), &gorm.Config{})
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&contacts.Contact{})
}
