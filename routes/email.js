const User = require('../models/user'); // Import User Model Schema
const Organization = require('../models/organization'); // Import Organization Model Schema
const Invitation = require('../models/invitation'); // Import Invitation Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const express = require('express');
const api_key = 'key-22e6a91d1fa0fb99917c142d5d1981f8';
const domain = 'sandbox143381f3f66044f4ade4e1798fb6cbbd.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = (router) => {

  router.post('/sendEmail', (req, res) => {

    const data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: ['frida.wang@propeller-com.com'],
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!'
    };
    console.log(data)
     

      //data.from = req.body.sender;
      //data.subject = req.body.subject;
      //data.text = req.body.link;

      mailgun.messages().send(data, {'content-type': 'text/html'}, function (error, body) {
        res.send(body);
      });
    });


  return router;

}
  