const BaseData = require('./baseData');
const { User } = require('../models');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        let result = this.collection.findOne({ username });

        if (this.modelClass.toViewModel) {
            result = result.then((model) => {
                if (model) {
                    return this.modelClass.toViewModel(model);
                }

                return model;
            });
        }

        return result;
    }

    checkPassword(username, password) {
        return this.collection.findOne({
            username,
        })
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }
                if (user.password !== password) {
                    throw new Error('Invalid password!');
                }

                return true;
            });
    }
}

module.exports = UsersData;
