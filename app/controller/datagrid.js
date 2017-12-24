// app/controller/news.js
const Controller = require('egg').Controller;

class DataGridController extends Controller {

    async list() {
        const ctx = this.ctx;

        const page = ctx.query.page || 1;

        await ctx.render('datagrid/list.tpl', {});
    }

}

module.exports = DataGridController;
