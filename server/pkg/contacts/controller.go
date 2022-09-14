package contacts

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type ContactsCtrl struct {
	u *ContactsUseCase
}

func NewContactsCtrl(u *ContactsUseCase) *ContactsCtrl {
	return &ContactsCtrl{
		u: u,
	}
}

func (c *ContactsCtrl) CreateContact(ctx *fiber.Ctx) error {
	var req *CreateContactRequest

	err := ctx.BodyParser(&req)
	if err != nil {
		return ctx.SendStatus(400)
	}

	result, err := c.u.CreateContact(req)
	if err != nil {
		return ctx.Status(500).JSON(err.Error())
	}

	return ctx.Status(201).JSON(result)
}

func (c *ContactsCtrl) ListContacts(ctx *fiber.Ctx) error {
	data, err := c.u.ListContacts()

	if err != nil {
		return err
	}

	return ctx.JSON(data)
}

func (c *ContactsCtrl) UpdateContact(ctx *fiber.Ctx) error {
	var request UpdateContactRequest
	err := ctx.BodyParser(&request)
	if err != nil {
		return ctx.Status(400).JSON(err.Error())
	}

	result, err := c.u.UpdateContact(request)
	if err != nil {
		return ctx.Status(500).JSON(err.Error())
	}

	return ctx.JSON(result)
}

func (c *ContactsCtrl) DeleteContactById(ctx *fiber.Ctx) error {
	contactId, err := ctx.ParamsInt("contactId")
	if err != nil {
		fmt.Println("stuff")
		return ctx.SendStatus(500)
	}

	err = c.u.DeleteContactById(contactId)
	if err != nil {
		panic(fmt.Sprintf("%v", err))
	}

	return ctx.SendStatus(200)
}
