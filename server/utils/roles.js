const AccessControl = require("accesscontrol");

let grantsObject = {
  admin: {
    item: {
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  benutzer: {
    item: {
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = roles;
