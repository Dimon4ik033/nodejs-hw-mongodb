import express from 'express';

import {
  getContactsController,
  getContactController,
  deleteContactController,
  createContactController,
  replaceContactController,
  updateContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const jsonParser = express.json();

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.put('/:contactId', jsonParser, ctrlWrapper(replaceContactController));

router.patch('/:contactId', jsonParser, ctrlWrapper(updateContactController));

export default router;
