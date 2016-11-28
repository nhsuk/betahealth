const metalsmith = require('./');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

metalsmith
  .use(serve({
    port: 5000
  }))
  .use(
    watch({
      paths: {
        // eslint-disable-next-line no-template-curly-in-string
        '${source}/**/*': true,
      }
    })
  )
  .build((err) => {
    if (err) throw err;
    console.info('Build finished!');
  });
