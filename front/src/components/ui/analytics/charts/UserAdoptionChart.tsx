import { CHART_COLORS } from '@/constants/chartColors';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

interface UserAdoptionProps {
  data: {
    name: string;
    adoption: number;
    users: number;
  }[];
  totalUsers: number;
}
const UserAdoptionChart: React.FC<UserAdoptionProps> = props => {
  const { data, totalUsers } = props;

  const sortedData = [...data].sort((a, b) => b.adoption - a.adoption);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          User Tools Adoption
        </h3>
        <p className="text-sm text-gray-500">
          Ranking the tools that are mostly adopted by users
        </p>
        <p className="text-sm text-gray-500">
          Based on{' '}
          <span className="font-semibold text-blue-500">
            {totalUsers + ' '}
          </span>
          active users
        </p>
      </div>
      <div className="h-87.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS[2]}
              horizontal={false}
            />
            <XAxis
              type="number"
              dataKey="adoption"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#6b7280',
                fontSize: 12,
              }}
              tickFormatter={value => `${value}%`}
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
              dataKey="users"
              fill={CHART_COLORS[3]}
              radius={[0, 8, 8, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default UserAdoptionChart;
