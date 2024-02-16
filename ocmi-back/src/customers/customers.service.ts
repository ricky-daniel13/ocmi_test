import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({data: createCustomerDto})
  }

  findAll() {
    return this.prisma.customer.findMany({
      include: {
        user: true, // Return all fields
        },
      });
  }

  async findOne(id: number) {
    const result = await this.prisma.customer.findFirst({
      where: { id: id },
    });
    if (result === null) throw new NotFoundException();

    return result;
  }

  async findOneUser(uid: string) {
    const result = await this.prisma.customer.findFirst({
      where: { userUid: uid },
    });
    if (result === null) throw new NotFoundException();

    return result;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const result = await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
    if (result === null) throw new NotFoundException();

    return result;
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id: id } });
  }
}
