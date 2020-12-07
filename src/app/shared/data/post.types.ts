export interface PostRec {
    id: string;
    title: string;
    text: string;
    tags: Tag[];
    created_at: string;
    modified_at: string;
}

export type Tag = string;
