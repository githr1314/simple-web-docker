const { join } = require("path");

const config = {
  logDir: join(__dirname, "../logs/"),
  viewDir: join(__dirname, "../../web/views"),
  assetsDir: join(__dirname, "../../assets")
};

if (false) {
  console.log("log log");
}

if (process.env.NODE_ENV === "development") {
  config.prot = 3001;
}

if (process.env.NODE_ENV === "production") {
  config.prot = 80;
}

module.exports = config;
