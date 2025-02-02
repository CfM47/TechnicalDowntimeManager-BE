import { department, NewDepartment } from './features/Department/schema';
import { user, NewUser } from './features/User/schema';
import { NewTechnician, technician } from './features/Technician/schema';
import { equipment, NewEquipment } from './features/Equipment/schema';
import { NewRate, rate } from './features/Rate/schema';
import { NewTransfer, transfer } from './features/Transfer/schema';
import { maintenance, NewMaintenance } from './features/Maintenance/schema';
import { downtime, NewDowntime } from './features/Downtime/schema';
import { role, NewRole } from './features/Role/schema';
import { db } from './db/config/db_connect';
import bcrypt from 'bcrypt';
import { Role } from './enums';

/**
 * Seeds the database with initial data for departments, users, technicians, equipments, rates, transfers, maintenances, and downtimes.
 *
 * This function inserts predefined data into the respective tables in the database.
 * It handles any errors that occur during the insertion process and logs them to the console.
 */
const seed = async () => {
  const roles: NewRole[] = [
    {
      id: 1,
      name: Role.admin
    },
    {
      id: 2,
      name: Role.technician
    },
    {
      id: 3,
      name: Role.sectionLeader
    }
  ];

  const departments: NewDepartment[] = [
    {
      id: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      name: 'Dirección'
    },
    {
      id: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      name: 'Recursos Humanos'
    },
    {
      id: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      name: 'Contabilidad'
    },
    {
      id: 'cd53346b-b237-46f4-9ea8-222be05e7e72',
      name: 'Ventas'
    },
    {
      name: 'Desarrollo'
    },
    {
      name: 'Administración'
    },
    {
      name: 'Finanzas'
    },
    {
      name: 'Producción'
    },
    {
      id: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      name: 'Mantenimiento'
    },
    {
      name: 'Seguridad'
    },
    {
      name: 'Calidad'
    },
    {
      name: 'Investigación y Desarrollo'
    },
    {
      name: 'Innovación'
    },
    {
      name: 'Sistemas'
    },
    {
      name: 'Tecnología'
    },
    {
      name: 'Informática'
    },
    {
      name: 'Telecomunicaciones'
    },
    {
      name: 'Redes'
    },
    {
      name: 'Seguridad Informática'
    },
    {
      name: 'Desarrollo de Software'
    },
    {
      name: 'Desarrollo Web'
    },
    {
      name: 'Desarrollo Móvil'
    },
    {
      name: 'Desarrollo de Videojuegos'
    },
    {
      name: 'Desarrollo de Aplicaciones'
    },
    {
      name: 'Desarrollo de Sistemas'
    },
    {
      name: 'Desarrollo de Redes'
    },
    {
      name: 'Desarrollo de Seguridad'
    },
    {
      name: 'Desarrollo de Calidad'
    },
    {
      name: 'Desarrollo de Innovación'
    },
    {
      name: 'Desarrollo de Tecnología'
    },
    {
      name: 'Desarrollo de Informática'
    },
    {
      name: 'Desarrollo de Telecomunicaciones'
    },
    {
      name: 'Desarrollo de Redes'
    }
  ];

  const users: NewUser[] = [
    {
      id: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      name: 'Diego Manuel Viera Martínez',
      password: await bcrypt.hash('1111', 10),
      id_role: 2,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '500e408b-681e-418a-b51a-76d86d5feec6',
      name: 'Pablo Gómez Vidal',
      password: await bcrypt.hash('1111', 10),
      id_role: 2,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '247e10c9-f555-461c-a783-a0af0201c92c',
      name: 'Luis Alejandro Arteaga Morales',
      password: await bcrypt.hash('1111', 10),
      id_role: 1,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '4456449c-808d-4f3d-b390-9767207a9de4',
      name: 'Mauricio Sunde Jiménez',
      password: await bcrypt.hash('1111', 10),
      id_role: 1,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      name: 'Jossué Arteche Muñoz',
      password: await bcrypt.hash('1111', 10),
      id_role: 3,
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    },
    {
      name: 'Ana María López',
      password: await bcrypt.hash('1111', 10),
      id_role: 3,
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    },
    {
      name: 'Carlos Pérez Gonzáles',
      password: await bcrypt.hash('1111', 10),
      id_role: 3,
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'María García Montes de Oca',
      password: await bcrypt.hash('1111', 10),
      id_role: 1,
      id_department: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f'
    },
    {
      name: 'Juan Rodríguez García',
      password: await bcrypt.hash('1111', 10),
      id_role: 3,
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    },
    {
      id: 'f4b865dc-da93-4f93-beeb-c4c2f6d7a5bf',
      name: 'Laura Fernández Martínez',
      password: await bcrypt.hash('1111', 10),
      id_role: 2,
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    },
    {
      id: '04c9b1ce-27b3-4168-aea9-20510bcc8e3b',
      name: 'Pedro Pérez Gonzáles',
      password: await bcrypt.hash('1111', 10),
      id_role: 2,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: 'a5ec0b34-3770-4a71-822a-e1bdc7d2611a',
      name: 'José Agustín del Toro',
      password: await bcrypt.hash('1111', 10),
      id_role: 2,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: 'a7012c3c-2ef4-48c7-97a3-705f05ad5582',
      name: 'José Agustín del Toro',
      password: await bcrypt.hash('1111', 10),
      id_role: 2,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '05da4935-dfa5-46b7-9611-45932e5e7b34',
      name: 'Fransisco Préstamo Bernardes',
      password: await bcrypt.hash('1111', 10),
      id_role: 2,
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    }
  ];

  const technicians: NewTechnician[] = [
    {
      id_user: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      exp_years: 1,
      specialty: 'Electricidad'
    },
    {
      id_user: '500e408b-681e-418a-b51a-76d86d5feec6',
      exp_years: 2,
      specialty: 'Mecánica'
    },
    {
      id_user: '04c9b1ce-27b3-4168-aea9-20510bcc8e3b',
      exp_years: 8,
      specialty: 'Mecánica'
    },
    {
      id_user: 'a5ec0b34-3770-4a71-822a-e1bdc7d2611a',
      exp_years: 4,
      specialty: 'Electricidad'
    },
    {
      id_user: 'a7012c3c-2ef4-48c7-97a3-705f05ad5582',
      exp_years: 5,
      specialty: 'Informático'
    },
    {
      id_user: '05da4935-dfa5-46b7-9611-45932e5e7b34',
      exp_years: 6,
      specialty: 'Mecánica'
    },
    {
      id_user: 'f4b865dc-da93-4f93-beeb-c4c2f6d7a5bf',
      exp_years: 7,
      specialty: 'Informático'
    }
  ];

  const equipments: NewEquipment[] = [
    {
      id: 'cb911356-501b-4a78-bbce-7fee12326946',
      name: 'Computadora',
      type: 'Informático',
      status: 'Operativo',
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      name: 'Impresora',
      type: 'Oficina',
      status: 'Operativo',
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '49d72fb1-30d1-4cd9-bb59-6bc0a2f1a0d6',
      name: 'Monitor',
      type: 'Informático',
      status: 'Mantenimiento',
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    },
    {
      id: 'ca829997-ebe7-4986-990b-a7b6d9fdc614',
      name: 'Teclado',
      type: 'Informático',
      status: 'Baja',
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    },
    {
      name: 'Mouse',
      type: 'Informático',
      status: 'Operativo',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    },
    {
      id: '72c67277-11ac-4dc5-a816-1301303e4ee5',
      name: 'Ventilador',
      type: 'Oficina',
      status: 'Mantenimiento',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    },
    {
      id: '270dc468-6dd2-4037-b3dc-5096234be52d',
      name: 'Aire acondicionado',
      type: 'Oficina',
      status: 'Operativo',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'Lámpara',
      type: 'Oficina',
      status: 'Operativo',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'Tablet',
      type: 'Oficina',
      status: 'Operativo',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'Impresora',
      type: 'Oficina',
      status: 'Operativo',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'Teléfono',
      type: 'Oficina',
      status: 'Operativo',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'Fax',
      type: 'Oficina',
      status: 'Operativo',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'Caja registradora',
      type: 'Oficina',
      status: 'Operativo',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'Caja fuerte',
      type: 'Oficina',
      status: 'Operativo',
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    },
    {
      name: 'Contadora',
      type: 'Oficina',
      status: 'Operativo',
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    }
  ];

  const rates: NewRate[] = [
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Excelente trabajo, muy preciso y confiable.',
      score: 5
    },
    {
      id_user: '4456449c-808d-4f3d-b390-9767207a9de4',
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      comment: 'Buen trabajo, pero tiene que trabajar más horas en la semana',
      score: 3
    },
    {
      id_user: '247e10c9-f555-461c-a783-a0af0201c92c',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Muy buen trabajo, se esfuerza mucho en lo que hace y optimiza mucho su tiempo',
      score: 5
    },
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      comment: 'Excelente trabajo, demora un poco en algunas tareas',
      score: 4
    },
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      comment: 'Mal trabajo, no es muy eficiente en su trabajo',
      score: 2
    },
    {
      id_user: '247e10c9-f555-461c-a783-a0af0201c92c',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Muy enfocado en lo que hace',
      score: 4
    },
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'No hay quejas sobre su trabajo',
      score: 4
    },
    {
      id_user: '4456449c-808d-4f3d-b390-9767207a9de4',
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      comment: 'Buen trabajo, pero tiene que trabajar más horas en la semana',
      score: 3
    },
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Muy bien, muy óptimo su trabajo',
      score: 3
    },
    {
      id_user: '4456449c-808d-4f3d-b390-9767207a9de4',
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      comment: 'Mal trabajo, puede esforzarse más',
      score: 2
    },
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      comment: 'Mal trabajo, no es muy eficiente en su trabajo',
      score: 2
    },
    {
      id_user: '247e10c9-f555-461c-a783-a0af0201c92c',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Muy enfocado en lo que hace',
      score: 4
    },
    {
      id_user: '247e10c9-f555-461c-a783-a0af0201c92c',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Muy buen trabajo, se esfuerza mucho en lo que hace y optimiza mucho su tiempo',
      score: 5
    },
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Excelente trabajo, muy preciso y confiable.',
      score: 5
    },
    {
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      comment: 'Muy bien, muy óptimo su trabajo',
      score: 3
    }
  ];

  const transfers: NewTransfer[] = [
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      id_receiver_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      status: 'Completado'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      id_receiver_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Completado'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      id_receiver_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      status: 'Completado'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      id_receiver_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Completado'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      id_receiver_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      status: 'Completado'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      id_receiver_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Completado'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      id_receiver_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      status: 'Completado'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      id_receiver_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Completado'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      id_receiver_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      status: 'Completado'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      id_receiver_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Completado'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      id_receiver_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      status: 'Completado'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      id_receiver_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Completado'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      id_receiver_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      status: 'Completado'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_origin_dep: '2a67444c-734e-416e-a9c0-17dbdac4819c',
      id_receiver_dep: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Completado'
    }
  ];

  const maintenances: NewMaintenance[] = [
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      type: 'Preventivo',
      cost: 100
    },
    {
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      type: 'Correctivo',
      cost: 200
    },
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      type: 'Preventivo',
      cost: 150
    },
    {
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      type: 'Correctivo',
      cost: 250
    },
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      type: 'Preventivo',
      cost: 120
    },
    {
      id_technician: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      type: 'Correctivo',
      cost: 353
    },
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      type: 'Preventivo',
      cost: 299
    },
    {
      id_technician: 'f4b865dc-da93-4f93-beeb-c4c2f6d7a5bf',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      type: 'Correctivo',
      cost: 250
    },
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      type: 'Preventivo',
      cost: 130
    },
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      type: 'Preventivo',
      cost: 199
    },
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      type: 'Preventivo',
      cost: 24
    },
    {
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      type: 'Preventivo',
      cost: 89
    },
    {
      id_technician: 'f4b865dc-da93-4f93-beeb-c4c2f6d7a5bf',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      type: 'Correctivo',
      cost: 250
    }
  ];

  const downtimes: NewDowntime[] = [
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en el sistema operativo'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: '056385ca-5db2-4b83-a6c7-f0f40ddecd60',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en la cinta'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '49d72fb1-30d1-4cd9-bb59-6bc0a2f1a0d6',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en la pantalla'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'ca829997-ebe7-4986-990b-a7b6d9fdc614',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Pendiente de evaluación',
      cause: 'Fallos en algunas teclas'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en puerto HDMI'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Pendiente de evaluación',
      cause: 'Falla en puerto USB'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en el sistema operativo'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Pendiente de evaluación',
      cause: 'Falla en el botón de encendido'
    },
    {
      id_sender: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_receiver: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_equipment: '72c67277-11ac-4dc5-a816-1301303e4ee5',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en el motor'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '270dc468-6dd2-4037-b3dc-5096234be52d',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en el sistema de enfriamiento'
    },
    {
      id_sender: '500e408b-681e-418a-b51a-76d86d5feec6',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '270dc468-6dd2-4037-b3dc-5096234be52d',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Pendiente de evaluación',
      cause: 'Falla en el sistema de arranque'
    }
  ];

  try {
    for (const r of roles) {
      await db.insert(role).values(r);
    }
    for (const dep of departments) {
      await db.insert(department).values(dep);
    }
    for (const us of users) {
      await db.insert(user).values(us);
    }
    for (const tec of technicians) {
      await db.insert(technician).values(tec);
    }
    for (const eq of equipments) {
      await db.insert(equipment).values(eq);
    }
    for (const r of rates) {
      await db.insert(rate).values(r);
    }
    for (const tr of transfers) {
      await db.insert(transfer).values(tr);
    }
    for (const m of maintenances) {
      await db.insert(maintenance).values(m);
    }
    for (const down of downtimes) {
      await db.insert(downtime).values(down);
    }
    console.log('Database seeded successfully');
  } catch (e) {
    console.log('Error seeding database: ', e);
  }
};

seed();
