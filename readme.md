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
*Run this command only if its the first time using the application*
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
*Run this command only if its the first time using the application*
```
npm i
```
```
npm start
```
