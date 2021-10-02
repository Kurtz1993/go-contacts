package contacts

import (
	"crypto/md5"
	"fmt"

	"github.com/Kurtz1993/go-contacts/internal/pkg/datastore"
)

type ContactVM struct {
	datastore.ContactEntity
	AvatarUrl string `json:"avatarUrl"`
}

func ToContactVM(entity *datastore.ContactEntity) *ContactVM {
	vm := &ContactVM{
		ContactEntity: *entity,
		AvatarUrl:     fmt.Sprintf("https://www.gravatar.com/avatar/%x", md5.Sum([]byte(entity.Email))),
	}

	return vm
}
