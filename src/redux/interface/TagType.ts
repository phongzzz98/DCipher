export interface ITag {
    id: number;
    content: string;
    colorcode: string;
    created_at: string;
    updated_at: string;
    postusetag: number;
}

export interface ICreateTag {
    content: string;
    colorcode: string;
}