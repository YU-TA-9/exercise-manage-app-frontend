/**
 * 読書系インターフェース定義
 */
export type TReadingStatus = 0 | 1 | 2;

// 読書内容登録,更新APIペイロード
export interface IReadingContentPayload {
  title: string;
  description: string;
  color: string;
  status: TReadingStatus;
}

// 読書内容取得APIレスポンス
export interface IReadingContent {
  contentId: number;
  title: string;
  description: string;
  color: string;
  status: TLearningStatus;
  imagePath: string;
}
