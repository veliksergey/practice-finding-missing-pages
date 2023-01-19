const {pool} = require('./db');
const fs = require('fs');
const {parse} = require('node-html-parser');;
const ROW_LIMIT = 50;

/*const htmlStart = `<!DOCTYPE html><html><head><title>Prt</title><style>.page-break {font-weight: bold;color: orange;}</style></head><body>`;
const htmlEnd = `
<script>
// const spanPages = document.querySelectorAll('[data-page]');
const spanPages = document.querySelectorAll('[data-page]');
spanPages.forEach(span => {
    const page = span.getAttribute('data-page');
    span.innerHTML = page;
})
</script>
</body></html>`;

fs.writeFile('test.html', htmlStart, err => {
    if (err) {
        console.error(err);
    }
});

function addToFile(content) {
    fs.appendFile('test.html', content, err => {
        if (err) console.error(err);
    });
}*/

async function retrievedData() {
    let paragraphs = "";
    try {
        const qry = `select * from egw_books_parags limit ${ROW_LIMIT}`;
        const res = await pool.query(qry);
        const rows = res.rows;

        let prevPage = 0;

        rows.forEach(row => {
            const contains = row.content.includes('<span class="page-break"');
            if (contains) {

                const dom = parse(row.content);
                const spanPages = dom.querySelectorAll('[data-page]');
                // if(spanPages.length > 1) console.log(spanPages.length);
                spanPages.forEach(span => {
                    const page = +span.getAttribute('data-page');
                    console.log(page);

                    // if(prevPage === 0) prevPage = page - 1;

                    // duplicate pages
                    if (page === prevPage) console.log('### DUPLICATES:', prevPage, page);

                    if (prevPage !== 0 && page > prevPage + 1) {
                        console.log('-- MISSING:', prevPage, page);
                    }
                    prevPage = page;

                    // console.log('-- page:', page);
                    // span.innerHTML = page;
                })

                paragraphs += `<p>${row.content}</p>`;
                // console.log(row.content);
                // console.log('-- -- -- -- -- -- --');
            }
        });

    } catch (err) {
        console.error(err);
    }

    /*const dom = parse(paragraphs);
    const spanPages = dom.querySelectorAll('[data-page]');
    console.log('-- spanPages:', spanPages.length);
    spanPages.forEach(span => {
        const page = span.getAttribute('data-page');
        console.log('-- page:', page);
        // span.innerHTML = page;
    })*/

    /*const spanPages = dom.getElementsByAttribute('[data-page]');
    console.log('-- spanPages:', spanPages);
    // const spanPages = dom.querySelectorAll('[data-page]');
    spanPages.forEach(span => {
        const page = span.getAttribute('data-page');
        console.log('-- page:', page);
        // span.innerHTML = page;
    })
    console.log('writing to file...');
    fs.writeFile('test.html', html, err => {
        if (err) {
            console.error(err);
        }
    });*/
}

retrievedData();