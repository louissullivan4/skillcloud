# Skillcloud Guide - Running Locally (on Windows)

## Backend
Open a new terminal
Run each of these commands one by one:
```
cd Backend
```
```
python -m virtualenv .venv
```
```
.\.venv\Scripts\activate
```
*Run this install command only if its the first time using the application*
```
python pip install -r requirements.txt
```
```
set FLASK_ENV=development"
```
```
python -m flask run
```

## Frontend 
Open a new terminal
Run each of these commands one by one:
```
cd skillcloud-frontend
```
*Run this install command only if its the first time using the application*
```
npm i
```
```
npm start
```

## MySQL Database
The following steps outline how to create the MySQL Database for Skillcloud with demo data.
1. Install MySQL Workbench
2. Create a new connection with the following details:
    - host="localhost"
    - user="root"
    - password="admin"
    - database="skillcloud"
3. Login into the created connection
4. In the taskbar, select "Server" and then select "Data Import"
5. Select the "..." symbol under "Import Options" and navigate to /mysql-database/import-tables
6. Select the folder and select skillcloud under the "Schema" section
7. Select "Start Import"
8. Run "SELECT * FROM users" to ensure everything has been completed correctly
