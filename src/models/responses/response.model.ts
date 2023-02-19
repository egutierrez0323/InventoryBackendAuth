import { IsNotEmpty, IsNumber } from 'class-validator';
import { IResponsesService } from './IResponse.model';
/* AnswersService is a class that has a constructor that has a property called success that is set to 0 */
export class AnswersService implements IResponsesService {
  constructor() {
    this.success = 0;
    this.token = '';
  }

  public token: string;
  @IsNotEmpty()
  public httpCode: number;

  @IsNumber()
  public success: number;

  public message: string;
  public data: any;
}
