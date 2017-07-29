const baseModel = require('./baseModel');

class User extends baseModel {
    static toViewModel(model) {
        const viewModel = new User();
        Object.keys(model).forEach((prop) => {
            viewModel[prop] = model[prop];
        });

        return viewModel;
    }
}

module.exports = User;
