const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');

class HomeController extends Controller {

    async index() {
        this.ctx.body = 'Hello world';
    }

    async crypt() {
        let plaintext = 'hello';

        let hashed = bcrypt.hashSync(plaintext, 10);

        let result = bcrypt.compareSync(plaintext, hashed);

        this.ctx.body = {
            hashed: hashed,
            result: result
        }
    }

    async create() {
        this.ctx.body = await this.ctx.service.home.create();
    }

}

module.exports = HomeController;
