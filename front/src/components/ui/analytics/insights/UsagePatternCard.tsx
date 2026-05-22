import { Activity } from 'lucide-react';
import { CHART_COLORS } from '@/constants/chartColors';
interface UsagePatternCardProps {
  data: {
    label: string;
    value: number;
  }[];
}

const UsagePatternCard: React.FC<UsagePatternCardProps> = props => {
  const { data } = props;

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Usage Patterns</span>

        <div className="bg-blue-500 p-2 rounded-xl">
          <Activity size={18} className="text-white" />
        </div>
      </div>

      <div className="flex items-end gap-2 h-24">
        {data.map((item, index) => {
          const height = total > 0 ? (item.value / total) * 100 : 0;

          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full h-20 bg-gray-100 rounded-lg overflow-hidden flex items-end">
                <div
                  className="w-full rounded-lg"
                  style={{
                    height: `${Math.max(height, item.value > 0 ? 8 : 0)}%`,
                    backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                  }}
                />
              </div>

              <span className="text-[11px] text-gray-500">{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {data.map(item => (
          <div key={item.label} className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-lg font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsagePatternCard;
