import React, { useRef, useEffect, useState } from "react";
import ColorPalette from "../ColorPalette/ColorPalette";
import "./pixelBoard.css";
import SelectedPixelInfo from "./SelectedPixelInfo";

const PixelArtCanvas = ({ canDraw, onPixelPlaced }) => {
  const canvasRef = useRef(null);
  const gridSize = 100;
  const [pixelSize, setPixelSize] = useState(10);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [grid, setGrid] = useState(
    Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill("#ffffff"))
  );

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragX, setStartDragX] = useState(0);
  const [startDragY, setStartDragY] = useState(0);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:8080");
  
      ws.onopen = () => {
        console.log("Conectado al WebSocket");
      };
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.action === "updatePixel") {
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[data.row][data.col] = data.color;
            return newGrid;
          });
        }
      };
  
      ws.onclose = () => {
        console.log("Desconectado. Reconectando...");
        setTimeout(connectWebSocket, 1000); // Reconectar después de 1 segundo
      };
  
      return ws;
    };
  
    const ws = connectWebSocket();
    return () => ws.close();
  }, []);

  const fetchPixels = async () => {
    try {
      const response = await fetch("http://localhost:8000/getPixels.php");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
        return;
      }

      const newGrid = [...grid];

      data.forEach((pixel) => {
        const { row, col, color } = pixel;
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
          newGrid[row][col] = color;
        }
      });

      setGrid(newGrid);
    } catch (error) {
      console.error("Error fetching pixels:", error);
    }
  };

  useEffect(() => {
    fetchPixels();
  }, []);

  const placePixel = async (row, col, color) => {
    try {
      const response = await fetch("http://localhost:8000/placePixel.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ row, col, color }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
        return;
      }

      console.log("Pixel placed successfully:", data);
    } catch (error) {
      console.error("Error placing pixel:", error);
    }
  };

  // Dibujar la cuadrícula en el canvas
  const drawGrid = (ctx) => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        ctx.fillStyle = grid[row][col];
        ctx.fillRect(
          col * pixelSize + offsetX,
          row * pixelSize + offsetY,
          pixelSize,
          pixelSize
        );
      }
    }
  };

  // Actualizar el canvas cuando cambia el estado de la cuadrícula
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
  }, [grid, pixelSize, offsetX, offsetY]);

  // Manejar clics en el canvas
  const handleCanvasClick = (e) => {
    if (!canDraw) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left - offsetX) / pixelSize);
    const y = Math.floor((e.clientY - rect.top - offsetY) / pixelSize);

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      const newGrid = [...grid];
      newGrid[y][x] = selectedColor;
      setGrid(newGrid);
      onPixelPlaced();

      // Enviar el píxel al servidor
      placePixel(y, x, selectedColor);
    }
  };

  // Manejar zoom con la rueda del mouse
  const handleZoom = (e) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
      setPixelSize((prevSize) => Math.min(prevSize * zoomFactor, 50));
    } else {
      setPixelSize((prevSize) => Math.max(prevSize / zoomFactor, 2));
    }
  };

  // Manejar inicio de arrastre
  const handleMouseDown = (e) => {
    if (e.button === 2) {
      setIsDragging(true);
      setStartDragX(e.clientX - offsetX);
      setStartDragY(e.clientY - offsetY);
    }
  };

  // Manejar movimiento durante el arrastre
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newOffsetX = e.clientX - startDragX;
      const newOffsetY = e.clientY - startDragY;
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    }
  };

  // Manejar fin de arrastre
  const handleMouseUp = (e) => {
    if (e.button === 2) {
      setIsDragging(false);
    }
  };

  return (
    <div>
      <SelectedPixelInfo color={"orange"} />
      <ColorPalette
        colors={[
          "FFFFFF",
          "0E0E27",
          "28C641",
          "2D93DD",
          "7B53AD",
          "9B9B9B",
          "D32734",
          "DA7D22",
          "E6DA29",
        ]}
        onColorSelect={setSelectedColor}
        selectedColor={selectedColor}
      />
      <canvas
        ref={canvasRef}
        width={gridSize * pixelSize}
        height={gridSize * pixelSize}
        onClick={handleCanvasClick}
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default PixelArtCanvas;