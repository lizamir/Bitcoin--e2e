const contactService = require('./contact.service');

async function getContacts(req, res) {
  try {
    const contacts = await contactService.query(req.query);
    res.send(contacts);
  } catch (err) {
    logger.error('Cannot get contacts', err);
    res.status(500).send({ err: 'Failed to get contacts' });
  }
}

async function getContact(req, res) {
  try {
    const contact = await contactService.getById(req.params.id);
    res.send(contact);
  } catch (err) {
    logger.error('Failed to get contact', err);
    res.status(500).send({ err: 'Failed to get contact' });
  }
}

async function deleteContact(req, res) {
  try {
    await contactService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete contact', err);
    res.status(500).send({ err: 'Failed to delete contact' });
  }
}

async function saveContact(req, res) {
  try {
    const contact = req.body;
    const savedContact = await contactService.save(contact);
    res.send(savedContact);
  } catch (err) {
    logger.error('Failed to update contact', err);
    res.status(500).send({ err: 'Failed to update contact' });
  }
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  saveContact,
};
