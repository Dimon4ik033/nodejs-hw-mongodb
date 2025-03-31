import * as fs from 'node:fs/promises';
import path from 'node:path';

import {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  replaceContact,
  updateContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { getEnvVar } from '../utils/getEnvVar.js';

import { uploadToCloudinary } from '../utils/UploadToCloudinary.js';

export async function getContactsController(req, res) {
  const filter = parseFilterParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const response = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: response,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;
  const contact = await getContact(contactId, req.user.id);

  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;

  const result = await deleteContact(contactId, req.user.id);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  if (result.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }

  res.json({ status: 200, message: 'Successfully', data: result });
}

export async function createContactController(req, res) {
  let avatar = null;

  if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
    const result = await uploadToCloudinary(req.file.path);

    avatar = result.secure_url;
  } else {
    await fs.rename(
      req.file.path,
      path.resolve('src', 'uploads', req.file.filename),
    );

    avatar = `http://localhost:2323/uploads/${req.file.filename}`;
  }

  const contact = {
    ...req.body,
    userId: req.user.id,
    avatar,
  };

  const result = await createContact(contact);

  if (result.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }

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

  if (result.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }

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

  const result = await updateContact(contactId, req.user.id, contact);

  if (result.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
