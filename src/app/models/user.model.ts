import * as moment from 'moment';

export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    lastLogin: moment.Moment;
    activatedAt: moment.Moment;
    enabled: boolean;
    roles: [];
}