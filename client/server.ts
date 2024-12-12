import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { Express, Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';


export function app(): Express {
  const server: Express = express();

  const serverDistFolder: string = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder: string = resolve(serverDistFolder, '../browser');
  const indexHtml: string = join(serverDistFolder, 'index.server.html');

  const commonEngine: CommonEngine = new CommonEngine();

 
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

 
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));


  server.get('**', (req: Request, res: Response, next: NextFunction) => {
    const { protocol } = req;
    const host: string = req.headers.host ?? '';
    const originalUrl: string = req.originalUrl;
    const baseUrl: string = req.baseUrl;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html: string) => res.send(html))
      .catch((err: Error) => {
        console.error('Error during server-side rendering:', err);
        next(err); // Pass the error to Express error handler
      });
  });

  return server;
}


function run(): void {
   const port = process.env.PORT ?? 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
