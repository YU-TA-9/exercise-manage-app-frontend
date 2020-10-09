interface ITimeListElem {
  contentId: number;
  contentTitle: string;
  time: number;
}

export interface ITimeList {
  running: number;
  learning: ITimeListElem[];
  reading: ITimeListElem[];
}
