package main

import (
	"log"

	"github.com/Kurtz1993/go-contacts/pkg/contacts"
	"github.com/Kurtz1993/go-contacts/pkg/datastore"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New(fiber.Config{
		AppName: "Go Contacts v1.0.0",
	})

	db, err := datastore.ConnectDatabase()

	if err != nil {
		log.Fatalf("Could not establish connection to the database: %v", err)
	}

	datastore.Migrate(db)

	// Automatically recover from panics
	app.Use(recover.New())
	app.Use(cors.New())
	app.Use(logger.New())
	api := app.Group("/api")

	contactsUseCase := contacts.NewContactsUseCase(db)
	contactsCtrl := contacts.NewContactsCtrl(contactsUseCase)

	api.Post("/contacts", contactsCtrl.CreateContact)
	api.Get("/contacts", contactsCtrl.ListContacts)
	api.Put("/contacts", contactsCtrl.UpdateContact)
	api.Delete("/contacts/:contactId", contactsCtrl.DeleteContactById)

	app.Listen(":3000")
}
