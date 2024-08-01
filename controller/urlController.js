const shortid = require('shortid');
const { Url } = require('../models/models');

exports.shortenUrl = async (req, res) => {
  const { longURL } = req.body;

  try {
    let url = await Url.findOne({ longURL });

    if (url) {
      res.json(url);
    } else {
      const shortURL = shortid.generate();
      url = new Url({
        longURL,
        shortURL,
      });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error shortening URL' });
  }
};

exports.redirectToLongUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    
    const result = await Url.updateOne(
      { shortURL: shortUrl },
      { $inc: { clicked: 1 } }  
    );

    
 
    if (result.modifiedCount > 0) {

      const url = await Url.findOne({ shortURL: shortUrl });
      if (url) {
        res.redirect(url.longURL);
      } else {
        res.status(404).json({ error: 'URL not found' });
      }
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error redirecting' });
  }
};
