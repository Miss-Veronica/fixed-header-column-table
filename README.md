# Fixed header and column datatables

### Should I use this?

This is from **November 2013** and I dont think it should be used anymore. This gist
is just to save the code because hey why not? I also deleted the repo because it
was getting some decent traffic from Google and StackOverflow but I felt the example
was outdated and not a good practice and I had no time to support or update it.

I used this approach for awhile but ended up abandoning it.
It worked but was very slow, I'd recommend going to jQuery datatables
[download](http://www.datatables.net/download/index) and [examples](http://www.datatables.net/examples/index)
pages to see if there are better and more recent examples of how to accomplish this.

### [Demo](https://cdn.rawgit.com/lukekarrys/0b1f5121549995127585/raw/f425800b8c4ea0585850bbc054cfbca1e5fb3ec4/z.html)

### What is it?

Uses [jQuery datatables](https://datatables.net/) to make a responsive datatable with a fixed header and a fixed column.

This is mainly to show an example that was a bit difficult to handle a few key areas:
- Vertical resizing
- Not making columns too small

### Features
- Regular markup
- Styled with Bootstrap 2.3.2
- Resizes height and width on browser resize

### Caveats
- Can take a bit to initially render large tables
- Resizing is also slow