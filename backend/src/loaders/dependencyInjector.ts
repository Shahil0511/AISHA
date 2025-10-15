import { Container } from 'typedi';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { Db } from 'mongodb';
import LoggerInstance from './logger.js';
import agendaFactory from './agenda.js';
import config from '../config/index.js';
import { Agenda } from 'agenda';

interface Model {
  name: string;
  model: any;
}

interface DependencyInjectorOptions {
  mongoConnection: Db;
  models: Model[];
}

export default ({ mongoConnection, models }: DependencyInjectorOptions): { agenda: Agenda } => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });
    const mgInstance = new Mailgun(formData);

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);
    
    if (config.emails.apiKey && config.emails.apiUsername) {
      Container.set('emailClient', mgInstance.client({ 
        key: config.emails.apiKey, 
        username: config.emails.apiUsername 
      }));
      Container.set('emailDomain', config.emails.domain);
    }

    LoggerInstance.info('✌️ Dependencies injected into container');

    return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};