export interface Tool {
  id: number;
  name: string;
  description: string;
  vendor: string;
  website_url: string;
  category: string;
  monthly_cost: number;
  owner_department: string;
  status: 'active' | 'deprecated' | 'trial';
  active_users_count: number;
  created_at: string;
}

export interface KpiCard {
  label: string;
  value: string;
  subValue?: string;
  change: number;
  icon: 'budget' | 'tools' | 'departments' | 'cost';
}
