/**
 * セレクトボックスデータ
 */

interface IContentSelectData {
  contentId: number;
  contentTitle: string;
}

export interface IContentSelect {
  learning: IContentSelectData[];
  reading: IContentSelectData[];
}
