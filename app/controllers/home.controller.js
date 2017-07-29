const BaseController = require('./base');

class HomeController extends BaseController {
    constructor(data) {
        super(data);
    }

    get(req, res) {
        return res.render('home');
    }
}

module.exports = (data) => {
    return {
        init() {
            return new HomeController(data);
        },
    };
};