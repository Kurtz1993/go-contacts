package main

import (
	"database/sql"
	"errors"
)

var ErrNotImplemented = errors.New("not implemented")

type Contact struct {
	ID          int    `json:"id"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName,omitempty"`
	PhoneNumber string `json:"phoneNumber,omitempty"`
	Email       string `json:"email,omitempty"`
}

func (c *Contact) queryContact(db *sql.DB) error {
	return ErrNotImplemented
}

func (c *Contact) updateContact(db *sql.DB) error {
	return ErrNotImplemented
}

func (c *Contact) deleteContact(db *sql.DB) error {
	return ErrNotImplemented
}

func (c *Contact) createContact(db *sql.DB) error {
	return ErrNotImplemented
}

func listContacts(db *sql.DB, start, count int) ([]Contact, error) {
	return nil, ErrNotImplemented
}
