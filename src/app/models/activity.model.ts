import { User } from './user.model';

export class Activity {
    id: number;
    type: string;
    data: {};
    component: string;
    groupNumber: number;
    user: User;
    objectId: number;
    createdAt: string;
}