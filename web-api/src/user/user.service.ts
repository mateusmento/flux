import { UserCredentials, User } from "./user.model";


let users: User[] = [
    {name: 'Mateus Sarmento', username: 'mateusmento', password: 'gdk32', email: 'mateusmento@gmail.com'},
    {name: 'John Wings', username: 'johnwings', password: 'wingingwins', email: 'johnwings@gmail.com'}
];

export class UserService
{

    createUser(newUser: User): User
    {
        let user = this.findUser(newUser.username);

        if (!user)
        {
            this.saveUser(user);
            return user;
        }

        throw {msg: `User of username ${newUser} already exists`};
    }

    authenticateUser(credentials: UserCredentials): UserCredentials
    {
        let user = this.findUser(credentials.username);
    
        if (user && user.password === credentials.password)
        {
            return user;
        }
    }

    saveUser(user: User)
    {
        user = JSON.parse(JSON.stringify(user));
        users.push(user);
    }

    findUser(username: string): User
    {
        return users.find(user => user.username === username);
    }

    findUserByEmail(email: string): User
    {
        return users.find(user => user.email === email);
    }
}
