package main

import (
	"go-contacts/pkg"
	"os"
)

func main() {
	a := pkg.Application{}
	a.Initialize(
		os.Getenv("APP_DB_USERNAME"),
		os.Getenv("APP_DB_PASSWORD"),
		os.Getenv("APP_DB_NAME"))

	a.Run(":8010")
}