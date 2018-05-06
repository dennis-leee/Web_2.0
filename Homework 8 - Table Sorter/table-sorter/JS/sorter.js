(function() {
    $(function() {
        setSeqOfColumn();
        setRowColor();
        $("th").click(sortOrder);
    });
    
    function setSeqOfColumn() {    //给每列增加序号
        $("thead tr").each(function() {
            $(this).children().each(function(i) {
                $(this).attr("seq", i);
            })
        })
    }

    function setRowColor() {    //设置行的颜色
        $("tbody").each(function() {
        $(this).children("tr:odd").css("background-color", "#dddddd");
        });
    }

    function sortOrder() {    //判断是升序还是降序
        var order = $(this).attr("id");
        clearOtherCss();
        if(order == undefined || order == "descending") {
            $(this).append("<img src='images/ascend.png'>");
            $(this).attr("id", "ascending");
        } else {
            $(this).append("<img src='images/descend.png'>");
            $(this).attr("id", "descending");
        }
        sorter($(this).attr("id"), $(this)); 
    }

    function clearOtherCss() {    //初始化其它表头的样式
        $("th").each(function() {
            if($(this).attr("id") != undefined) {
               $(this).removeAttr("id");
                var thValue = $(this).html();
                var imgPosition = thValue.search("<img");
                if(imgPosition != -1) {thValue = thValue.slice(0, imgPosition);}
                $(this).html(thValue);
            }
        });
    }

    function sorter(order, th) {    //排序算法
        var tr = th.parent().parent().next().children();
        var columnValue = getColumnValue(th, tr);
        columnValue.sort();
        if(order == "descending") {columnValue.reverse();}
        tr.each(function(i) {
            $(this).children(":eq(" + th.attr("seq") + ")").text(columnValue[i]);
        });
    }

    function getColumnValue(th, tr) {    //获取指定列的值
        var columnValue = new Array;
        tr.each(function() {
            columnValue.push($(this).children(":eq(" + th.attr("seq") + ")").text());
        });
        return columnValue;
    }
})();
