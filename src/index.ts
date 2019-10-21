import app from './app';
import { getConfig } from './utils/config';
import { connectDb, closeConnection, createDataBase, } from './middleware/store';

async function init() {
  await connectDb(); //CONNECT TO DATA BASE
  createDataBase();

  const port = getConfig('PORT', 3000);
  app.set('port', port);

  //set up server and listen
  const server = app.listen(app.get('port'), async () => {
    console.log(
      ' App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env'),
    );
    console.log(' Press CTRL-C to stop\n');

    //closeConnection
  });
}

init().catch(err => console.log('Error', err));


