require('dotenv/config');
const app = require('./app');

app.listen(process.env.PORT, (error) => {
  if (!error) console.log(`App listening at port - ${process.env.PORT}`);
});
