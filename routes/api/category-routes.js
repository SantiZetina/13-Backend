const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categories = await Category.findAll({
      include: [{model: Product}]
    })
    res.json(categories)
  } catch (err){
    res.send(err)
  }
});

router.get('/:id', async(req, res) => {
  try{
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if(!category){
      res.status(404).json({
        message: 'Category not found'
      })
      return;
    }
    res.json(category)
  } catch(err){
    res.send(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const category = await Category.create(req.body);
    res.status(201).json(category)
  } catch (err) {
    res.send(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(category)
  } catch (err){
    res.send(err)
  }
});

router.delete('/:id', async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id)
      res.status(204).send()
    } catch (err){
      res.send(err)
    }
});

module.exports = router;
