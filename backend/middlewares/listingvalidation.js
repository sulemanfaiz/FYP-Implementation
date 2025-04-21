const listingValidation = (req, res, next) => {
  //   const schema = Joi.object({
  //     path: Joi.string().email().required(),
  //     fileName: Joi.string().min(4).max(100).required(),
  //   });
  //   const { error } = schema.validate(req.body);
  //   if (error) {
  //     return res.status(400).json({ message: "Bad request", error });
  //   }
  next();
};
module.exports = {
  listingValidation,
};
