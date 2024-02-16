import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "@prisma/client";
import { UserEntity } from "src/users/entities/user.entity";

export class CustomerEntity implements Customer{
    @ApiProperty()
    id: number;
    @ApiProperty()
    bussName: string;
    @ApiProperty()
    userUid: string;
    @ApiProperty()
    user: UserEntity;
}
