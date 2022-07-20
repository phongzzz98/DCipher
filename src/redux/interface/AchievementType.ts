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
}

export interface ICreateRank {
  score: number;
  about: string;
  rank: number;
  colorcode: string;
}

export interface IEditRank {
  id: number;
  score: number;
  about: string;
  rank: number;
  colorcode: string;
}
