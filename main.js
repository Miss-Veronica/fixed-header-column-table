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
  });

  dataTable = $('.avails-table').dataTable({
    sScrollY: tableHeight(),
    sScrollX: '100%',
    bScrollCollapse: true,
    bPaginate: false,
    bFilter: false,
    bInfo: false,
    bSort: false
  });
    
  new FixedColumns(dataTable, {
    iLeftWidth: 85,
    fnDrawCallback: onFirstDraw
  });

  $(window).resize(onResize);
});