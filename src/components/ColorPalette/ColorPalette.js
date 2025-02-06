import "./colorPalette.css";

const ColorPalette = ({ 
  colors, 
  onColorSelect, 
  selectedColor,
  selectedTool,
  onToolSelect 
}) => {
  return (
    <div className="color-palette">
      {/* Icono de cursor */}
      <div 
        className={`tool-icon ${selectedTool === 'cursor' ? 'selected' : ''}`}
        onClick={() => onToolSelect('cursor')}
      >
         <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.5027 9.96958C20.7073 10.4588 20.6154 12.1941 19.3658 12.5533L13.0605 14.3658L10.1807 20.2606C9.60996 21.4288 7.88499 21.218 7.6124 19.9468L4.67677 6.25646C4.44638 5.18204 5.5121 4.2878 6.53019 4.70126L19.5027 9.96958Z" stroke="#000000" strokeWidth="1.5">
        </path>
      </svg>
      </div>

      {colors.map((color) => (
        <div
          key={color}
          className={`color-swatch ${selectedColor === `#${color}` ? 'selected' : ''}`}
          style={{ backgroundColor: `#${color}` }}
          onClick={() => {
            onToolSelect('color');
            onColorSelect(`#${color}`);
          }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
