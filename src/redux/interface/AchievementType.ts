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
}

export interface ICreateRank {
  score: number;
  about: string;
  rank: number;
}

export interface IEditRank {
  id: number;
  score: number;
  about: string;
  rank: number;
}
