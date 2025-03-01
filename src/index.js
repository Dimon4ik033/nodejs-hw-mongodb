import express from 'express';
import Contact from './models/contacts.js';
import pino from 'pino-http';
import cors from 'cors';

const app = express();

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

app.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (contact === null) {
    return res.status(404).send('Contact not found!');
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contact,
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());

export default app;
