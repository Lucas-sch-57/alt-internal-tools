const TableSkeleton = () => {
  return (
    <div className="px-6 pb-6 flex flex-col gap-3 animate-pulse">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-200">
        {['Tool', 'Department', 'Users', 'Monthly Cost', 'Status'].map(col => (
          <div key={col} className="h-3 bg-gray-200 rounded-full w-20" />
        ))}
      </div>
      {/* Rows */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 py-3">
          <div className="h-4 bg-gray-200 rounded-full w-24" />
          <div className="h-4 bg-gray-200 rounded-full w-20" />
          <div className="h-4 bg-gray-200 rounded-full w-8" />
          <div className="h-4 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
