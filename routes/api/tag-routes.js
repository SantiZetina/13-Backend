const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include:[{model: Product}]
    });
    res.json(tags)
  } catch(err) {
    res.send(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findByPl(req.params.id, {
        include: [{model: Product}]
    })
    if(!tags){
      return res.status(404).json({
        message: 'Tag not found!'
      })
    }
    res.json(tags)
  } catch(err){
    res.send(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  } catch(err){
    res.send(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const { id } = req.params;
    const [rowsAffected, [updatedTag]] = await Tag.update(
      { tagName: req.body.tagName },
      { returning: true, where: { id }}
    );
    if (rowsAffected === 0){
      return res.status(404).json({
        message: 'Tag not found'
      })
    }
    res.json(updatedTag)
  } catch(err){
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const { id } = req.params;
    const rowsDeleted = await Tag.destroy({
      where: { id }
    })
    if(rowsDeleted === 0 ){
      return res.status(404).json({
        message: 'Tag not found'
      })
    }
    res.status(204).end()
  } catch(err){
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
});

module.exports = router;
