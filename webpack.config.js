const path = require("path");

module.exports = {
  //...
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, "resources/styles/"),
    },
  },
};
