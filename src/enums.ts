/**
 * Enum representing the various statuses of downtime.
 */
export const DowntimeStatuses: [string, ...string[]] = [
  'Pendiente de evaluación',
  'Retirado del servicio',
  'Reutilizado',
  'Baja Definitiva'
];

/**
 * Enum representing the various statuses of equipment.
 */
export const EquipmentStatuses: [string, ...string[]] = ['Operativo', 'Mantenimiento', 'Baja'];

/**
 * Enum representing the various types of equipment.
 */
export const EquipmentTypes: [string, ...string[]] = [
  'Informático',
  'Comunicaciones',
  'Electrónico',
  'Seguridad',
  'Oficina'
];

/**
 * Enum representing the various statuses of transfer.
 */

export const TransferStatuses: [string, ...string[]] = [
  'Pendiente',
  'Completado',
  'Aprobado',
  'Cancelado'
];

/**
 * Enum representing the various types of maintenance.
 */

export const MaintenanceTypes: [string, ...string[]] = ['Preventivo', 'Correctivo', 'Predictivo'];

export enum Role {
  admin = 'Administrator',
  technician = 'Technician',
  sectionLeader = 'Section Leader',
  user = 'User'
}
