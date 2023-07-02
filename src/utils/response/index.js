const errorResponse = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message
  })
}

const errorResponseWithField = (res, status, field, message) => {
  return res.status(status).json({
    success: false,
    field,
    message
  })
}

const successResponse = (res, status, item) => {
  return res.status(status).json({
    success: true,
    item
  })
}

const successItemsResponse = (res, status, items) => {
  return res.status(status).json({
    success: true,
    items
  })
}

const paginatedItemsResponse = (res, status, items, paginate) => {
  const pages = numberOfPages(paginate.total, paginate.perPage)
  return res.status(status).json({
    success: true,
    paginate: {
      ...paginate,
      pages
    },
    items
  })
}

const numberOfPages = (total, perPage) => {
  if (total === 0 || perPage === 0) return 0

  return Math.ceil(total / perPage)
}

/* export PaginateSettings {
 total: number
  currentPage: number
  perPage: number 
} */

module.exports = {
  errorResponse,
  errorResponseWithField,
  successResponse,
  successItemsResponse,
  paginatedItemsResponse,
  numberOfPages
}
