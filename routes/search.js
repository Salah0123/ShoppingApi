const express = require('express');
const router= express.Router();
const Product = require('./../models/productSchema');
const Category = require('./../models/CategorySchema')
const Controller = require('./../controllers/SearchController')

router.get('/', Controller.searchFunc)



router.get('/filter',Controller.filterFunc)



module.exports=router