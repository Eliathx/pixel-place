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

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
  }, [grid, pixelSize, offsetX, offsetY]);

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
    }
  };

  const handleZoom = (e) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
      setPixelSize((prevSize) => Math.min(prevSize * zoomFactor, 50));
    } else {
      setPixelSize((prevSize) => Math.max(prevSize / zoomFactor, 2));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === 2) { 
      setIsDragging(true);
      setStartDragX(e.clientX - offsetX);
      setStartDragY(e.clientY - offsetY);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newOffsetX = e.clientX - startDragX;
      const newOffsetY = e.clientY - startDragY;
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 2) { 
      setIsDragging(false);
    }
  };

  return (
    <div>
      <SelectedPixelInfo color={"orange"} />
      <ColorPalette
        colors={["FFFFFF", "0E0E27", "28C641", "2D93DD", "7B53AD", "9B9B9B", "D32734", "DA7D22", "E6DA29"]}
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