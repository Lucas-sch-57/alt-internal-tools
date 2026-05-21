interface BadgeProps {
  status: 'active' | 'unused' | 'expiring';
}

const config = {
  active: { label: 'Active', className: 'bg-green-100 text-green-700' },
  expiring: { label: 'Expiring', className: 'bg-orange-100 text-orange-700' },
  unused: { label: 'Unused', className: 'bg-red-100 text-red-700' },
};

const Badge: React.FC<BadgeProps> = props => {
  const { status } = props;
  const { label, className } = config[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
