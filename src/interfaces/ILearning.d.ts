/**
 * 学習系インターフェース定義
 */
export type TLearningStatus = 0 | 1 | 2;

// 学習内容登録,更新APIペイロード
export interface ILearningContentPayload {
  title: string;
  description: string;
  color: string;
  status: TLearningStatus;
}

// 学習内容取得APIレスポンス
export interface ILearningContent {
  contentId: number;
  title: string;
  description: string;
  color: string;
  status: TLearningStatus;
}
