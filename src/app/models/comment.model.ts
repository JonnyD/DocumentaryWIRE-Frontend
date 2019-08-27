import { User } from './user.model';
import { Documentary } from './documentary.model';

export class Comment {
    id: number;
    commentText: string;
    documentary: Documentary;
    user: User;
    author: string;
    email: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}