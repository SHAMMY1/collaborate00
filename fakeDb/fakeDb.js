const usersDb = [
    {
        _id: '0',
        username: 'Pesho',
        password: 'Pesho',
    },
    {
        _id: '1',
        username: 'Gosho',
        password: 'Gosho',
    },
];

const users = {
    find() {
        return {
            toArray() {
                return Promise.resolve(usersDb);
            },
        };
    },
    findOne({ username }) {
        const user = usersDb.find((dbUser) => dbUser.username === username);
        return Promise.resolve(user);
    },
    insert(model) {
        model._id = usersDb.length.toString(10);
        usersDb.push(model);
        return Promise.resolve(model);
    },
};

const collections = {
    users,
};

const fakeDb = {
    collection(name) {
        return collections[name];
    },
};

const init = () => {
    return Promise.resolve(fakeDb);
};

module.exports = {
    init,
};
