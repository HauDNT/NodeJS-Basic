const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create); // Render view form create
router.post('/store', courseController.store); // Creating
router.get('/:id/edit', courseController.edit); // Render view form edit
router.post('/handle-form-actions', courseController.handleFormActions); //Submit option from view 'Courses stored' & view 'Courses trash'
router.put('/:id', courseController.update); // Editing
router.patch('/:id/restore', courseController.restore); // Restore
router.delete('/:id', courseController.destroy); // Soft Delete
router.delete('/:id/force', courseController.forceDestroy); // Force Destroy
router.get('/:slug', courseController.show); // Detail course with slug

module.exports = router;
