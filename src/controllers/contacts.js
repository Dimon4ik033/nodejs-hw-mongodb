import {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  replaceContact,
  updateContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';

export async function getContactsController(req, res) {
  const contacts = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;

  const contact = await getContact(contactId);

  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;

  const result = await deleteContact(contactId);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({ status: 200, message: 'Successfully', data: result });
}

export async function createContactController(req, res) {
  const contact = req.body;

  const result = await createContact(contact);

  console.log(result);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function replaceContactController(req, res) {
  const { contactId } = req.params;
  const contact = req.body;

  const result = await replaceContact(contactId, contact);

  if (result.updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Successfully update a contact!',
      data: result,
    });
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully create a contact!',
    data: result.value,
  });
}

export async function updateContactController(req, res) {
  const { contactId } = req.params;
  const contact = req.body;

  const result = await updateContact(contactId, contact);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
