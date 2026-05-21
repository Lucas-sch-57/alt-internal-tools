interface BackdropBlurProps {
  handleClick: () => void;
}
const BackdropBlur: React.FC<BackdropBlurProps> = props => {
  const { handleClick } = props;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      onClick={handleClick}
    ></div>
  );
};
export default BackdropBlur;
