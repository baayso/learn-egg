<!DOCTYPE html>

<html>
<head>
    <meta charset="UTF-8">
    <title>Row Editing in DataGrid - jQuery EasyUI Demo</title>

    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">

    <link rel="stylesheet" href="/public/libs/easyui/themes/default/easyui.css">
    <link rel="stylesheet" href="/public/libs/easyui/themes/icon.css">
    <link rel="stylesheet" href="/public/css/easyui/easyui.override.css">

    <link rel="stylesheet" href="/public/css/news.css"/>
</head>

<body>

<div class="news-view view">
    <h2>Row Editing in DataGrid</h2>
    <p>Click the row to start editing.</p>
    <div style="margin:20px 0;"></div>

    <table id="dg" class="easyui-datagrid" style="width:700px; height:auto">
        <thead>
        <tr>
            <th data-options="field:'itemid',width:80">Item ID</th>
            <th data-options="field:'productid',width:100,
                        formatter:function(value,row){
                            return row.productname;
                        },
                        editor:{
                            type:'combobox',
                            options:{
                                valueField:'productid',
                                textField:'productname',
                                method:'get',
                                url:'/public/data/products.json',
                                required:true
                            }
                        }">Product
            </th>
            <th data-options="field:'listprice',width:80,align:'right',editor:{type:'numberbox',options:{precision:1}}">
                List Price
            </th>
            <th data-options="field:'unitcost',width:80,align:'right',editor:'numberbox'">Unit Cost</th>
            <th data-options="field:'attr1',width:250,editor:'textbox'">Attribute</th>
            <th data-options="field:'status',width:60,align:'center',editor:{type:'checkbox',options:{on:'P',off:''}}">
                Status
            </th>
        </tr>
        </thead>
    </table>

    <div id="tb" style="height:auto">
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true"
           onclick="append()">Append</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true"
           onclick="removeit()">Remove</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true"
           onclick="accept()">Accept</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true"
           onclick="reject()">Reject</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true"
           onclick="getChanges()">GetChanges</a>
    </div>

    <div id="mm" style="width: 50px; display: none;">
        <div data-options="iconCls:'icon-edit'" onclick="edit()">修改</div>
        <div data-options="iconCls:'icon-remove'" onclick="remove()">删除</div>
    </div>
</div>

<script src="/public/libs/jquery/jquery.min.js"></script>

<script src="/public/libs/easyui/jquery.easyui.min.js"></script>
<script src="/public/libs/easyui/extension/datagrid-emptyview.js"></script>
<script src="/public/libs/easyui/locale/easyui-lang-zh_CN.js"></script>

<script>

    function edit() {
        var row = $('#dg').datagrid('getSelected');

        if (row) {
            var index = $('#dg').datagrid('getRowIndex', row);

            onDblClickCell(index);
        }
    }

    function remove() {
        var row = $('#dg').datagrid('getSelected');

        if (row) {
            console.log('删除: ' + JSON.stringify(row));
        }
    }

    $('#mm').menu({
        noline: true,
        hideOnUnhover: true,
        onClick: function (item) {
        }
    });

    var dg = $('#dg').datagrid({
        // title: "Row Editing in DataGrid",
        method: 'get',
        url: '/public/data/datagrid_data1.json',
        iconCls: 'icon-edit',
        singleSelect: true,
        toolbar: '#tb',
        onDblClickCell: onDblClickCell,
        onBeforeEdit: function (index, row) {
            console.log('在用户开始编辑一行的时候触发: ' + index + ', ' + JSON.stringify(row));
        },
        onBeginEdit: function (index, row) {
            console.log('在一行进入编辑模式的时候触发: ' + index + ', ' + JSON.stringify(row));
        },
        onEndEdit: onEndEdit,
        onAfterEdit: function (index, row, changes) {
            console.log('在用户完成编辑一行的时候触发（可在此完成保存数据）: ' + index + ', ' + JSON.stringify(row));
        },
        onRowContextMenu: function (e, index, row) {
            console.log('在鼠标右击一行记录的时候触发: ' + index + ', ' + JSON.stringify(row));

            e.preventDefault(); // 阻止浏览器捕获右键事件

            endEditing();

            $(this).datagrid("clearSelections"); // 取消所有选中项
            $(this).datagrid("selectRow", index); // 根据索引选中该行

            $('#mm').menu('show', {left: e.pageX, top: e.pageY});

        }
    });

    var editIndex = undefined;

    function endEditing() {
        if (editIndex == undefined) {
            return true
        }

        if ($('#dg').datagrid('validateRow', editIndex)) {

            $('#dg').datagrid('endEdit', editIndex);
            editIndex = undefined;

            return true;
        }
        else {
            return false;
        }
    }

    function onDblClickCell(index, field, value) {
        if (editIndex != index) {
            if (endEditing()) {
                $('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);

                var ed = $('#dg').datagrid('getEditor', {index: index, field: field});
                if (ed) {
                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                }

                editIndex = index;
            }
            else {
                setTimeout(function () {
                    $('#dg').datagrid('selectRow', editIndex);
                }, 0);
            }
        }
    }

    function onEndEdit(index, row) {
        console.log('在完成编辑但编辑器还没有销毁之前触发: ' + index + ', ' + JSON.stringify(row));

        var ed = $(this).datagrid('getEditor', {
            index: index,
            field: 'productid'
        });

        row.productname = $(ed.target).combobox('getText');
    }

    function append() {
        if (endEditing()) {
            $('#dg').datagrid('appendRow', {status: 'P'});

            editIndex = $('#dg').datagrid('getRows').length - 1;

            $('#dg').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);
        }
    }

    function removeit() {
        if (editIndex == undefined) {
            return
        }

        $('#dg').datagrid('cancelEdit', editIndex)
            .datagrid('deleteRow', editIndex);

        editIndex = undefined;
    }

    function accept() {
        if (endEditing()) {
            $('#dg').datagrid('acceptChanges');
        }
    }

    function reject() {
        $('#dg').datagrid('rejectChanges');

        editIndex = undefined;
    }

    function getChanges() {
        var rows = $('#dg').datagrid('getChanges');

        alert(rows.length + ' rows are changed!');
    }

</script>

</body>
</html>