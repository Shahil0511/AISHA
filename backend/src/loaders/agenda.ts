import * as AgendaImport from "agenda";
import { Db } from "mongodb";
import config from "../config/index.js";

const Agenda: any = AgendaImport.default;

interface JobsLoaderOptions {
  mongoConnection: Db;
}

export default ({ mongoConnection }: JobsLoaderOptions) => {
  const agenda = new Agenda({
    mongo: mongoConnection,
    db: { collection: config.agenda.dbCollection },
    processEvery: config.agenda.pooltime,
    maxConcurrency: config.agenda.concurrency,
  });

  return agenda;
};
