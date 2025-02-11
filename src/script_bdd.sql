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

INSERT INTO public."User" (id, username, password, creationdate, pixelsplaced) VALUES
(14, 'adr14n', 'adr14n23', '2025-01-25 23:42:13.857693', 66),
(13, 'carlos', 'carlos12', '2025-01-25 23:41:58.935948', 7),
(15, 'jac0b', 'yeico', '2025-01-25 23:42:26.626284', 6),
(11, 'eliathx', 'eli123', '2025-01-25 21:55:36.373437', 146),
(12, 'santiagoM', 'sm1029', '2025-01-25 21:55:47.167012', 18);

INSERT INTO public.pixel (row, col, userid, color) VALUES
(9, 7, 11, '#2D93DD'),
(10, 8, 11, '#7B53AD'),
(9, 9, 12, '#9B9B9B'),
(11, 20, 11, '#DA7D22'),
(17, 25, 11, '#D32734'),
(8, 22, 11, '#D32734'),
(8, 25, 11, '#D32734'),
(9, 24, 11, '#7B53AD'),
(7, 18, 11, '#7B53AD'),
(6, 6, 12, '#0E0E27'),
(5, 7, 12, '#0E0E27'),
(6, 22, 12, '#DA7D22'),
(13, 38, 14, '#0E0E27'),
(9, 52, 14, '#E6DA29'),
(10, 53, 14, '#E6DA29'),
(9, 53, 14, '#DA7D22'),
(8, 53, 14, '#9B9B9B'),
(7, 53, 14, '#0E0E27'),
(7, 54, 14, '#0E0E27'),
(8, 54, 14, '#0E0E27'),
(8, 46, 14, '#28C641'),
(9, 47, 14, '#28C641'),
(8, 38, 14, '#28C641'),
(12, 31, 14, '#28C641'),
(11, 32, 14, '#28C641'),
(12, 32, 14, '#28C641'),
(11, 31, 14, '#28C641'),
(10, 32, 14, '#28C641'),
(10, 31, 14, '#28C641'),
(9, 32, 14, '#28C641'),
(9, 31, 14, '#28C641'),
(10, 33, 14, '#2D93DD'),
(9, 33, 14, '#2D93DD'),
(11, 33, 14, '#9B9B9B'),
(12, 33, 14, '#D32734'),
(12, 34, 14, '#D32734'),
(12, 35, 14, '#D32734'),
(12, 36, 14, '#D32734'),
(11, 34, 14, '#D32734'),
(11, 36, 14, '#D32734'),
(11, 35, 14, '#D32734'),
(13, 35, 14, '#D32734'),
(13, 34, 14, '#D32734'),
(14, 34, 14, '#D32734'),
(13, 36, 14, '#D32734'),
(14, 36, 14, '#D32734'),
(14, 35, 14, '#D32734'),
(15, 37, 14, '#0E0E27'),
(15, 36, 14, '#0E0E27'),
(15, 35, 14, '#0E0E27'),
(10, 36, 14, '#0E0E27'),
(10, 37, 14, '#0E0E27'),
(11, 37, 14, '#0E0E27'),
(10, 34, 14, '#0E0E27'),
(12, 37, 14, '#0E0E27'),
(10, 35, 14, '#0E0E27'),
(8, 34, 14, '#0E0E27'),
(8, 33, 14, '#0E0E27'),
(8, 32, 14, '#0E0E27'),
(9, 54, 14, '#0E0E27'),
(8, 30, 11, '#0E0E27'),
(8, 17, 11, '#9B9B9B'),
(8, 20, 11, '#9B9B9B'),
(8, 31, 11, '#9B9B9B'),
(10, 28, 11, '#7B53AD'),
(13, 30, 11, '#DA7D22'),
(9, 30, 11, '#DA7D22'),
(15, 50, 11, '#E6DA29'),
(10, 41, 11, '#DA7D22'),
(11, 21, 11, '#D32734'),
(10, 20, 11, '#2D93DD'),
(8, 29, 11, '#9B9B9B'),
(7, 29, 11, '#9B9B9B'),
(15, 75, 14, '#000000'),
(13, 33, 11, '#D32734'),
(14, 37, 14, '#D32734'),
(9, 35, 11, '#0E0E27'),
(4, 14, 12, '#0E0E27'),
(9, 18, 12, '#7B53AD'),
(9, 17, 11, '#0E0E27'),
(7, 17, 11, '#D32734'),
(6, 17, 11, '#E6DA29'),
(5, 16, 11, '#D32734'),
(6, 18, 11, '#0E0E27'),
(6, 19, 11, '#0E0E27'),
(4, 17, 11, '#0E0E27'),
(4, 18, 11, '#0E0E27'),
(5, 17, 11, '#0E0E27'),
(5, 18, 11, '#0E0E27'),
(13, 37, 14, '#0E0E27'),
(9, 29, 11, '#28C641'),
(9, 34, 14, '#0E0E27'),
(7, 22, 11, '#DA7D22'),
(7, 15, 11, '#D32734'),
(6, 15, 11, '#D32734'),
(5, 19, 11, '#0E0E27'),
(5, 15, 11, '#DA7D22'),
(4, 15, 11, '#0E0E27'),
(5, 9, 11, '#D32734'),
(6, 21, 11, '#DA7D22'),
(5, 8, 11, '#28C641'),
(4, 16, 11, '#2D93DD'),
(7, 19, 12, '#9B9B9B'),
(7, 20, 12, '#9B9B9B'),
(5, 6, 12, '#0E0E27'),
(7, 21, 11, '#E6DA29'),
(4, 9, 12, '#7B53AD'),
(8, 16, 11, '#D32734'),
(4, 8, 12, '#0E0E27'),
(6, 16, 11, '#000000'),
(6, 8, 11, '#28C641'),
(4, 13, 11, '#9B9B9B'),
(10, 42, 11, '#D32734'),
(4, 12, 11, '#28C641'),
(10, 52, 11, '#D32734'),
(3, 16, 11, '#D32734'),
(3, 15, 11, '#9B9B9B'),
(3, 14, 11, '#9B9B9B'),
(3, 9, 11, '#28C641'),
(5, 14, 11, '#0E0E27'),
(0, 22, 11, '#0E0E27'),
(3, 13, 11, '#7B53AD'),
(8, 15, 11, '#7B53AD'),
(7, 16, 11, '#FFFFFF'),
(7, 35, 11, '#DA7D22'),
(14, 20, 11, '#0E0E27'),
(12, 73, 11, '#0E0E27'),
(13, 29, 11, '#000000'),
(15, 30, 11, '#7B53AD'),
(24, 38, 11, '#D32734'),
(19, 33, 11, '#DA7D22'),
(0, 21, 11, '#0E0E27'),
(98, 98, 11, '#2D93DD'),
(0, 16, 11, '#7B53AD'),
(18, 47, 11, '#D32734'),
(21, 39, 11, '#E6DA29'),
(10, 30, 11, '#D32734'),
(39, 81, 11, '#0E0E27'),
(40, 81, 11, '#0E0E27'),
(12, 74, 11, '#0E0E27'),
(10, 14, 11, '#28C641'),
(9, 13, 11, '#28C641'),
(9, 14, 11, '#2D93DD'),
(8, 14, 11, '#28C641'),
(13, 11, 11, '#0E0E27'),
(8, 18, 11, '#2D93DD'),
(6, 14, 11, '#7B53AD'),
(4, 19, 11, '#28C641'),
(6, 20, 11, '#E6DA29'),
(10, 0, 11, '#0E0E27'),
(3, 12, 11, '#7B53AD'),
(7, 14, 11, '#7B53AD'),
(3, 17, 11, '#0E0E27'),
(2, 17, 11, '#0E0E27'),
(8, 13, 11, '#28C641'),
(9, 15, 11, '#28C641'),
(10, 15, 11, '#28C641'),
(10, 13, 11, '#28C641'),
(3, 20, 11, '#28C641'),
(11, 73, 11, '#7B53AD'),
(11, 74, 11, '#7B53AD'),
(12, 75, 11, '#7B53AD'),
(13, 74, 11, '#7B53AD'),
(13, 75, 11, '#7B53AD'),
(10, 77, 11, '#7B53AD'),
(11, 75, 11, '#7B53AD'),
(10, 76, 11, '#7B53AD'),
(13, 73, 11, '#7B53AD'),
(12, 72, 11, '#7B53AD'),
(11, 72, 11, '#7B53AD'),
(13, 72, 11, '#7B53AD'),
(10, 75, 11, '#7B53AD'),
(11, 76, 11, '#7B53AD'),
(9, 77, 11, '#7B53AD'),
(9, 78, 11, '#7B53AD'),
(8, 79, 11, '#7B53AD'),
(10, 74, 11, '#0E0E27'),
(9, 75, 11, '#0E0E27'),
(14, 32, 11, '#2D93DD'),
(10, 10, 11, '#2D93DD');
