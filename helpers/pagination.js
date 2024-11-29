module.exports = (objectPagination, query, countProduct) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  const totalPage = Math.ceil(countProduct / objectPagination.limitItem);

  objectPagination.totalPage = totalPage;

  return objectPagination;
};
