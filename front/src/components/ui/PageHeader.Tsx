interface PageHeaderProps {
  title: string;
  subtitle?: string;
}
const PageHeader: React.FC<PageHeaderProps> = props => {
  const { title, subtitle } = props;

  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
        {title}
      </h1>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </header>
  );
};
export default PageHeader;
