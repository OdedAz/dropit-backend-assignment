* in order to run the db on docker run this line in cmd/terminal

docker run --name dropit-backend -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=postgresDB -d postgres

* in order to build the tables in the DB run in cmd/terminal
npm run migrate
