package usecase

import (
	"crypto/md5"
	"fmt"

	"github.com/Kurtz1993/go-contacts/server/pkg/datastore"
	"github.com/Kurtz1993/go-contacts/server/pkg/gql/model"
)

type Contacts struct {
	dao *datastore.ContactsDAO
}

// NewContacts creates a new instance of the Contacts usecase.
func NewContacts(dao *datastore.ContactsDAO) *Contacts {
	return &Contacts{
		dao: dao,
	}
}

func (u *Contacts) List() ([]*model.Contact, error) {
	data, err := u.dao.ListContacts()
	if err != nil {
		return nil, err
	}

	var result []*model.Contact

	for _, c := range data {
		result = append(result, toContactVM(c))
	}

	return result, nil
}

func (u *Contacts) Create(input model.ContactInput) (*model.Contact, error) {
	entity := &datastore.ContactEntity{
		FirstName:   input.FirstName,
		LastName:    input.LastName,
		PhoneNumber: input.PhoneNumber,
		Email:       input.Email,
	}

	result, err := u.dao.CreateContact(entity)
	if err != nil {
		return nil, fmt.Errorf("unexpected error: %v", err)
	}

	return toContactVM(result), nil
}

func (u *Contacts) Update(input model.ContactInput) (*model.Contact, error) {
	if input.ID == nil {
		return nil, fmt.Errorf("ID must be supplied to update a contact")
	}
	entity := &datastore.ContactEntity{
		ID:          *input.ID,
		FirstName:   input.FirstName,
		LastName:    input.LastName,
		PhoneNumber: input.PhoneNumber,
		Email:       input.Email,
	}

	result, err := u.dao.UpdateContact(entity)
	if err != nil {
		return nil, fmt.Errorf("unexpected error: %v", err)
	}

	return toContactVM(result), nil
}

func (u *Contacts) Delete(contactID int) error {
	return u.dao.DeleteContact(contactID)
}

func toContactVM(entity *datastore.ContactEntity) *model.Contact {
	var url string
	if entity.Email != nil {
		url = fmt.Sprintf("https://www.gravatar.com/avatar/%x", md5.Sum([]byte(*entity.Email)))
	}

	return &model.Contact{
		ID:          entity.ID,
		AvatarURL:   &url,
		FirstName:   entity.FirstName,
		LastName:    entity.LastName,
		PhoneNumber: entity.PhoneNumber,
		Email:       entity.Email,
	}
}
