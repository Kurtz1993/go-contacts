package contacts

type Contact struct {
	ID          int
	FirstName   string
	LastName    string
	PhoneNumber *string
	Email       *string
}

type ContactViewModel struct {
	ID          int     `json:"id"`
	AvatarURL   *string `json:"avatarUrl"`
	FirstName   string  `json:"firstName"`
	LastName    string  `json:"lastName"`
	PhoneNumber *string `json:"phoneNumber"`
	Email       *string `json:"email"`
}

type CreateContactRequest struct {
	FirstName   string  `json:"firstName" validate:"required"`
	LastName    string  `json:"lastName" validate:"required"`
	PhoneNumber *string `json:"phoneNumber" validate:"omitempty,number,len=10"`
	Email       *string `json:"email" validate:"omitempty,email"`
}

type UpdateContactRequest struct {
	ID int `json:"id"`
	CreateContactRequest
}
