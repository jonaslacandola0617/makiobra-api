import config from './config/config';
import app from './app';

app.listen(config.port, () => {
  console.log(`Application is up, running on port - ${config.port}`);
});
