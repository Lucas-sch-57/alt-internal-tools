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
  selectedTools: number[];
  toggleSelect: (id: number) => void;
  selectAll: (ids: number[]) => void;
  clearSelection: () => void;
}

export const useToolStore = create<ToolStore>(set => ({
  filters: {},
  setFilter: (key, value) =>
    set(state => ({
      filters: { ...state.filters, [key]: value === '' ? undefined : value },
    })),
  resetFilters: () => set({ filters: {} }),
  selectedTools: [],
  toggleSelect: id =>
    set(state => ({
      selectedTools: state.selectedTools.includes(id)
        ? state.selectedTools.filter(i => i !== id)
        : [...state.selectedTools, id],
    })),
  selectAll: ids => set({ selectedTools: ids }),
  clearSelection: () => set({ selectedTools: [] }),
}));
