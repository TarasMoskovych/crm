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
