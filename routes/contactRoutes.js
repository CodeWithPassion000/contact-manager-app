const express = require('express');
const router = express.Router();

const {
  getContacts,
  getIndContact,
  deleteContact,
  createContact,
  updateContact,
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router
  .route('/:id')
  .get(getIndContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
