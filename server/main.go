package main

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Kurtz1993/go-contacts/server/pkg/datastore"
	"github.com/Kurtz1993/go-contacts/server/pkg/gql"
	"github.com/Kurtz1993/go-contacts/server/pkg/gql/generated"
	"github.com/Kurtz1993/go-contacts/server/usecase"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/valyala/fasthttp/fasthttpadaptor"
)

func main() {
	app := fiber.New(fiber.Config{
		AppName: "Go Contacts v1.0.0",
	})

	datastore.EnsureTableExists()

	// Automatically recover from panics
	app.Use(recover.New())
	app.Use(cors.New())
	api := app.Group("/api")

	contactsDao := &datastore.ContactsDAO{}
	contactsUseCase := usecase.NewContacts(contactsDao)

	api.All("/graphql", func(ctx *fiber.Ctx) error {
		h := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: gql.NewResolver(contactsUseCase)}))
		fasthttpadaptor.NewFastHTTPHandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			h.ServeHTTP(writer, request)
		})(ctx.Context())

		return nil
	})

	api.All("/playground", func(ctx *fiber.Ctx) error {
		h := playground.Handler("GraphQL", "/api/graphql")
		fasthttpadaptor.NewFastHTTPHandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			h.ServeHTTP(writer, request)
		})(ctx.Context())

		return nil
	})

	app.Listen(":3000")
}
