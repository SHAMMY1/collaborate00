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
    {
        _id: '2',
        username: 'sss',
        password: 'sss',
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
    findOne(props) {
        const user = usersDb.find((dbUser) => {
            let isCorrectDbUser = true;
            Object.keys(props).forEach((prop) => {
                if (dbUser[prop] && dbUser[prop] !== props[prop]) {
                    isCorrectDbUser = false;
                    return;
                }
            });
            return isCorrectDbUser;
        });
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
