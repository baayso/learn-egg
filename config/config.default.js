// config/config.default.js

module.exports = appInfo => {
    const config = exports = {};

    config.cluster = {
        listen: {
            // port: 7001,
            // hostname: '127.0.0.1',
            // path: '/var/run/egg.sock',
        }
    };

    config.alinode = {
        appid: '9238',
        secret: 'cb8d7da3e813156d4214f89330a4bbb12a4f1e85'
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1512550668555_3966';

    config.session = {
        key: 'EGG_SESS',
        maxAge: 24 * 3600 * 1000, // 1 天
        httpOnly: true,
        encrypt: true,
    };

    // add your config here
    config.middleware = [];

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };

    config.news = {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    };

    config.random = {
        integersUrl: 'https://www.random.org/integers',
        sequencesUrl: 'https://www.random.org/sequences'
    };

    // add middleware robot
    config.middleware = [
        'robot',
    ];

    // robot's configurations
    config.robot = {
        ua: [
            /curl/i,
            /Baiduspider/i,
        ],
    };

    return config;
};
