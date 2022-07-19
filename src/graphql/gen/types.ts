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

export type Mutation = {
  __typename?: 'Mutation';
  createContact: Contact;
};


export type MutationCreateContactArgs = {
  input: NewContact;
};

export type NewContact = {
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  contacts: Array<Contact>;
};

export type CreateNewContactMutationVariables = Exact<{
  contact: NewContact;
}>;


export type CreateNewContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null } };

export type ContactsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsListQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', id: number, avatarUrl?: string | null, firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null }> };
