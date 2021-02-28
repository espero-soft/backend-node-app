var express = require('express');
var ProductController = require('../controllers/ProductController');
const productImageUpload = require('../middlewares/multer.config');
var router = express.Router();


router.get('/', ProductController.list);

router.get('/:id', ProductController.show);

router.post('/', productImageUpload, ProductController.create);

router.put('/:id', productImageUpload, ProductController.update);

router.delete('/:id', ProductController.remove);


module.exports = router;