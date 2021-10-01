package rest

import (
	"github.com/Kurtz1993/go-contacts/internal/app/contacts"
	"github.com/Kurtz1993/go-contacts/internal/pkg/datastore"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Engine *gin.Engine
}

func (s *Server) Initialize() {
	datastore.EnsureTableExists()
	r := gin.Default()
	s.Engine = r
	s.initRoutes()
}

func (s *Server) Run(addr string) {
	s.Engine.Run(addr)
}

func (s *Server) initRoutes() {
	dao := &datastore.ContactsDAO{}
	ctrl := contacts.NewContactsController(dao, s.Engine.Group("/contacts"))
	ctrl.InitRoutes()
}