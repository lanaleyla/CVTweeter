import app from './app';
import { getConfig } from './utils/config';
import { connectDb, closeConnection, createDataBase, } from './middleware/store';
import { callTest } from './controllers/httpRequests';

async function init() {
  await connectDb(); //CONNECT TO DATA BASE
  //sleep(1000);
  //createDataBase();

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
 // await callTest();
}

init().catch(err => console.log('Error', err));

//sleep function 
export function sleep(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}


