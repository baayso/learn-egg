/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;

    router.get('/', controller.home.index);
    router.get('/crypt', controller.home.crypt);

    router.get('/home/create', controller.home.create);
    router.get('/home/creates', controller.home.creates);
    router.get('/home/read', controller.home.read);
    router.get('/home/readAll', controller.home.readAll);
    router.get('/home/readBy', controller.home.readBy);
    router.get('/home/updateById', controller.home.updateById);
    router.get('/home/update', controller.home.update);
    router.get('/home/del', controller.home.del);
    router.get('/home/query', controller.home.query);

    router.get('/news', controller.news.list);

    router.get('/datagrid', controller.datagrid.list);
};
