var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uni.fivs@gmail.com',
    pass: 'arcsys3493'
  }
});

module.exports = transporter