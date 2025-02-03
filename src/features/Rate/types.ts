import { UserInfo } from '../User/types';
import { TechnicianInfo } from '../Technician/types';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { rate } from './schema';

/**
 * Represents a rate type that contains information about a rating given by a user for a technician.
 *
 * @interface RateType
 * @property {TechnicianInfo} technician - The information about the technician being rated.
 * @property {UserInfo} user - The information about the user who provided the rating.
 * @property {string} date - The date when the rating was provided in ISO 8601 format.
 * @property {string} comment - A comment or feedback provided by the user as part of the rating.
 * @property {number} score - The score given as part of the rating, typically expressed as a number.
 */
export interface RateType {
  technician: TechnicianInfo;
  user: UserInfo;
  date: string;
  comment: string;
  score: number;
}

/**
 * An object representing the order by criteria for sorting rates.
 *
 * @constant {Object} RateOrderBy
 * @property {string} score - The rating score used as a criterion for sorting.
 * @property {string} date - The date used as a criterion for sorting.
 */
export const RateOrderBy = {
  score: rate.score,
  date: rate.date
};

/**
 * Represents the selection data used for rating, containing information
 * about the technician, user, and the associated details of the rating.
 *
 * @typedef {Object} rateSelection
 * @property {Object} technician - Details about the technician being rated.
 * @property {number|string} technician.id - The identifier of the technician.
 * @property {string} technician.name - The name of the technician.
 * @property {Object} user - Details about the user providing the rating.
 * @property {number|string} user.id - The identifier of the user providing the rating.
 * @property {string} user.name - The name of the user providing the rating.
 * @property {string|Date} date - The date when the rating was provided.
 * @property {string} comment - The comment provided by the user as part of the rating.
 * @property {number} score - The numeric score given in the rating.
 */
export const rateSelection = {
  technician: {
    id: alias(user, 'technician').id,
    name: alias(user, 'technician').name
  },
  user: {
    id: user.id,
    name: user.name
  },
  date: rate.date,
  comment: rate.comment,
  score: rate.score
};
