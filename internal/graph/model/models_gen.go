// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Contact struct {
	ID          int     `json:"id"`
	FirstName   string  `json:"firstName"`
	LastName    string  `json:"lastName"`
	PhoneNumber *string `json:"phoneNumber"`
	Email       *string `json:"email"`
}

type NewContact struct {
	FirstName   string  `json:"firstName"`
	LastName    string  `json:"lastName"`
	PhoneNumber *string `json:"phoneNumber"`
	Email       *string `json:"email"`
}
