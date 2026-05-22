import { CHART_COLORS } from '@/constants/chartColors';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface DepartmentCostProps {
  costData: {
    department: string;
    total: number;
  }[];
}

const DepartmentCostBreakdownChart: React.FC<DepartmentCostProps> = props => {
  const { costData } = props;

  const chartData = costData.map((item, index) => ({
    ...item,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Department Cost Breakdown
        </h3>
        <p className="text-sm text-gray-500">Tools spending by department</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="department"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        {chartData.map((item, index) => (
          <div
            key={item.department}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                }}
              />

              <span className="text-sm text-gray-700">{item.department}</span>
            </div>

            <span className="text-sm font-medium text-gray-900">
              €{item.total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCostBreakdownChart;
