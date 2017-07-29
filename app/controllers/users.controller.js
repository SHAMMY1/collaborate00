const baseController = require('./base');

class UsersController extends baseController {
    constructor(data) {
        super(data);
    }

    getAll(req, res) {
        this.data.users.getAll()
            .then((users) => {
                res.json(users);
            });
    }
}

module.exports = (data) => {
    return {
        init() {
            return new UsersController(data);
        },
    };
};
