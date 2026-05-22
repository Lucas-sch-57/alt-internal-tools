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

interface DepartmentActivityProps {
  data: {
    department: string;
    users: number;
  }[];
}

const DepartmentActivityChart: React.FC<DepartmentActivityProps> = props => {
  const { data } = props;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Department Activity
        </h3>

        <p className="text-sm text-gray-500">Active users by department</p>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis
              dataKey="department"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#6b7280',
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#6b7280',
                fontSize: 12,
              }}
            />

            <Tooltip />

            <Bar
              dataKey="users"
              fill={CHART_COLORS[2]}
              radius={[8, 8, 0, 0]}
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default DepartmentActivityChart;
