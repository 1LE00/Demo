const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { URL } = require("url");

router
  .route("/login(.html)?")
  .get((req, res) => {
    const referer = req.headers.referer || 'http://localhost:3000/';
    const referrerUrl = new URL(referer);
    const pathname = referrerUrl.pathname;
    if (req.isAuthenticated() && pathname != '/register') {
      res.redirect(`${referer}`);
    } else {
      res.render("login", {
        message: "",
        loginUsername: "",
        loginPassword: "",
      });
    }
  })
  .post(usersController.handleSignIn);

router
  .route("/register(.html)?")
  .get((req, res) => {
    const referer = req.headers.referer || 'http://localhost:3000/';
    const referrerUrl = new URL(referer);
    const pathname = referrerUrl.pathname;
    if (req.isAuthenticated() && pathname != '/login') {
      res.redirect(`${referer}`);
    } else {
      res.render("register", {
        message: "",
        registerName: "",
        registerEmail: "",
        condition: false,
      });
    }
  })
  .post(usersController.handleRegister);

router.post("/logout", function (req, res, next) {
  if(req.user.isAdmin){
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/reserva/auth/admin/verify");
    });
  }else{
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  }
});
module.exports = router;


/**
 *  Todo have a look later
 * const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to display the "forgot password" form
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

// Route to handle the "forgot password" form submission
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email address
    const user = await User.findOne({ email });

    // If the user is not found, display an error message
    if (!user) {
      return res.render('forgot-password', { error: 'User not found' });
    }

    // Generate a reset token and expiration date
    const resetToken = generateResetToken();
    const resetTokenExpiration = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Update the user's record with the reset token and expiration date
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send an email to the user with a link to reset their password
    const resetLink = `http://${req.headers.host}/reset-password?token=${resetToken}`;
    sendResetEmail(user.email, resetLink);

    // Display a success message
    return res.render('forgot-password', { success: 'An email has been sent with instructions to reset your password' });

  } catch (error) {
    console.error(error);
    res.render('forgot-password', { error: 'An error occurred. Please try again later' });
  }
});

module.exports = router;


*/

/**
* TODO have a look later
  // Route to display the password reset form
router.get('/reset-password', async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user by reset token
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

    // If the reset token is invalid or expired, display an error message
    if (!user) {
      return res.render('reset-password', { error: 'Invalid or expired reset token' });
    }

    // Display the password reset form
    return res.render('reset-password', { token });

  } catch (error) {
    console.error(error);
    res.render('reset-password', { error: 'An error occurred. Please try again later' });
  }
});

// Route to handle the password reset form submission
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Find the user by reset token
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

    // If the reset token is invalid or expired, display
// an error message
if (!user) {
  return res.render('reset-password', { error: 'Invalid or expired reset token' });
}

// Update the user's password and clear the reset token and expiration date
user.password = password;
user.resetToken = null;
user.resetTokenExpiration = null;
await user.save();

// Redirect the user to the login page with a success message
return res.redirect('/login?resetSuccess=1');
} catch (error) {
console.error(error);
res.render('reset-password', { error: 'An error occurred. Please try again later' });
}
});

module.exports = router;
*/