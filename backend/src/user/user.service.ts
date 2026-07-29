import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  PaginateConfig,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { UpdateUser } from 'src/dto/update-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';

const BCRYPT = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<object> {
    const hashed = await bcrypt.hash(user.password, BCRYPT);
    const newUser = this.userRepository.create({ ...user, password: hashed });
    await this.userRepository.save(newUser);
    return { message: 'User created successfully', id: newUser.id };
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      id,
    });
    return user;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User | null>> {
    const config: PaginateConfig<User> = {
      sortableColumns: ['id', 'fullName', 'email', 'createdAt'],
      searchableColumns: ['fullName', 'email'],
      defaultSortBy: [['createdAt', 'ASC']],
      filterableColumns: {
        deletedAt: [FilterOperator.NULL, FilterSuffix.NOT],
      },
      withDeleted: true,
      maxLimit: 10,
    };
    const userId = 0;
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.id != :userId', { userId });

    return paginate(query, queryBuilder, config);
  }

  async update(id: number, user: UpdateUser): Promise<User | null> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException({ message: 'User Not Found!' });
    return user;
  }

  async login(userInfo: LoginUserDto): Promise<object> {
    const user = await this.findByEmail(userInfo);
    if (!user) throw new NotFoundException({ message: 'email or password is Incorrect' });
    return { data: user, message: 'Logged In successfully' };
  }

  async updateUser(id: number, user: UpdateUser): Promise<object | boolean> {
    const selectedUser = await this.findOne(id);
    if (!selectedUser) return false;
    const updatedUser = await this.update(id, user);
    return { message: 'User Updated Successfully', data: updatedUser };
  }

  async deleteUser(id: number): Promise<boolean> {
    const status = await this.userRepository.delete(id);
    const affected = status.affected ?? 0;
    return affected > 0;
  }

  async deleteUserResponse(id: number): Promise<object> {
    const status = await this.deleteUser(id);
    return status ? { message: 'User Deleted Successfully' } : { message: 'Something Went Wrong' };
  }

  async softDelete(id: number): Promise<boolean> {
    const status = await this.userRepository.softDelete(id);
    const affected = status.affected ?? 0;
    return affected > 0;
  }

  async findByEmail(userdto: LoginUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: userdto.email },
    });
    if (!user) return null;
    const match = await bcrypt.compare(userdto.password, user.password);
    return match ? user : null;
  }

  async disableUser(id: number): Promise<number> {
    const res = await this.userRepository.softDelete(id);
    return res.affected ?? 0;
  }

  async restoreUser(id: number): Promise<number> {
    const res = await this.userRepository.restore(id);
    return res.affected ?? 0;
  }
}
