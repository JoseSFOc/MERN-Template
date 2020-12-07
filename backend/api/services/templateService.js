const Template = require("../models/template");
const allFacade = require("../dao/allFacade");
const templateFacade = require("../dao/graffitiFacade");

/* Find with custom query
exports.findAll = async (req, res, next) => {
  try {
    const sortBy = req.query.sortBy;
    const orderBy = req.query.orderBy;
    const query = new mongoose.Query();
    let conditions = {};

    for (let key in req.query) {
      req.query[key] !== orderBy &&
      req.query[key] !== sortBy &&
      req.query[key] !== ""
        ? (conditions[key] = req.query[key])
        : null;
    }

    query.setQuery(conditions);
    if (sortBy) query.setOptions({ sort: { [sortBy]: orderBy } });

    res.status(200).json(await allFacade.findQuery(Template, query));
  } catch (err) {
    next(err);
  }
};
*/

exports.findAll = async function (req, res, next) {
  try {
    res.status(200).json(await allFacade.find(Template));
  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    res.status(200).json(await allFacade.findById(Template, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await allFacade.create(Template, req.body));
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    res.status(200).json(await allFacade.delete(Template, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.put = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await allFacade.put(Template, req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};

const templateService = require("../services/templateService");
