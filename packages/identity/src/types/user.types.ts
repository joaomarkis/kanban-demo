import { v4 } from "uuid"

interface NewUserProp {
    id?: string,
    name: string,
    email: string,
    passwordHash: string,
}

export class User {
    private constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public passwordHash: string
    ) { }

    public static create(prop: NewUserProp): User {
        if (!prop.id) {
            prop.id = v4();
        }
        return new User(prop.id, prop.name, prop.email, prop.passwordHash);
    }

    public static fromPersistence(props: NewUserProp): User {
        return new User(props.id!, props.name, props.email, props.passwordHash);
    }
}
