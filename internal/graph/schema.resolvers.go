package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/Kurtz1993/go-contacts/internal/graph/generated"
	"github.com/Kurtz1993/go-contacts/internal/graph/model"
)

// CreateContact is the resolver for the createContact field.
func (r *mutationResolver) CreateContact(ctx context.Context, input model.NewContact) (*model.Contact, error) {
	return &model.Contact{
		FirstName:   input.FirstName,
		LastName:    input.LastName,
		PhoneNumber: input.PhoneNumber,
		Email:       input.Email,
	}, nil
}

// Contacts is the resolver for the contacts field.
func (r *queryResolver) Contacts(ctx context.Context) ([]*model.Contact, error) {
	data, err := r.contacts.ListContacts()
	if err != nil {
		return nil, err
	}

	var result []*model.Contact
	for _, item := range data {
		result = append(result, &model.Contact{
			ID:          item.ID,
			FirstName:   item.FirstName,
			LastName:    item.LastName,
			PhoneNumber: &item.PhoneNumber,
			Email:       &item.Email,
		})
	}

	return result, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
