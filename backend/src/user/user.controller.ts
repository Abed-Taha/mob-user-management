import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
import { UpdateUser } from 'src/dto/update-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post('login')
  async login(@Body() userInfo: LoginUserDto) {
    return this.userService.login(userInfo);
  }

  @Get()
  async getAll(@Paginate() query: PaginateQuery) {
    return this.userService.findAll(query);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUser) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.userService.deleteUserResponse(id);
  }
}
