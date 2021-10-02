package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/Kurtz1993/go-contacts/internal/pkg/contacts"
	"github.com/Kurtz1993/go-contacts/internal/pkg/datastore"
	"github.com/gin-gonic/gin"
)

//go:generate mockgen -destination=mocks/contactsdao_mock.go . ContactsDao
type ContactsDao interface {
	ListContacts() ([]*datastore.ContactEntity, error)
	GetContact(id int) (*datastore.ContactEntity, error)
	CreateContact(entity *datastore.ContactEntity) (*datastore.ContactEntity, error)
	UpdateContact(entity *datastore.ContactEntity) (*datastore.ContactEntity, error)
	DeleteContact(id int) error
}

type ContactsController struct {
	dao    ContactsDao
	router *gin.RouterGroup
}

func NewContactsController(dao ContactsDao, router *gin.RouterGroup) *ContactsController {
	return &ContactsController{
		dao:    dao,
		router: router,
	}
}

func (c *ContactsController) InitRoutes() {
	c.router.GET("/", c.GetContacts)
	c.router.GET("/:id", c.GetContactById)
	c.router.POST("/", c.CreateContact)
	c.router.PUT("/", c.UpdateContact)
	c.router.DELETE("/:id", c.DeleteContact)
}

func (c *ContactsController) GetContacts(ctx *gin.Context) {
	items, err := c.dao.ListContacts()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var result []*contacts.ContactVM

	for _, item := range items {
		result = append(result, contacts.ToContactVM(item))
	}

	ctx.JSON(http.StatusOK, result)
}

func (c *ContactsController) GetContactById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "The given id is not correct",
		})

		return
	}

	contact, err := c.dao.GetContact(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"error": fmt.Sprintf("Contact with the id: %d was not found", id),
		})

		return
	}

	ctx.JSON(http.StatusOK, contact)
}

func (c *ContactsController) CreateContact(ctx *gin.Context) {
	var entity *datastore.ContactEntity

	err := ctx.BindJSON(&entity)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("The payload is incorrect: %v", err),
		})

		return
	}

	result, err := c.dao.CreateContact(entity)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Unexpected error: %v", err),
		})

		return
	}

	ctx.JSON(http.StatusCreated, result)
}

func (c *ContactsController) UpdateContact(ctx *gin.Context) {
	var data *datastore.ContactEntity
	err := ctx.BindJSON(&data)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("Model is not valid: %v", err),
		})

		return
	}
	result, err := c.dao.UpdateContact(data)
	if err != nil {
		if errors.Is(err, datastore.ErrNoRowsAffected) {
			ctx.JSON(http.StatusNotFound, gin.H{
				"error": fmt.Sprintf("Contact with the id: %d was not found", data.ID),
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": fmt.Sprintf("Unexpected error: %v", err),
			})
		}

		return
	}

	ctx.JSON(http.StatusOK, result)
}

func (c *ContactsController) DeleteContact(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "The given id is not correct",
		})

		return
	}

	err = c.dao.DeleteContact(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"error": fmt.Sprintf("Contact with the id: %d was not found", id),
		})

		return
	}

	ctx.Status(http.StatusOK)
}
