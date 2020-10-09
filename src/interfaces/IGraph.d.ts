export interface IRadar {
  title: string;
  time: number;
}

export interface IBar {
  contentTitle: string;
  runningTime?: number;
  learningTime?: number;
  readingTime?: number;
}

export interface ITimeGraphLineData {
  contentTitle: string;
  lineColor: string;
  data: Array<{
    time: number;
    implementationDate: number;
  }>;
}

export interface ITimeGraph {
  lineData: ITimeGraphLineData[];
  xticks: number[];
}
