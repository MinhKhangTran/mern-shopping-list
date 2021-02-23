const AccessControl = require("accesscontrol");

let grantsObject = {
  admin: {},
  benutzer: {}
};

const roles = new AccessControl(grantsObject);

module.exports = roles;
