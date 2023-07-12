import { UserType } from "./user";

/**
 * 帖子类别
 */
export interface PostType {
    id: number;
    title: string;
    content: string;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType | null;
}

