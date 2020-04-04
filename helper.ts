interface IUser {
    id: any;
    name: string;
    room: string;
}

const users: IUser[] = [];

const addUser = (id: any, name: string, room: string) => {
    const conditade = users.find((user: IUser) => user.id === id)
    if (conditade) {
        return {err: "user is taken"}
    }
    const user = {id, name, room}
    users.push(user);
    return {user}
};

const remuveUser = (id: any) => {
    users.filter((user: IUser) => user.id !== id);
};

const getUser = (id: any) => {
    const user = users.filter((user: IUser) => user.id === id);
    if (user[0]) {
        return user[0]
    }
    return {err: "user is not defined"}
};

const getRoom = (room: string) => {
    const userRoom = users.filter((user: IUser) => user.room === room);
    return userRoom
};

export  {addUser, remuveUser, getUser, getRoom};