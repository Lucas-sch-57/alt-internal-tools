import BackdropBlur from './BackdropBlur';
interface CreateToolModalProps {
  onClose: () => void;
}
const CreateToolModal: React.FC<CreateToolModalProps> = props => {
  const { onClose } = props;
  return (
    <>
      <BackdropBlur handleClick={onClose} />
    </>
  );
};
export default CreateToolModal;
