const express = require('express');
const next = require('next');

const dev = process.argv.includes('--dev');
const port = Number.parseInt(process.env.PORT || '3000', 10);
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  server.all('*', (request, response) => handle(request, response));

  server.listen(port, '0.0.0.0', () => {
    console.log(`> Ready on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});
