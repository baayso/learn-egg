// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {

    async list(page = 1) {
        // read config
        const {serverUrl, pageSize} = this.config.news;

        // use build-in http client to GET hacker-news api
        const {data: idList} = await this.ctx.curl(`${serverUrl}/topstories.json`, {
            data: {
                orderBy: '"$key"',
                startAt: `"${pageSize * (page - 1)}"`,
                endAt: `"${pageSize * page - 1}"`,
            },
            dataType: 'json',
        });

        // parallel GET detail
        const newsList = await Promise.all(
            Object.keys(idList).map(key => {
                const url = `${serverUrl}/item/${idList[key]}.json`;

                return this.ctx.curl(url, {dataType: 'json'});
            })
        );

        return newsList.map(res => res.data);
    }

    async list2(page = 1) {
        return page + 2;
    }

    async list3(page = 1) {
        return page + 3;
    }

    async list4(page = 1) {
        const v2 = await this.list2(page);
        const v3 = await this.ctx.service.news.list3(page);

        return [v2, v3];
    }

}

module.exports = NewsService;
