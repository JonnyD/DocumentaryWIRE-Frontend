import * as moment from 'moment';

export class User {
    id: number;
    username: string;
    name: string;
    avatar: string;
    lastLogin: moment.Moment;
    activatedAt: moment.Moment;
    enabled: boolean;
    roles: [];
}