* in order to run the db on docker we run this line
docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=pass" -e "MSSQL_PID=Developer" -e "MSSQL_USER=dropit" -p 1433:1433 -d mcr.microsoft.com/azure-sql-edge

* in order to build the tables in the DB we will run this scripts



docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=Password12#" -e "MSSQL_PID=Developer" -e "MSSQL_USER=testUser" -p 1433:1433 -d --name=dropitDB mcr.microsoft.com/azure-sql-edge