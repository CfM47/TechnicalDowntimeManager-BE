import { UserInfo } from '../User/types';
import { TechnicianInfo } from '../Technician/types';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { rate } from './schema';

export interface RateType {
  technician: TechnicianInfo;
  user: UserInfo;
  date: string;
  comment: string;
  score: number;
}

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
