/**
 * DowntimeStatuses is an array that contains a predefined list of status messages
 * representing the different potential states for a downtime or service interruption.
 * It includes statuses in Spanish such as 'Pendiente de evaluación' (Pending evaluation),
 * 'Retirado del servicio' (Removed from service), 'Reutilizado' (Reused), and
 * 'Baja Definitiva' (Permanently decommissioned).
 *
 * The array is structured with a required first status as a string, followed by an
 * arbitrary number of additional string statuses.
 */
export const DowntimeStatuses: [string, ...string[]] = [
  'Pendiente de evaluación',
  'Retirado del servicio',
  'Reutilizado',
  'Baja Definitiva'
];

/**
 * EquipmentStatuses is an array of strings representing the status of equipment.
 * The first element is the default or primary status, and additional elements represent optional statuses.
 *
 * Default values include:
 * - 'Operativo': Indicates that the equipment is operational and functioning as intended.
 * - 'Mantenimiento': Indicates that the equipment is under maintenance and not currently operational.
 * - 'Baja': Indicates that the equipment is decommissioned or no longer in use.
 */
export const EquipmentStatuses: [string, ...string[]] = ['Operativo', 'Mantenimiento', 'Baja'];

/**
 * Represents an array of equipment types used for categorization purposes.
 * The first entry in the array is mandatory, followed by an arbitrary number
 * of additional equipment type strings.
 *
 * `EquipmentTypes` provides a predefined list of commonly used equipment categories:
 * - Informático: Represents IT equipment.
 * - Comunicaciones: Represents communication equipment.
 * - Electrónico: Represents electronic devices.
 * - Seguridad: Represents security equipment.
 * - Oficina: Represents office equipment.
 */
export const EquipmentTypes: [string, ...string[]] = [
  'Informático',
  'Comunicaciones',
  'Electrónico',
  'Seguridad',
  'Oficina'
];

/**
 * An array of strings representing the various statuses of a transfer process.
 *
 * TransferStatuses is used to outline the potential states a transfer can hold
 * during its lifecycle. These statuses provide a clear and consistent way to
 * track and manage the flow of transfer-related operations.
 *
 * The available statuses included in the array are:
 * - "Pendiente": Indicates the transfer is pending and awaiting further actions.
 * - "Completado": Denotes that the transfer has been successfully completed.
 * - "Aprobado": Shows that the transfer has been approved.
 * - "Cancelado": Specifies that the transfer has been canceled.
 */

export const TransferStatuses: [string, ...string[]] = [
  'Pendiente',
  'Completado',
  'Aprobado',
  'Cancelado'
];

/**
 * Represents a tuple that contains predefined maintenance types in the first element
 * and allows for additional maintenance types as a list of strings.
 * The first element in the array specifies the core maintenance type.
 * The additional elements, if provided, allow for extending the predefined list.
 *
 * This variable is designed to capture various maintenance categories,
 * both standardized and custom-defined.
 *
 * Maintenance types commonly used:
 * - Preventivo (Preventive Maintenance)
 * - Correctivo (Corrective Maintenance)
 * - Predictivo (Predictive Maintenance)
 */

export const MaintenanceTypes: [string, ...string[]] = ['Preventivo', 'Correctivo', 'Predictivo'];

/**
 * Represents the possible roles in the system.
 *
 * The array includes predefined roles that a user can assume. It starts with a primary role
 * followed by any additional roles that can be defined dynamically.
 *
 * Default roles included:
 * - 'Administrador': Represents an administrator role with full permissions in the system.
 * - 'Técnico': Represents a technical role for users dealing with system maintenance or support.
 * - 'Jefe de sección': Represents a section leader, overseeing a specific part of the organization.
 *
 * The list is extensible and additional roles beyond the default can be appended.
 */
export const Roles: [string, ...string[]] = ['Administrador', 'Técnico', 'Jefe de sección'];
