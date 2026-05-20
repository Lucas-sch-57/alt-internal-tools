import { Building2, TrendingUp, Users, Wrench } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  subValue?: string | number;
  change: number | string;
  icon: 'budget' | 'tools' | 'departments' | 'cost';
  className?: string;
}
const icons = {
  budget: TrendingUp,
  tools: Wrench,
  departments: Building2,
  cost: Users,
};

const iconColors = {
  budget: 'bg-green-500',
  tools: 'bg-purple-500',
  departments: 'bg-orange-500',
  cost: 'bg-pink-500',
};

export const KpiCard: React.FC<KpiCardProps> = props => {
  const { label, value, subValue, change, icon } = props;
  const Icon = icons[icon];
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 ${props.className || ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        <div className={`${iconColors[icon]} p-2 rounded-xl`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {subValue && (
            <span className="text-lg text-gray-400">/{subValue}</span>
          )}
        </div>
        <span
          className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${iconColors[icon]} text-white `}
        >
          {change}
        </span>
      </div>
    </div>
  );
};
