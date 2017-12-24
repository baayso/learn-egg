// config/config.default.js

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1512550668555_3966';

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
