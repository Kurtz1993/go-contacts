package datastore

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/Kurtz1993/go-contacts/internal/pkg/errorhandling"
	_ "github.com/lib/pq"
)

const (
	defaultPostgresPort     = 5432
	defaultPostgresUser     = "luis"
	defaultPostgresPassword = ""
	defaultPostgresDatabase = "luis"
)

var ErrNoRowsAffected = errors.New("expect 1 row affected")
var dataStore *sql.DB

func openDatabase() {
	if dataStore == nil {
		var err error
		dataStore, err = sql.Open("postgres", postgresConnectionString())
		if err != nil {
			log.Fatalf("Error opening the database connection: %v", err)
		}
	}
}

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

func ExecSQL(query string, args ...interface{}) (sql.Result, error) {
	if dataStore == nil {
		openDatabase()
	}
	result, err := dataStore.Exec(query, args...)
	return result, err
}

// ExecRowSQL is just like ExecSQL except it will check that the number of rows affected is 1 and
// return an error if it is not. This makes it easy and convenient to avoid silent failures that
// might happen when e.g. forgetting a where clause on an update statement.
func ExecRowSQL(query string, args ...interface{}) error {
	result, err := ExecSQL(query, args...)
	if err != nil {
		return err
	}
	count, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if count != 1 {
		return fmt.Errorf("%w, got %d instead, sql: %s", ErrNoRowsAffected, count, query)
	}
	return nil
}

func QuerySQL(query string, args ...interface{}) (*sql.Rows, error) {
	if dataStore == nil {
		openDatabase()
	}

	return dataStore.Query(query, args...)
}

func QueryRowSQL(query string, args ...interface{}) *sql.Row {
	if dataStore == nil {
		openDatabase()
	}

	return dataStore.QueryRow(query, args...)
}

// WaitDatastoreReady waits until the datastore is ready
func WaitDatastoreReady(attempts int, sleep time.Duration) error {
	// wait until Postgres can run a simple query
	if err := errorhandling.Retry(attempts, sleep, func() error {
		_, err := ExecSQL("SELECT 1")
		return err
	}); err != nil {
		return fmt.Errorf("datastore did not respond in time")
	}
	return nil
}

func Connected() error {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	return getDatastore().PingContext(ctx)
}

func getDatastore() *sql.DB {
	if dataStore == nil {
		openDatabase()
	}
	return dataStore
}
