import { CHART_COLORS } from '@/constants/chartColors';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface TopExpensiveProps {
  data: {
    name: string;
    cost: number;
  }[];
}
const TopExpensiveToolsChart: React.FC<TopExpensiveProps> = props => {
  const { data } = props;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Top Expensive Tools
        </h3>
        <p className="text-sm text-gray-500">Highest monthly tools costs</p>
      </div>

      <div className="h-87.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS[2]}
              horizontal={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#6b7280',
                fontSize: 12,
              }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#374151',
                fontSize: 12,
              }}
              width={100}
            />
            <Tooltip />

            <Bar
              dataKey="cost"
              fill={CHART_COLORS[0]}
              radius={[0, 8, 8, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default TopExpensiveToolsChart;
