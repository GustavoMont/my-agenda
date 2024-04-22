import database from '.';

let processExitCode = 0;

database
  .runMigrations()
  .then(() => {
    console.log('DEU BOM CHAMPS');
  })
  .catch((err) => {
    console.log('DEU RUIM MEU NOBRE');
    console.error(err);
    processExitCode = 1;
  })
  .finally(() => {
    database.endConnection().then(() => {
      process.exit(processExitCode);
    });
  });
