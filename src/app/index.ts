import { config } from '../config/config';
import { Application } from './app';

class NOUSSampleServer {
  public static start() {
    const port = config.api.port || 6565;
    const app = new Application();

    app.express.listen(port, '', () => {
      console.info('*****************************************************************************');
      console.info(`**                         NOUS Sample Project                            **`);
      console.info(`** Server started - listening on ${port}                                      **`);
      console.info('*****************************************************************************');
    });
  }
}

NOUSSampleServer.start();
