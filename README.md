# pixel.place
<img width="1440" height="850" alt="image" src="https://github.com/user-attachments/assets/a46b1b7c-ac6f-4369-83cb-fb9aa3156be9" />

pixel.place is a collaborative pixel art web application. It features a large collaborative canvas where multiple users can place pixels simultaneously on a cooldown, similar to Reddit’s r/place.

It is built using Ratchet for PHP WebSockets and PostgreSQL to handle user authentication and data storage, while the frontend is developed using React.
To run the project locally, follow the instructions below.
## Requirements

Before running the project, make sure you have the following installed:
``
* PHP
* Composer
* Node.js
* PostgreSQL
## Setup Instructions
After cloning the repository, install PHP dependencies with
```
composer install
```
Install Node.js dependencies
```
npm install
```
Set up a PostgreSQL database with [script_bdd.sql](https://github.com/Eliathx/pixel-place/blob/main/src/script_bdd.sql) file and configure your .ENV 
```
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```
Note: the SQL script already inserts some pixels and users for demo purposes.
Start the application by opening three terminals and running the following
```
# Terminal 1: Start the frontend
npm start
```
```
# Terminal 2: Start the WebSocket server
php src/server/websocket_server.php
```
```
# Terminal 3: Start the PHP local server
php -S localhost:8000 -t src/server
```
Now you can access the application in your browser at `http://localhost:8000
`
