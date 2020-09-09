const Contact = require("../model/contact.model");
const { errorHandler } = require("../helpers/dbErrorHandling");
const { validationResult } = require("express-validator");
//Using nodemailer to send submission mails
const nodemailer = require("nodemailer");

//Configuring nodemailer
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Contact router here
exports.contactController = (req, res) => {
  const { name, email, contact, subject, body } = req.body;             //from body
  const errors = validationResult(req);                                 //validation
  if (!errors.isEmpty()) {                                              // if errors
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errorDetails: firstError,
    });
  } else {                                                      // if no error
    // Save in database
    const form = new Contact({                                  // new form
      name,
      email,
      contact,
      body,
      subject,
    });
    form.save((err, form) => {                                  // trying to save in database
      if (err) {                                                // if error
        console.log("Save error", errorHandler(err));
        return res.status(500).json({
          errorDetails: errorHandler(err),
        });
      } else {                                                 // if no error
        function getContact(contact) {                          // function to check if contact number is filled or not
            return (contact ? contact : 'N/A');
          } 
        //Mail details here
        let mailDetails = {
          from: "Navprayas <navprayas@do_not_reply.com>",
          to: email,
          subject: "Contact Form Submission - Navprayas",
          html: `
                        <p>Hello <strong>${name}</strong>,</p>
                        <p>Thank you for contacting <a href="http://navprayas.in">Navprayas</a>.</p>
                        <p>Your form submission details: </p>
                        <ul>
                            <li>Name : <strong>${name}</strong></li>
                            <li>Email : <strong>${email}</strong></li>
                            <li>Mobile : <strong>${getContact(contact)}</strong></li>
                            <li>Subject : <strong>${subject}</strong></li>
                            <li>Body : <strong>${body}</strong></li>
                        </ul>
                        <p>Our team will get in touch with you soon via email. Please keep an eye on it.<p>
                        <br>
                        <p>Thanks and regards<br>Navprayas<br>(A Group of Innovative Thoughts)</p>
                    `,
        };

        // send email from here
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {                                    // if error
            return res.status(451).json({
              errorDetails: errorHandler(err),
            });
          }
        });                                             // final response after saving
        return res.status(200).json({
          responseData: "Form submitted successfully.",
          form,
        });
      }
    });
  }
};
