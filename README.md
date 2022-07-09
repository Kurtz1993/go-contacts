# Go Contacts

This is a project that is helping me learn Golang for web development. The project consists in a basic GraphQL API and a React UI to consume it.

## Prerequisites

In order to be able to run the project you will need to have the following installed:

- [Node.js](https://nodejs.org)
- [Golang v1.17](https://golang.org)

Also, you can leverage [Visual Studio Code](https://code.visualstudio.com) to use the same tools used to develop the project.

## Running the project

To run the project you will need to have two different terminals. In one, we will run the Go project and in the other the React UI with the following commands:

### Go API

Make sure to run `go get -u` before trying to run the project.

```sh
go run ./cmd/contacts/main.go
```

If you are using Visual Studio Code you can go to the debug panel or hit F5 to start the API within the editor.

**The API will run on http://localhost:8080**

### React UI

Make sure to run `npm install` before trying to run the project.

```sh
npm start
```

**The UI will run on http://localhost:3000**

## API Spec

This project contains a `schema.graphql` file at the root level that contains the entire GraphQL schema of the project.
