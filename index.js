const app = require('./server/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
