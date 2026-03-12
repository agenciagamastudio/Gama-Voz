import { create } from 'zustand'

export type TabType = 'relatorios' | 'fluxo-caixa' | 'equipe'

export interface ReportFilter {
  periodo: 'mes' | 'trimestre' | 'ano'
  mes?: number
  ano: number
}

export interface ReportsStoreState {
  selectedTab: TabType
  filters: ReportFilter
  reportData: any
  setTab: (tab: TabType) => void
  updateFilter: (filter: Partial<ReportFilter>) => void
  updateReportData: (data: any) => void
}

const DEFAULT_FILTERS: ReportFilter = {
  periodo: 'mes',
  mes: new Date().getMonth() + 1,
  ano: new Date().getFullYear(),
}

export const useReportsStore = create<ReportsStoreState>((set) => ({
  selectedTab: 'relatorios',
  filters: DEFAULT_FILTERS,
  reportData: null,

  setTab: (tab: TabType) =>
    set(() => ({
      selectedTab: tab,
    })),

  updateFilter: (filter: Partial<ReportFilter>) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filter,
      },
    })),

  updateReportData: (data: any) =>
    set(() => ({
      reportData: data,
    })),
}))
