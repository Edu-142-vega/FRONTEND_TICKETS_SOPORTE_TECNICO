import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);


  const usersData = [
    {
      nombre: 'Admin Soporte',
      email: 'admin@soporte.com',
      password: 'adminpassword',
      role: 'ADMIN',
    },
    {
      nombre: 'Juan Perez',
      email: 'juan@cliente.com',
      password: 'user1234',
      role: 'USER',
    },
  ];

  console.log('🌱 Iniciando el seeding de usuarios...');

  for (const u of usersData) {
    const exists = await userRepository.findOneBy({ email: u.email });
    
    if (!exists) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const newUser = userRepository.create({
        ...u,
        password: hashedPassword,
      });
      await userRepository.save(newUser);
      console.log(`✅ Usuario ${u.email} creado.`);
    } else {
      console.log(`⚠️ Usuario ${u.email} ya existe, saltando...`);
    }
  }

  console.log('🚀 Seeding completado con éxito.');
};