import { BaseEntity, User } from './../../shared';

export class UserSettings implements BaseEntity {
    constructor(
        public id?: number,
        public weeklyGoal?: number,
        public user?: User,
    ) {
    }
}
