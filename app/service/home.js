const Service = require('egg').Service;

class HomeService extends Service {

    async create() {

        // 日期时间库
        // https://www.npmjs.com/package/date-and-time

        const row = {
            tenant_id: 3,
            name: 'egg-demo',
            age: 19,
            status: 128,
            intro: '',
            create_by: 'egg',
            create_time: new Date()
        };

        const result = await this.app.mysql.insert(HomeService._DEMO_USER_TABLE_NAME, row);

        return result;
    }

    async creates() {

        const rows = [
            {
                tenant_id: 3,
                name: 'egg-demo-1',
                age: 19,
                status: 128,
                intro: 'd1',
                create_by: 'egg',
                create_time: new Date()
            },
            {
                tenant_id: 3,
                name: 'egg-demo-2',
                age: 19,
                status: 128,
                intro: 'd2',
                create_by: 'egg',
                create_time: new Date()
            },
        ];

        const result = await this.app.mysql.insert(HomeService._DEMO_USER_TABLE_NAME, rows);

        return result;
    }

    async read(id = 1) {
        return await this.app.mysql.get(HomeService._DEMO_USER_TABLE_NAME, {id: id});
    }

    async readAll() {
        return await this.app.mysql.select(HomeService._DEMO_USER_TABLE_NAME);
    }

    async readBy() {
        const result = await this.app.mysql.select(HomeService._DEMO_USER_TABLE_NAME, {
            where: {deleted: true, id: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
            columns: ['id', 'name', 'create_time'],
            orders: [['create_time', 'desc'], ['id', 'desc']],
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });

        return result;
    }

    async updateById() {

        const user = await this.read();

        // 修改数据，将会根据主键 ID 查找，并更新
        const row = {
            id: user.id,
            name: 'update by id',
            modify_by: 'egg-mysql',
            modify_time: this.app.mysql.literals.now, // `now()` on db server
        };

        const result = await this.app.mysql.update(HomeService._DEMO_USER_TABLE_NAME, row);

        return result;
    }

    async update() {
        const user = await this.read(7);

        const row = {
            name: 'update',
            modify_by: 'egg-mysql',
            modify_time: this.app.mysql.literals.now, // `now()` on db server
            version: user.version + 1,
        };

        const options = {
            where: {
                id: user.id,
                version: user.version,
            }
        };

        const result = await this.app.mysql.update(HomeService._DEMO_USER_TABLE_NAME, row, options);

        return result;
    }

    async del() {
        return await this.app.mysql.delete(HomeService._DEMO_USER_TABLE_NAME, {name: 'hehe'});
    }

    async query() {
        const user = await this.read();

        const newVersion = user.version + 1;

        let sql = `
            UPDATE
                ${HomeService._DEMO_USER_TABLE_NAME}
            SET
                intro = ?
                version = ?
            WHERE
                id = ?
                AND version = ?
        `;

        sql = sql.replace(/[\r\n]/g, '');

        const result = await this.app.mysql.query(sql, ['egg mysql execute sql test', newVersion, user.id, user.version]);

        return result;
    }

}

HomeService._DEMO_USER_TABLE_NAME = 'demo_user';

module.exports = HomeService;
