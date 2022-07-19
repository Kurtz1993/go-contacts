package gql

import (
	"github.com/Kurtz1993/go-contacts/server/usecase"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	contacts *usecase.Contacts
}

func NewResolver(contactsUsecase *usecase.Contacts) *Resolver {
	return &Resolver{
		contacts: contactsUsecase,
	}
}
