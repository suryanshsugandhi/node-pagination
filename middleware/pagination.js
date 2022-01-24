function buildIncorrectObjectErrorMessage(object) {
  return `Invalid ${object}. Please enter a valid value.`;
}

module.exports = function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (page <= 0) {
      res.status(400).json({
        error: buildIncorrectObjectErrorMessage("page number"),
      });
      next();
      return;
    } else if (limit <= 0) {
      res.status(400).json({
        error: buildIncorrectObjectErrorMessage("page limit"),
      });
      next();
      return;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalElements = await model.countDocuments().exec();
    const totalPages = Math.ceil(totalElements / limit);

    const results = { totalElements, totalPages, page, limit };

    if (endIndex < totalElements) {
      results.next = page + 1;
    }

    if (startIndex > 0) {
      results.previous = page - 1;
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
