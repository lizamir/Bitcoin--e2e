const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getContacts, getContact, deleteContact, saveContact } = require('./contact.controller');
const router = express.Router();

router.get('/', log, getContacts);
router.get('/:id', log, getContact);
router.post('/', saveContact);
router.put('/:id', saveContact);
router.delete('/:id', deleteContact);

module.exports = router;
