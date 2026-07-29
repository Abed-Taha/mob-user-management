import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  public static usersCount = 0;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run() {
    const hashedPass = await bcrypt.hash('1234567', 10);

    const users: Partial<User>[] = [];

    for (let i = 1; i <= 30; i++) {
      const email = `user${i}@test.com`;

      const userExist = await this.userRepository.findOne({
        where: { email },
      });

      if (userExist) {
        console.log(`${email} already exists`);
        continue;
      }

      users.push({
        fullName: `User ${i}`,
        email,
        password: hashedPass,
      });
    }

    if (users.length > 0) {
      await this.userRepository.save(users);
      console.log(`${users.length} users created`);
    } else {
      console.log('All users already exist');
    }
  }

  get usersCount() {
    return SeedService.usersCount;
  }
}
