import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput): Promise<User> {
    throw new Error('Not implemented yet');
  }

  async findAll(): Promise<User[]> {
    throw new Error('create findAll Not implemented yet');
  }

  async findOne(id: string): Promise<User> {
    throw new Error('findOne Not implemented yet');
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    throw new Error('update Not implemented yet');
  }

  async blockUser(id: string): Promise<User> {
    throw new Error('blockUser Not implemented yet');
  }
}
