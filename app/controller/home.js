const Controller = require('../core/base_controller');
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

    async creates() {
        this.ctx.body = await this.ctx.service.home.creates();
    }

    async read() {

        const rule = {
            id: {type: 'id'},
        };

        this.ctx.validate(rule, this.ctx.query);

        const id = this.ctx.query.id || 1;

        this.ctx.body = await this.ctx.service.home.read(id);
    }

    async readAll() {
        this.ctx.body = await this.ctx.service.home.readAll();
    }

    async readBy() {
        this.ctx.body = await this.ctx.service.home.readBy();
    }

    async updateById() {
        this.ctx.body = await this.ctx.service.home.updateById();
    }

    async update() {
        this.ctx.body = await this.ctx.service.home.update();
    }

    async del() {
        this.ctx.body = await this.ctx.service.home.del();
    }

    async query() {
        this.ctx.body = await this.ctx.service.home.query();
    }

}

module.exports = HomeController;
