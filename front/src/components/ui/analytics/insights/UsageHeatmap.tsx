import { CHART_COLORS } from '@/constants/chartColors';

interface UsageHeatmapProps {
  data: {
    day: string;
    value: number;
  }[];
}

const UsageHeatmap: React.FC<UsageHeatmapProps> = props => {
  const { data } = props;

  const maxValue = Math.max(...data.map(item => item.value), 1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900">Usage Heatmap</h4>
        <p className="text-sm text-gray-500">
          Activity based on last used dates
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {data.map(item => {
          const opacity = item.value / maxValue;
          return (
            <div key={item.day} className="flex flex-col items-center gap-2">
              <div
                className="w-full h-14 rounded-xl flex items-center justify-center text-xs font-semibold"
                style={{
                  backgroundColor: CHART_COLORS[0],
                  opacity: Math.max(opacity, item.value > 0 ? 0.25 : 0.08),
                }}
              >
                <span className="text-white">{item.value}</span>
              </div>

              <span className="text-xs text-gray-500">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UsageHeatmap;
