# Fixed header and column datatables

## [Demo](http://lukekarrys.github.io/fixed-header-column-table/demo.html)

### Usage

Currently, this is **not** a library or plugin, but I still wanted to document
the techniques used. Check out [this issue](https://github.com/lukekarrys/fixed-header-column-table/issues/2)
for the status of making it into a jQuery plugin.

### What is it?

Uses [jQuery datatables](https://datatables.net/) to make a responsive datatable with a fixed header and a fixed column.

This is mainly to show an example that was a bit difficult to handle a few key areas:
- Vertical resizing
- Not making columns too small
- Scrolling within the table

### Features
- Regular markup
- Styled with Bootstrap 2.3.2
- Scrolls to first non-empty cell when you click header or left column
- Resizes height and width on browser resize

### Caveats
- Can take a bit to render large tables (by default table is hidden until it is full rendered)
- Resizing is slow (but it gets there)