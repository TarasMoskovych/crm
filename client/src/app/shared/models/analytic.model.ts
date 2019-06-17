export interface Analytic {
  average: number;
  chart: AnalyticChart[];
}

export interface AnalyticChart {
  gain: number;
  order: number;
  label: string;
}

export interface Overview {
  gain: Overview;
  orders: Overview;
}

export interface OverviewItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}
