import React, { memo } from "react";

const Pixel = memo(({ color, onMouseDown, onMouseEnter }) => {
  return (
    <div
      className="pixel"
      style={{ backgroundColor: color }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    />
  );
});

export default Pixel;
