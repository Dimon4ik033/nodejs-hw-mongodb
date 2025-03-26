import Contact from '../models/contacts.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuerty = Contact.find({ userId });

  if (typeof filter.minYear !== 'undefined') {
    contactQuerty.where('year').gte(filter.minYear);
  }

  if (typeof filter.maxYear !== 'undefined') {
    contactQuerty.where('year').lte(filter.maxYear);
  }

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments(contactQuerty),
    contactQuerty
      .sort({ [sortBy]: sortOrder })
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
  return Contact.findOne(contactId, userId);
}

export function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete(contactId, userId);
}

export function createContact(contact) {
  return Contact.create(contact);
}

export async function replaceContact(contactId, userId, contact) {
  const result = await Contact.findOneAndUpdate(contactId, userId, contact, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateContact(contactId, userId, contact) {
  return Contact.findOneAndUpdate(contactId, userId, contact, { new: true });
}
