import { DepartmentType } from '../Department/types';
import { EquipmentInfo } from '../Equipment/types';
import { UserInfo } from '../User/types';
import { downtime } from './schema';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';

/**
 * Represents a downtime reporting structure, which includes information about the sender, receiver,
 * affected equipment, and other related details.
 *
 * Interface DowntimeType provides the framework to capture and store data about equipment downtime.
 *
 * Properties:
 * - sender: Information about the user reporting the downtime.
 * - receiver: Information about the user or entity receiving the downtime report.
 * - equipment: Details of the affected equipment experiencing downtime.
 * - date: The date when the downtime occurred or was reported.
 * - dep_receiver: The department of the receiver handling the downtime report.
 * - status: The current status of the downtime (e.g., pending, resolved).
 * - cause: The explanation or reason for the downtime occurrence.
 */
export interface DowntimeType {
  sender: UserInfo;
  receiver: UserInfo;
  equipment: EquipmentInfo;
  date: string;
  dep_receiver: DepartmentType;
  status: string;
  cause: string;
}

/**
 * Represents the selected downtime information.
 *
 * @property {Object} sender - Information about the sender.
 * @property {number} sender.id - The ID of the sender.
 * @property {string} sender.name - The name of the sender.
 *
 * @property {Object} receiver - Information about the receiver.
 * @property {number} receiver.id - The ID of the receiver.
 * @property {string} receiver.name - The name of the receiver.
 *
 * @property {Object} equipment - Details of the equipment involved.
 * @property {number} equipment.id - The ID of the equipment.
 * @property {string} equipment.name - The name of the equipment.
 *
 * @property {string} date - The date of the downtime event.
 *
 * @property {Object} dep_receiver - Information about the receiver's department.
 * @property {number} dep_receiver.id - The ID of the receiver's department.
 * @property {string} dep_receiver.name - The name of the receiver's department.
 *
 * @property {string} status - The current status of the downtime event.
 *
 * @property {string} cause - The cause of the downtime.
 */
export const downtimeSelection = {
  sender: {
    id: downtime.id_sender,
    name: alias(user, 'sender').name
  },
  receiver: {
    id: downtime.id_receiver,
    name: alias(user, 'receiver').name
  },
  equipment: {
    id: downtime.id_equipment,
    name: equipment.name
  },
  date: downtime.date,
  dep_receiver: {
    id: downtime.id_dep_receiver,
    name: department.name
  },
  status: downtime.status,
  cause: downtime.cause
};

/**
 * Represents a table structure for downtime data from the last year.
 * This interface outlines the key properties used to define the
 * sender, receiver, associated equipment, and destination of the data.
 *
 * Properties:
 * - Sender: Identifies the originator of the downtime data.
 * - Receiver: Identifies the recipient or endpoint for the downtime data.
 * - Equipment: Specifies the equipment associated with the downtime instance.
 * - Destiny: Denotes the destination or final target relevant to the data.
 */
export interface DowntimeLastYearTypeTable {
  Sender: string;
  Receiver: string;
  Equipment: string;
  Destiny: string;
}
