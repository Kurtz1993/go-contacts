export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Void: any;
};

export type Contact = {
  __typename?: 'Contact';
  avatarUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  lastName: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContact: Contact;
  deleteContact?: Maybe<Scalars['Void']>;
  updateContact: Contact;
};


export type MutationCreateContactArgs = {
  input: ContactInput;
};


export type MutationDeleteContactArgs = {
  contactId: Scalars['Int'];
};


export type MutationUpdateContactArgs = {
  input: ContactInput;
};

export type Query = {
  __typename?: 'Query';
  contacts: Array<Contact>;
};

export type CreateNewContactMutationVariables = Exact<{
  contact: ContactInput;
}>;


export type CreateNewContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null } };

export type UpdateContactMutationVariables = Exact<{
  contact: ContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'Contact', firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null } };

export type DeleteContactMutationVariables = Exact<{
  contactId: Scalars['Int'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact?: any | null };

export type ContactsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsListQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', id: number, avatarUrl?: string | null, firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null }> };
