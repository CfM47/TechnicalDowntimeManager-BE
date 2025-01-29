import http from "http";
import testingApp from "./testingApp"; // Asegúrate de importar la app correctamente

/**
 * This module sets up and manages a test server for running integration tests.
 * It ensures the server listens on an available port and closes it after all tests are completed.
 */
let server: http.Server;

beforeAll((done) => {
  const tryListen = () => {
    server = testingApp.listen(0, () => {
      const { port } = server.address() as any;

      if (port === 8080) {
        console.warn(`Port ${port} is not allowed. Retrying...`);
        server.close(() => tryListen());
      } else {
        console.log(`Test server running on http://localhost:${port}`);
        done();
      }
    });
  };
  tryListen();
});


afterAll((done) => {
  server.close(done); // Cierra el servidor después de todas las pruebas
});

export { server };
