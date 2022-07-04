export interface ITagState {
    tags: ITag[]
}

export interface ITag {
    id: number;
    icon_class: string;
    content: string;
    colorcode: string;
    description: string;
    created_at: string;
    updated_at: string;
    postusetag: number;
}

export interface ICreateTag {
    content: string;
    colorcode: string;
    description: string;
    icon_class: string;
    status: number
}