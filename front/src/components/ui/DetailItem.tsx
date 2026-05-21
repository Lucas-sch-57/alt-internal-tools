import { type LucideIcon } from 'lucide-react';
import DetailLabel from './DetailLabel';

interface DetailItemProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}
const DetailItem: React.FC<DetailItemProps> = props => {
  const { label, value, icon: Icon } = props;
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon />
        <DetailLabel value={label} />
      </div>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
  );
};
export default DetailItem;
