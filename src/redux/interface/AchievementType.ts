export interface IAchievementState {
  ranks: IRank[];
  rank: IRank;
}

export interface IRank {
  id: number;
  score: number;
  about: string;
  rank: string;
  created_at: string;
  updated_at: string;
  colorcode: string;
  max_score: number;
  min_score: number;
}

export interface ICreateRank {
  score: number;
  min_score: number;
  max_score: number;
  about: string;
  rank: number;
  colorcode: string;
}

export interface IEditRank {
  id: number;
  score: number;
  min_score: number;
  max_score: number;
  about: string;
  rank: number;
  colorcode: string;
}
