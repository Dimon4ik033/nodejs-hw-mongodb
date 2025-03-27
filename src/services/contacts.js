import Contact from '../models/contacts.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find({ userId });

  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments({ userId }),
    contactQuery
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
}

export function getContact(contactId, userId) {
  return Contact.findOne({ _id: contactId, userId: userId });
}

export function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete({ _id: contactId, userId: userId });
}

export function createContact(contact) {
  return Contact.create(contact);
}

export async function replaceContact(contactId, userId, contact) {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
      upsert: true,
    },
  );

  return {
    value: result?.value || result,
    updatedExisting: result?.lastErrorObject?.updatedExisting ?? false,
  };
}

export async function updateContact(contactId, userId, contact) {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, contact, {
    new: true,
  });
}
