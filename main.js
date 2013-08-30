$(function () {

    var dataTable;

    var tableHeight = function () {
        var $tr = $('.dataTables_scrollHeadInner thead tr');
        return $(window).height() - 4 - ($tr.length ? $tr.height() : 0);
    };

    // Change height to match window
    var onResize = function () {
        var oSettings = dataTable.fnSettings();
        oSettings.oScroll.sY = tableHeight(); 
        dataTable.fnDraw();
    };

    var onFirstDraw = _.once(function () {
        $('.loading').hide();
        $('.table-container').addClass('show-table');
        onResize();

        $('.DTFC_LeftBodyWrapper td').on('click', function (e) {
            var $target = $(e.target),
                $row = $target.parent(),
                index = $row.parent().find('tr').index($row),
                $tds = $('.dataTables_scrollBody tr:nth-child(' + (index + 1) + ')').find('td'),
                $scroll = null;

            for (var i = 0, m = $tds.length; i < m; i++) {
                if ($tds.eq(i).find('span').length) {
                    $scroll = $tds.eq(i);
                    break;
                }
            }

            if ($scroll) {
                $('.dataTables_scrollBody').scrollTo( $scroll, { duration:500, axis: 'x'});
            }
        });

        $('.dataTables_scrollHeadInner th').on('click', function (e) {
            var $target = $(e.target),
                index = $target.parent().find('th').index($target),
                $tds = $('.dataTables_scrollBody td:nth-child(' + (index + 1) + ')'),
                $scroll = null;

            for (var i = 0, m = $tds.length; i < m; i++) {
                if ($tds.eq(i).find('span').length) {
                    $scroll = $tds.eq(i);
                    break;
                }
            }

            if ($scroll) {
                $('.dataTables_scrollBody').scrollTo( $scroll, { duration:500, axis: 'y'});
            }
        });
    });

    dataTable = $('.avails-table').dataTable({
        sDom: 'frtiS',
        sScrollY: tableHeight(),
        sScrollX: '100%',
        bAutoWidth: false,
        bScrollCollapse: true,
        bPaginate: false,
        bFilter: false,
        bInfo: false,
        bSort: false,
        bDeferRender: true,
        oScroller: {
            rowHeight: 29
        }
    });

    new FixedColumns(dataTable, {
        iLeftWidth: 85,
        fnDrawCallback: onFirstDraw
    });

    $(window).resize(onResize);
});