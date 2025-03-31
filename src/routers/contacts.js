import express from 'express';

import {
  getContactsController,
  getContactController,
  deleteContactController,
  createContactController,
  replaceContactController,
  updateContactController,
} from '../controllers/contacts.js';

import { upload } from '../middlewares/upload.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidID } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactShema, updateContactShema } from '../validation/contact.js';

const jsonParser = express.json();

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidID, ctrlWrapper(getContactController));

router.delete('/:contactId', isValidID, ctrlWrapper(deleteContactController));

router.post(
  '/',
  upload.single('avatar'),
  jsonParser,
  validateBody(contactShema),
  ctrlWrapper(createContactController),
);

router.put(
  '/:contactId',
  isValidID,
  jsonParser,
  validateBody(contactShema),
  ctrlWrapper(replaceContactController),
);

router.patch(
  '/:contactId',
  isValidID,
  jsonParser,
  validateBody(updateContactShema),
  ctrlWrapper(updateContactController),
);

export default router;
