const transport = require('../mailer/mail');

module.exports = {
  sendEmails: function(req, res){
    req.body.emails.forEach(email => {
      var mailOptions = {
        from: 'uni.fivs@gmail.com',
        to: email,
        subject: 'An Event has been Updated',
        text: `${req.body.event} has been updated by the organizer`
      };
      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
    res.json((req.body));
  },
  sendInvite: function(req, res){
    var mailOptions = {
      from: 'uni.fivs@gmail.com',
      to: req.body.email,
      subject: 'You have been invited to an Event',
      text: `${req.body.sender} has been invited you to an event. Link: ${req.body.link}`
    };
    transport.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json((req.body));    
  }
}