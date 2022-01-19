export type APIData = {
  ticker: string,
  bid: string,
  ask: string,
  open: string,
  low: string,
  high: string,
  changes: number,
  date: string
}

export type Rate = {
  x: number,
  y: number[]
}

export type RateData = {
  name: string,
  data: Rate[]
}

export type StoreType = {
  timeFrame: number,
  currentRate: APIData,
  chartData: RateData[]
}
