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

    var assignScrollHandlers = function () {
        var $table = $('#DataTables_Table_0_wrapper'),
            $scrollBody = $('.dataTables_scrollBody'),
            $scrollHeader = $('.dataTables_scrollHead'),
            $scrollColumn = $('.DTFC_LeftBodyWrapper');

        $('.DTFC_LeftBodyWrapper td, .dataTables_scrollHeadInner th').on('click', function (e) {

            var $target = $(e.target).closest('td,th'),
                axis = $target.is('td') ? 'x' : 'y',
                $parent = $target.parent(), // the row
                index,
                $tds,
                $scroll = null;

            if (axis === 'x') {
                // index of the row within the tbody
                index = $parent.parent().find('tr').index($parent);
                // All tds in that row
                $tds = $scrollBody.find('tr:nth-child(' + (index + 1) + ')').find('td');
            } else {
                // index of the th within the header row
                index = $parent.find('th').index($target);
                // All tds in this column
                $tds = $scrollBody.find('td:nth-child(' + (index + 1) + ')');
            }

            for (var i = 0, m = $tds.length; i < m; i++) {
                if ($tds.eq(i).find('span').length) {
                    $scroll = $tds.eq(i);
                    break;
                }
            }

            if ($scroll) {
                $scrollBody.scrollTo( $scroll, { duration:500, axis: axis});
            }
        });

        $scrollBody.find('td').on('mouseenter mouseleave', function (e) {
            if (e.type === 'mouseleave') {
                $table.find('.highlighted').removeClass('highlighted');
                return;
            }
            
            var $target = $(e.target).closest('td'),
                $parent = $target.parent(), // the row
                index,
                $rowtds, $coltds;

            // index of the row within the tbody
            index = $parent.parent().find('tr').index($parent);
            // All tds in that row
            $rowtds = $scrollBody.find('tr:nth-child(' + (index + 1) + ') td');
            $rowtds = $rowtds.add($scrollColumn.find('tr:nth-child(' + (index + 1) + ') td'));

            // index of the th within the header row
            index = $parent.find('td').index($target);
            // All tds in this column
            $coltds = $scrollBody.find('td:nth-child(' + (index + 1) + ')');
            $coltds = $coltds.add($scrollHeader.find('th:nth-child(' + (index + 1) + ')'));

            $rowtds.add($coltds).addClass('highlighted');
        });

        $('.DTFC_LeftBodyWrapper td, .dataTables_scrollHeadInner th').on('mouseenter mouseleave', function (e) {

            if (e.type === 'mouseleave') {
                $scrollBody.find('td.highlighted').removeClass('highlighted');
                return;
            }

            var $target = $(e.target).closest('td,th'),
                axis = $target.is('td') ? 'x' : 'y',
                $parent = $target.parent(), // the row
                index,
                $tds,
                $scroll = null;

            if (axis === 'x') {
                // index of the row within the tbody
                index = $parent.parent().find('tr').index($parent);
                // All tds in that row
                $tds = $scrollBody.find('tr:nth-child(' + (index + 1) + ')').find('td');
            } else {
                // index of the th within the header row
                index = $parent.find('th').index($target);
                // All tds in this column
                $tds = $scrollBody.find('td:nth-child(' + (index + 1) + ')');
            }

            $tds.addClass('highlighted');
        });
    };

    var onFirstDraw = _.once(function () {
        $('.loading').hide();
        $('.table-container').addClass('show-table');
        onResize();
        assignScrollHandlers();
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