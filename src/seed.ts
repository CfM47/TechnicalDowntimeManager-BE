import { department, NewDepartment } from './features/Department/schema';
import { user, NewUser } from './features/User/schema';
import { NewTechnician, technician } from './features/Technician/schema';
import { equipment, NewEquipment } from './features/Equipment/schema';
import { NewRate, rate } from './features/Rate/schema';
import { NewTransfer, transfer } from './features/Transfer/schema';
import { maintenance, NewMaintenance } from './features/Maintenance/schema';
import { downtime, NewDowntime } from './features/Downtime/schema';
import { db } from './db/config/db_connect';
import bcrypt from 'bcrypt';

/**
 * Seeds the database with initial data for departments, users, technicians, equipments, rates, transfers, maintenances, and downtimes.
 *
 * This function inserts predefined data into the respective tables in the database.
 * It handles any errors that occur during the insertion process and logs them to the console.
 */
const seed = async () => {
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
      role: 'Técnico',
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '500e408b-681e-418a-b51a-76d86d5feec6',
      name: 'Pablo Gómez Vidal',
      password: await bcrypt.hash('1111', 10),
      role: 'Técnico',
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '247e10c9-f555-461c-a783-a0af0201c92c',
      name: 'Luis Alejandro Arteaga Morales',
      password: await bcrypt.hash('1111', 10),
      role: 'Administrador',
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '4456449c-808d-4f3d-b390-9767207a9de4',
      name: 'Mauricio Sunde Jiménez',
      password: await bcrypt.hash('1111', 10),
      role: 'Administrador',
      id_department: '614ce720-78e3-43f2-9c19-93cff24b77ac'
    },
    {
      id: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      name: 'Jossué Arteche Muñoz',
      password: await bcrypt.hash('1111', 10),
      role: 'Jefe de sección',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    },
    {
      name: 'Ana María López',
      password: await bcrypt.hash('1111', 10),
      role: 'Jefe de sección',
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    },
    {
      name: 'Carlos Pérez Gonzáles',
      password: await bcrypt.hash('1111', 10),
      role: 'Jefe de sección',
      id_department: 'cd53346b-b237-46f4-9ea8-222be05e7e72'
    },
    {
      name: 'María García Montes de Oca',
      password: await bcrypt.hash('1111', 10),
      role: 'Administrador',
      id_department: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f'
    },
    {
      name: 'Juan Rodríguez García',
      password: await bcrypt.hash('1111', 10),
      role: 'Jefe de sección',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    },
    {
      name: 'Laura Fernández Martínez',
      password: await bcrypt.hash('1111', 10),
      role: 'Jefe de sección',
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
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
      name: 'Monitor',
      type: 'Informático',
      status: 'Mantenimiento',
      id_department: '2a67444c-734e-416e-a9c0-17dbdac4819c'
    },
    {
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
      name: 'Ventilador',
      type: 'Oficina',
      status: 'Mantenimiento',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    },
    {
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
      status: 'Pendiente'
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
      id_equipment: 'cb911356-501b-4a78-bbce-7fee12326946',
      id_dep_receiver: '614ce720-78e3-43f2-9c19-93cff24b77ac',
      status: 'Reutilizado',
      cause: 'Falla en el sistema operativo'
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
      cause: 'Falla en el sistema operativo'
    }
  ];

  try {
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
