import * as moment from 'moment';

export class User {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    avatar: string;
    lastLogin: moment.Moment;
    activatedAt: moment.Moment;
    enabled: boolean;
    roles: [];
}