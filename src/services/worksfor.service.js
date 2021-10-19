const httpStatus = require('http-status');
const { Worksfor } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a worksfor
 * @param {Object} worksforBody
 * @returns {Promise<Worksfor>}
 */
const createWorksfor = async (worksforBody) => {
  
  return Worksfor.create(worksforBody);
};

/**
 * Query for worksfors
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWorksfors = async (filter, options) => {
  const worksfors = await Worksfor.paginate(filter, options);
  return worksfors;
};

/**
 * Get worksfor by id
 * @param {ObjectId} id
 * @returns {Promise<Worksfor>}
 */
const getWorksforById = async (id) => {
  return Worksfor.findById(id);
};

/**
 * Get worksfor by email
 * @param {string} email
 * @returns {Promise<Worksfor>}
 */
const getWorksforByEmail = async (email) => {
  return Worksfor.findOne({ email });
};

/**
 * Update worksfor by id
 * @param {ObjectId} worksforId
 * @param {Object} updateBody
 * @returns {Promise<Worksfor>}
 */
const updateWorksforById = async (worksforId, updateBody) => {
  const worksfor = await getWorksforById(worksforId);
  if (!worksfor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Worksfor not found');
  }
  if (updateBody.email && (await Worksfor.isEmailTaken(updateBody.email, worksforId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(worksfor, updateBody);
  await worksfor.save();
  return worksfor;
};

/**
 * Delete worksfor by id
 * @param {ObjectId} worksforId
 * @returns {Promise<Worksfor>}
 */
const deleteWorksforById = async (worksforId) => {
  const worksfor = await getWorksforById(worksforId);
  if (!worksfor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Worksfor not found');
  }
  await worksfor.remove();
  return worksfor;
};

module.exports = {
  createWorksfor,
  queryWorksfors,
  getWorksforById,
  getWorksforByEmail,
  updateWorksforById,
  deleteWorksforById,
};
