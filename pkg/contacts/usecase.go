package contacts

import (
	"crypto/md5"
	"fmt"

	"gorm.io/gorm"
)

type ContactsUseCase struct {
	db *gorm.DB
}

func NewContactsUseCase(db *gorm.DB) *ContactsUseCase {
	return &ContactsUseCase{
		db: db,
	}
}

func (u *ContactsUseCase) CreateContact(request *CreateContactRequest) (*ContactViewModel, error) {
	entity := Contact{
		FirstName:   request.FirstName,
		LastName:    request.LastName,
		PhoneNumber: request.PhoneNumber,
		Email:       request.Email,
	}

	tx := u.db.Create(&entity)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return toContactVM(&entity), nil
}

func (u *ContactsUseCase) ListContacts() ([]*ContactViewModel, error) {
	var contacts []Contact
	u.db.Find(&contacts)

	var result []*ContactViewModel

	for _, c := range contacts {
		result = append(result, toContactVM(&c))
	}

	return result, nil
}

func (u *ContactsUseCase) UpdateContact(request UpdateContactRequest) (*ContactViewModel, error) {
	changes := Contact{
		FirstName:   request.FirstName,
		LastName:    request.LastName,
		PhoneNumber: request.PhoneNumber,
		Email:       request.Email,
	}
	contact := Contact{ID: request.ID}
	u.db.First(&contact)

	u.db.Model(&contact).Updates(changes)

	return toContactVM(&contact), nil
}

func (u *ContactsUseCase) DeleteContactById(contactId int) error {
	contact := &Contact{ID: contactId}

	tx := u.db.Delete(contact)
	if tx.Error != nil {
		return tx.Error
	}

	return nil
}

func toContactVM(entity *Contact) *ContactViewModel {
	var url string
	if entity.Email != nil {
		url = fmt.Sprintf("https://www.gravatar.com/avatar/%x", md5.Sum([]byte(*entity.Email)))
	}

	return &ContactViewModel{
		ID:          entity.ID,
		AvatarURL:   &url,
		FirstName:   entity.FirstName,
		LastName:    entity.LastName,
		PhoneNumber: entity.PhoneNumber,
		Email:       entity.Email,
	}
}
