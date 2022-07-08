export interface ITagState {
    tags: ITag[],
    selectedTag: IOneTag
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

export interface IEditTag {
    id: number
    content: string;
    colorcode: string;
    description: string;
    icon_class: string;
    status: number
}

export interface IOneTag {
    taginfo: {
        id: number;
        userid: number;
        icon_class: string;
        content: string;
        colorcode: string;
        description: string;
        status: number;
        created_at: string;
        updated_at: string;
    },
    postusetag: number;
}