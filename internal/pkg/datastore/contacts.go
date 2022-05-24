package datastore

const (
	sqlEnsureTableExists = `CREATE TABLE IF NOT EXISTS contacts(
	id SERIAL,
	firstName TEXT NOT NULL,
	lastName  TEXT,
	phoneNumber TEXT,
	email TEXT,
	CONSTRAINT contacts_pkey  PRIMARY KEY(id))
	`
	sqlListContacts  = `SELECT id, firstName, lastName, phoneNumber, email FROM contacts`
	sqlGetContact    = `SELECT id, firstName, lastName, phoneNumber, email FROM contacts WHERE id=$1`
	sqlCreateContact = `INSERT INTO contacts (firstName, lastName, phoneNumber, email) VALUES ($1, $2, $3, $4) RETURNING id;`
	sqlDeleteContact = `DELETE FROM contacts WHERE id = $1`
	sqlUpdateContact = `UPDATE contacts SET firstName=$2, lastName=$3, phoneNumber=$4, email=$5 WHERE id=$1`
)

type ContactEntity struct {
	ID          int    `json:"id"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName,omitempty"`
	PhoneNumber string `json:"phoneNumber,omitempty"`
	Email       string `json:"email,omitempty"`
}

type ContactsDAO struct{}

// ListContacts queries the database for all the available contact registries.
func (d *ContactsDAO) ListContacts() ([]*ContactEntity, error) {
	var contacts []*ContactEntity
	rows, err := QuerySQL(sqlListContacts)
	if err != nil {
		return contacts, err
	}

	defer rows.Close()

	for rows.Next() {
		contact, err := scanContact(rows)
		if err != nil {
			return contacts, err
		}

		contacts = append(contacts, contact)
	}

	return contacts, nil
}

func (d *ContactsDAO) GetContact(id int) (*ContactEntity, error) {
	row := QueryRowSQL(sqlGetContact, id)
	contact, err := scanContact(row)
	if err != nil {
		return nil, err
	}

	return contact, nil
}

func (d *ContactsDAO) CreateContact(entity *ContactEntity) (*ContactEntity, error) {
	var id int
	err := QueryRowSQL(
		sqlCreateContact,
		entity.FirstName,
		entity.LastName,
		entity.PhoneNumber,
		entity.Email,
	).Scan(&id)

	if err != nil {
		return nil, err
	}

	entity.ID = id

	return entity, nil
}

func (d *ContactsDAO) UpdateContact(entity *ContactEntity) (*ContactEntity, error) {
	err := ExecRowSQL(
		sqlUpdateContact,
		entity.ID,
		entity.FirstName,
		entity.LastName,
		entity.PhoneNumber,
		entity.Email,
	)

	if err != nil {
		return nil, err
	}

	return entity, nil
}

func (d *ContactsDAO) DeleteContact(id int) error {
	return ExecRowSQL(sqlDeleteContact, id)
}

func EnsureTableExists() error {
	_, err := ExecSQL(sqlEnsureTableExists)

	return err
}

type contactScanner interface {
	Scan(dest ...interface{}) error
}

func scanContact(scanner contactScanner) (*ContactEntity, error) {
	var entity ContactEntity
	err := scanner.Scan(&entity.ID, &entity.FirstName, &entity.LastName, &entity.PhoneNumber, &entity.Email)

	return &entity, err
}
