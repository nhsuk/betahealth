const metalsmith = require('./');

metalsmith
  .build((err) => {
    if (err) throw err;
    console.info('Build finished!');
  });
