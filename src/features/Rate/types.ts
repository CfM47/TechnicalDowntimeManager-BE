import { UserInfo } from '../User/types';
import { TechnicianInfo } from '../Technician/types';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { rate } from './schema';

/**
 * Represents a rate given by a user to a technician.
 *
 * @property technician - Information about the technician being rated.
 * @property user - Information about the user who provided the rate.
 * @property date - The date when the rate was given.
 * @property comment - A textual comment provided by the user.
 * @property score - An integer score given by the user.
 */
export interface RateType {
  technician: TechnicianInfo;
  user: UserInfo;
  date: string;
  comment: string;
  score: number;
}

/**
 * Defines the selection fields for the `rate` table.
 *
 * This object specifies the fields to be selected when querying the `rate` table,
 * including related technician and user information.
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
