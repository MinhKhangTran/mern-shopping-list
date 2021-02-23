const roles = require("../utils/roles");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(400).json({
          success: false,
          msg: "Du hast keine AdminRechte, besorg dir welche!",
        });
      }
      res.locals.permission = permission;
      next();
    } catch (error) {
      next(error);
    }
  };
};
