import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
interface MonthlySpendProps {
  data: {
    label: string;
    total: string | number;
  }[];
  trend: string | number;
}
const MonthlySpendEvolutionChart: React.FC<MonthlySpendProps> = ({
  data,
  trend,
}) => {
  const safeData = data.map(d => ({
    label: d.label,
    total: Number(d.total),
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Monthly Spend Evolution
        </h3>
        <p className="text-sm text-gray-500">{trend}% vs last month</p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={safeData}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#colorSpend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default MonthlySpendEvolutionChart;
