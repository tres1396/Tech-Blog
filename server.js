const path = require("path");
const express = require("express");
const routes = require("./controllers"); // add this file
const exphbs = require("expess-handlebars");
const helpers = require("./utils/helpers"); // add this file
const session = require("session");
const sequelize = require("./config/connection")// add this file
const SequelizeStore = require("connection-session-sequelize");

const app = express();
const PORT = process.env.PORT || 3001

// Set up handlebars.js engine with helpers
const hbs = exphbs.create({helpers});

const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
})

