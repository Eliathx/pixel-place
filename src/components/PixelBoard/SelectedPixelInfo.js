const SelectedPixelInfo = ({ color, x, y }) => {
  return (
      <div className="pixel-info">
        Selected pixel by <b  style={{ color: color }}>@santiagox</b>
      </div>
  );
};

export default SelectedPixelInfo;