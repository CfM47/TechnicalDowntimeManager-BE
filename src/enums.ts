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

export enum ResourcePages {
  HOME_PAGE = 'HOME_PAGE',
  EQUIPMENT_PAGE = 'EQUIPMENT_PAGE',
  MAINTENANCE_PAGE = 'MAINTENANCE_PAGE',
  DOWNTIME_PAGE = 'DOWNTIME_PAGE',
  RATE_PAGE = 'RATE_PAGE',
  TRANSFER_PAGE = 'TRANSFER_PAGE',
  USER_PAGE = 'USER_PAGE',
  REPORT_PAGE = 'REPORT_PAGE',
  REPORT_DEFECTIVE_EQUIPMENTS_PAGE = 'REPORT_DEFECTIVE_EQUIPMENTS_PAGE',
  REPORT_DEPT_TRANSFER_HISTORY_PAGE = 'REPORT_DEPT_TRANSFER_HISTORY_PAGE',
  REPORT_LAST_YEAR_DOWNTIMES_PAGE = 'REPORT_LAST_YEAR_DOWNTIMES_PAGE',
  REPORT_MAINTENANCE_HISTORY_PAGE = 'REPORT_MAINTENANCE_HISTORY_PAGE',
  REPORT_TECHNICIAN_INTERVENTIONS_PAGE = 'REPORT_TECHNICIAN_INTERVENTIONS_PAGE',
  REPORT_TECHNICIAN_PERFORMANCE_PAGE = 'REPORT_TECHNICIAN_PERFORMANCE_PAGE',
  REPORT_TRANSFER_HISTORY_PAGE = 'REPORT_TRANSFER_HISTORY_PAGE'
}
