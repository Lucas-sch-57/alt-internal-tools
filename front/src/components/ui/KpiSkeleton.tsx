const KpiSkeleton = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 h-32 border border-gray-100 flex flex-col gap-4 animate-pulse"
        >
          <div className="flex justify-between items-center">
            <div className="h-3 w-24 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-xl" />
          </div>
          <div className="h-8 w-32 bg-gray-200 rounded-full" />
          <div className="h-4 w-12 bg-gray-200 rounded-full" />
        </div>
      ))}
    </section>
  );
};

export default KpiSkeleton;
