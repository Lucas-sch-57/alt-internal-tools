import { create } from 'zustand';

interface ToolFilters {
  department?: string;
  status?: string;
  min_cost?: number;
  max_cost?: number;
  category?: string;
}

interface ToolStore {
  filters: ToolFilters;
  setFilter: (key: keyof ToolFilters, value: any) => void;
  resetFilters: () => void;
}

export const useToolStore = create<ToolStore>(set => ({
  filters: {},
  setFilter: (key, value) =>
    set(state => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: {} }),
}));
