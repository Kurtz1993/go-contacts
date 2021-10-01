package main

import "github.com/Kurtz1993/go-contacts/internal/app/rest"

func main() {
	s := rest.Server{}
	s.Initialize()
	s.Run(":8080")
}