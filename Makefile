.PHONY: gen-graphql # Generates the GraphQL files on the server, based on the schema.graphql file.
gen-graphql: graphql-codegen ui-graphql-codegen

graphql-codegen:
	go run github.com/99designs/gqlgen

ui-graphql-codegen:
	npm run codegen

help: # Generate list of targets with descriptions
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) # \(.*\)/\1 \2/' | expand -t20