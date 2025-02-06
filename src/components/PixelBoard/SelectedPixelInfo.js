const SelectedPixelInfo = ({ color, username, isVisible }) => {
  if (!isVisible) return null;
  if (!username) return null;
  if (!color) return null;
  return (
    <div className="pixel-info">
      Selected pixel by <b style={{ color }}>@{username}</b>
    </div>
  );
};

export default SelectedPixelInfo;