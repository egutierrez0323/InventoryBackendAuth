import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdParam } from 'src/utils/dto/findByIdParam.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordDTO } from './dto/password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createuser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findall')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findone:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Put('update:id')
  update(@Param('id') id: FindByIdParam, @Body() updateUserDto: UpdateUserDto) {
    console.log(id);
    console.log(updateUserDto);
    return this.userService.update(+id, updateUserDto);
  }

  @Put('changepass:id')
  changepassword(
    @Param('id') id: FindByIdParam,
    @Body() passworddto: PasswordDTO,
  ) {
    console.log(id);
    console.log(passworddto);
    return this.userService.changePassword(+id, passworddto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: FindByIdParam) {
  //   return this.userService.remove(+id);
  // }
}
