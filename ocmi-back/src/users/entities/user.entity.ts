import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
    @ApiProperty()
    uid: string;
    @ApiProperty()
    mail: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    access: number;
}
