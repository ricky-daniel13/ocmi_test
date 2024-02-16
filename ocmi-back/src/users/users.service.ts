import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash('createUserDto.password', 10);
    return {
      uid: (await this.prisma.user.create({ data: createUserDto })).uid,
    };
  }

  findAll() {
    return this.prisma.user.findMany(/*{ where: { published: true } }*/);
  }

  async findOneMail(username: string) {
    const result = await this.prisma.user.findFirst({
      where: { mail: username },
    });
    if (result === null) throw new NotFoundException();

    return result;
  }

  async findOneUid(uid: string) {
    const result = await this.prisma.user.findFirst({ where: { uid: uid } });
    console.log('Result:');
    console.log(result);
    if (result === null) throw new NotFoundException();

    return result;
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    const result = await this.prisma.user.update({
      where: { uid },
      data: updateUserDto,
    });
    if (result === null) throw new NotFoundException();

    return result;
  }

  remove(uid: string) {
    return this.prisma.user.delete({ where: { uid: uid } });
  }
}
