import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AnswersService } from 'src/models/responses/response.model';
import { UserService } from 'src/user/user.service';
import { Compare } from 'src/utils/handlers/handlerBcrypt';
import { LoginUser } from './dto/login-user-auth.dto';
import { PayloadDTO } from './dto/payload-auth.dto';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtAuthService: JwtService,
  ) {}

  async logIn(credentials: LoginUser): Promise<AnswersService> {
    try {
      let response = new AnswersService();
      const userForLogin = await this.userService.findByUsername(
        credentials.username,
      );

      if (!userForLogin)
        throw new NotFoundException('There is no user with this username');

      if (!Compare(credentials.password, userForLogin.password))
        throw new ForbiddenException(
          'Wrong password, try again with a different password',
        );

      const payload: PayloadDTO = {
        id: userForLogin.id,
        username: userForLogin.username,
        role: 'admin',
      };
      const token = this.jwtAuthService.sign(payload);

      if (userForLogin) {
        response = {
          httpCode: 200,
          success: 1,
          message: 'User logged in successfully',
          token,
          data: userForLogin,
        };
      }
      console.log(credentials);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  // async PayloadGenerate(id: number, username: string, role: string) {
  //   const payload: PayloadDTO = {
  //     id,
  //     username,
  //     role,
  //   };
  //   return;
  // }
}
