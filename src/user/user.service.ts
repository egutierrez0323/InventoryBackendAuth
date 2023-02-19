import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { AnswersService } from 'src/models/responses/response.model';
import { Encrypt, Compare } from 'src/utils/handlers/handlerBcrypt';
import { PasswordDTO } from './dto/password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * It creates a new user in the database
   * @param {CreateUserDto} createUserDto - CreateUserDto
   * @returns The user object.
   */
  async create(createUserDto: CreateUserDto) {
    try {
      let response = new AnswersService();
      /* Creating a new object with the same properties as the CreateUserDto, but it is encrypting the
      password. */
      const userObject: CreateUserDto = {
        username: createUserDto.username,
        password: await Encrypt(createUserDto.password),
        email: createUserDto.email,
        fullname: createUserDto.fullname,
      };

      if (await this.UserExists(createUserDto.username)) {
        throw new ConflictException(
          'This username already exists in the table users.',
        );
      }

      const newUser = this.userRepository.create(userObject);

      if (this.userRepository.save(newUser)) {
        response = {
          httpCode: 201,
          success: 1,
          message: 'Successful user creation',
          token: '',
          data: newUser,
        };

        return response;
      }
    } catch (error) {
      let response = new AnswersService();
      response = {
        httpCode: error.response.statusCode,
        success: 0,
        message: error.response.message,
        token: '',
        data: [],
      };
      return response;
    }
  }

  async UserExists(username: string) {
    const exists = await this.userRepository.findOne({
      where: { username: username },
    });
    if (exists) {
      return true;
    }
    return false;
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: username },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<AnswersService> {
    try {
      let response = new AnswersService();
      const users = await this.userRepository.find();

      if (!users) throw new NotFoundException('Not exists any user');

      if (this.userRepository.save(users)) {
        response = {
          httpCode: 200,
          success: 1,
          message: 'Successful user creation',
          token: '',
          data: users,
        };
      }
      return response;
    } catch (error) {
      let response = new AnswersService();
      response = {
        httpCode: error.response.statusCode,
        success: 0,
        message: error.response.message,
        token: '',
        data: [],
      };
      return response;
    }
  }

  async findOne(id: number): Promise<AnswersService> {
    try {
      let response = new AnswersService();
      const user = await this.userRepository.findOneBy({ id: id });
      console.log(user);
      if (!user) throw new NotFoundException('There is no user with that id');

      response = {
        httpCode: 200,
        success: 1,
        message: 'Done.',
        token: '',
        data: user,
      };

      return response;
    } catch (error) {
      let response = new AnswersService();
      response = {
        httpCode: error.response.statusCode,
        success: 0,
        message: error.response.message,
        token: '',
        data: [],
      };
      return response;
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<AnswersService> {
    try {
      let response = new AnswersService();
      const userForUpdate = this.findOne(id);
      if (!userForUpdate)
        new NotFoundException('There is no user with that id');

      console.log(updateUserDto);
      this.userRepository.update(id, { username: updateUserDto.username });
      this.userRepository.update(id, { email: updateUserDto.email });
      this.userRepository.update(id, { fullname: updateUserDto.fullname });

      response = {
        httpCode: 200,
        success: 1,
        message: 'Successful user Update',
        token: '',
        data: [],
      };
      return response;
    } catch (error) {
      let response = new AnswersService();
      response = {
        httpCode: error.response.statusCode,
        success: 0,
        message: error.response.message,
        token: '',
        data: [],
      };
      return response;
    }
  }

  async changePassword(id: number, obj: PasswordDTO): Promise<AnswersService> {
    try {
      let response = new AnswersService();
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) new NotFoundException('There is no user with that id');

      if (await Compare(obj.password, user.password))
        throw new BadRequestException(
          'This password cannot be the same, try again with other password',
        );

      await this.userRepository.update(id, {
        password: await Encrypt(obj.password),
      });

      response = {
        httpCode: 200,
        success: 1,
        message: 'Successful user creation',
        token: '',
        data: user,
      };

      return response;
    } catch (error) {
      let response = new AnswersService();
      response = {
        httpCode: error.response.statusCode,
        success: 0,
        message: error.response.message,
        token: '',
        data: [],
      };
      return response;
    }
  }
}

// remove(id: number) {
//   return `This action removes a #${id} user`;
// }
