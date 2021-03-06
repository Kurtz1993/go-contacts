package gql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/Kurtz1993/go-contacts/server/pkg/gql/generated"
	"github.com/Kurtz1993/go-contacts/server/pkg/gql/model"
)

// CreateContact is the resolver for the createContact field.
func (r *mutationResolver) CreateContact(ctx context.Context, input model.NewContact) (*model.Contact, error) {
	return r.contacts.Create(input)
}

// DeleteContact is the resolver for the deleteContact field.
func (r *mutationResolver) DeleteContact(ctx context.Context, contactID int) (*string, error) {
	return nil, r.contacts.Delete(contactID)
}

// Contacts is the resolver for the contacts field.
func (r *queryResolver) Contacts(ctx context.Context) ([]*model.Contact, error) {
	return r.contacts.List()
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
