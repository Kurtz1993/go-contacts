package graph

import "github.com/Kurtz1993/go-contacts/internal/pkg/datastore"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

//go:generate go run github.com/99designs/gqlgen
type Resolver struct {
	contacts datastore.ContactsDAO
}
