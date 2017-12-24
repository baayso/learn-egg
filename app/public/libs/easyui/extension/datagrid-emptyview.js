var emptyView = $.extend({}, $.fn.datagrid.defaults.view, {

    onAfterRender: function (target) {
        $.fn.datagrid.defaults.view.onAfterRender.call(this, target);

        var opts = $(target).datagrid('options');

        var dv = $(target).datagrid('getPanel').children('div.datagrid-view');
        // var height = dv.height();
        // if (height <= 60) {
        //     dv.css('height', '160px');
        // }

        dv.children('div.datagrid-empty').remove();

        if (!$(target).datagrid('getRows').length) {
            var empty = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || '没有符合条件的记录').appendTo(dv);

            empty.css({
                position: 'absolute',
                left: 0,
                top: 50,
                width: '100%',
                // height: 100,
                textAlign: 'center'
            });
        }
    }

});
