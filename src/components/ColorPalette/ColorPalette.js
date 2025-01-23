import "./colorPalette.css";

const ColorPalette = ({ colors, onColorSelect, selectedColor }) => {
  return (
    <div className="color-palette">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-swatch ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: `#${color}` }}
          onClick={() => onColorSelect(`#${color}`)} // Llama a la función pasada como prop
        />
      ))}
    </div>
  );
};

export default ColorPalette;
