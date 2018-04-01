const Service = require('egg').Service;

class HomeService extends Service {

    async create() {

        // 日期时间库
        // https://www.npmjs.com/package/date-and-time

        const result = await this.app.mysql.insert('demo_user', {
            tenant_id: 3,
            name: 'egg-demo',
            age: 19,
            status: 128,
            intro: '',
            create_by: 'egg',
            create_time: new Date()
        });

        return result;
    }

}

module.exports = HomeService;
