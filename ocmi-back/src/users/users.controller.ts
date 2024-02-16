import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBasicAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';


@Controller('users')
@ApiTags('users')
@ApiBasicAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: UserEntity, isArray: false })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uid')
  @ApiOkResponse({ type: UserEntity, isArray: false })
  findOne(@Param('uid') uid: string) {
    console.log("Getting single uid");
    return this.usersService.findOneUid(uid);
  }

  @Patch(':uid')
  @ApiOkResponse({ type: UserEntity, isArray: false })
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uid, updateUserDto);
  }

  @Delete(':uid')
  @ApiOkResponse({ type: UserEntity, isArray: false })
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }
}
