interface DetailLabelProps {
  value: string;
}
const DetailLabel: React.FC<DetailLabelProps> = props => {
  const { value } = props;
  return (
    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
      {value}
    </span>
  );
};
export default DetailLabel;
