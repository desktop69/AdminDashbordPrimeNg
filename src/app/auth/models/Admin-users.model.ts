export class Users {
    _id!: string;
    email!: string;
    username!: string;
    password?: string;
    role !: string;
    is_confirmed!: boolean;
    createdAt!: Date;
}