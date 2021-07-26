const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query() {
  try {
    const collection = await dbService.getCollection('contact');
    const contacts = await collection.find().toArray();
    return contacts;
  } catch (err) {
    logger.error('cannot find reviews', err);
    throw err;
  }
}

async function getById(contactId) {
  try {
    const collection = await dbService.getCollection('contact');
    const contact = await collection.findOne({ _id: ObjectId(contactId) });
    return contact;
  } catch (err) {
    logger.error(`while finding contact ${contactId}`, err);
    throw err;
  }
}

async function remove(contactId) {
  try {
    const collection = await dbService.getCollection('contact');
    return await collection.deleteOne({ _id: ObjectId(contactId) });
  } catch (err) {
    logger.error(`cannot remove contact ${contactId}`, err);
    throw err;
  }
}

async function save(contact) {
  try {
    const collection = await dbService.getCollection('contact');
    if (contact._id) {
      contact._id = ObjectId(contact._id);
      await collection.updateOne({ _id: contact._id }, { $set: contact });
      return contact;
    } else {
      const res = await collection.insertOne(contact);
      return res.ops[0];
    }
  } catch (err) {
    logger.error(`cannot update contact ${contact._id}`, err);
    throw err;
  }
}

module.exports = {
  query,
  getById,
  remove,
  save,
};
