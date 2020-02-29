// Requiring our models and passport as we've configured it
var db = require("../models");
var models = require("../models");

module.exports = function(app) {
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    models.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //  This will pull the address data for the map
  app.get("/api/beauty_address", function(req, res) {
    models.Beauty.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  app.get("/api/retailers", function(req, res) {
    models.Retails.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  app.get("/api/restaurants", function(req, res) {
    models.Restaurants.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });
  app.get("/api/grocerystores", function(req, res) {
    models.GroceryStores.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // This will pull all entries from beauty table
  app.get("/api/beauty/city/:city", function(req, res) {
    console.log(req.params.city);
    db.Beauty.findAll({
      where: {
        city: req.params.city
      }
    }).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // This will pull all entries from grocery store table
  app.get("/api/grocerystores/city/:city", function(req, res) {
    db.GroceryStores.findAll({ 
      where: {
        city: req.params.city
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  // This will pull all entries from retail table
  app.get("/api/retailers/city/:city", function(req, res) {
    db.Retails.findAll({
      where: {
        city: req.params.city
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  // This will pull all entries from restaurant table
  app.get("/api/restaurants/city/:city", function(req, res) {
    db.Restaurants.findAll({
      where: {
        city: req.params.city
      }
    }).then(function(results) {
      res.json(results);
    });
  });
};
