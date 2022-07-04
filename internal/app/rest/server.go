package rest

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Kurtz1993/go-contacts/internal/app/controllers"
	"github.com/Kurtz1993/go-contacts/internal/graph"
	"github.com/Kurtz1993/go-contacts/internal/graph/generated"
	"github.com/Kurtz1993/go-contacts/internal/pkg/datastore"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Engine *gin.Engine
}

func (s *Server) Initialize() {
	datastore.EnsureTableExists()
	r := gin.Default()
	r.Use(cors.Default())
	s.Engine = r
	s.initRoutes()
}

func (s *Server) Run(addr string) {
	s.Engine.Run(addr)
}

func (s *Server) initRoutes() {
	dao := &datastore.ContactsDAO{}
	ctrl := controllers.NewContactsController(dao, s.Engine.Group("/contacts"))
	ctrl.InitRoutes()

	h := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	graphqlHandler := func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}

	s.Engine.POST("/graphql", graphqlHandler)
	s.Engine.GET("/", playgroundHandler())
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}
