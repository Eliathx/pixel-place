CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL,   
    pixelsPlaced INT DEFAULT 0,         
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Pixel (
    row INT NOT NULL,                   
    col INT NOT NULL,                  
    userId INT NOT NULL,                
    color VARCHAR(7) NOT NULL,          
    PRIMARY KEY (row, col),             
    FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE
);