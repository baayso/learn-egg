/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;

    router.get('/', controller.home.index);
    router.get('/crypt', controller.home.crypt);
    router.get('/home/create', controller.home.create);

    router.get('/news', controller.news.list);

    router.get('/datagrid', controller.datagrid.list);
};
