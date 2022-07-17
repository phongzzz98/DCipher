export interface IContestState {
  problems: IProblemItem[];
  problemsAdmin: IAdminProblemItem[];
  problem: IProblem;
  problemAdmin: IAdminProblemItem;
  statistic: IStatistic[];
  statisticDetail: IStatisticDetail;
}

export interface IProblemItem {
  problem_id: number;
  title: string;
  question: string;
  rank: number;
  user_solved: number[];
}

export interface IAdminProblemItem {
  code: string;
  content: string;
  created_at: string;
  id: number;
  input: string;
  language: string;
  output: string;
  question: string;
  rank: number;
  score: number;
  title: string;
  updated_at: string;
  user_id: number;
}

export interface IProblem {
  problem_id: number;
  title: string;
  question: string;
  content: string;
  input: string[];
  output: string[];
  rank: number;
}

export interface ICreateProblem {
  user_id: number;
  question: string;
  title: string;
  input: string;
  output: string;
  rank: number;
  score: number;
  content: string;   
}

export interface IEditProblem {
  problem_id: number;
  user_id: number;
  question: string;
  title: string;
  input: string;
  output: string;
  rank: number;
  score: number;
  content: string;   
}

export interface ISubmitProblem {
  user_id: number;
  problem_id: number;
  code: string;
  language: string;
}

export interface IStatisticIDs {
  uid: number;
  pid: number;
}

export interface IStatisticDetailIDs {
  uid: number;
  cid: number;
}

export interface IStatistic {
  id: number;
  user_id: number;
  problem_id: number;
  language: string;
  status: boolean;
  created_at: string;
}

export interface IStatisticDetail {
  user_id: number;
  problem_id: number;
  code: string;
  language: string;
  status: boolean;
  created_at: string;
  compile_details: ICompile[];
}

export interface ICompile {
  testcase: number;
  status: string;
  cpuTime: string;
  memory: string;
  created_at: string;
}
