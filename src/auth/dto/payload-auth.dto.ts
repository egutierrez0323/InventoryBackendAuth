import { IsNotEmpty, IsNumber } from 'class-validator';
export class PayloadDTO {
  constructor() {
    this.role = '';
  }

  @IsNumber()
  public id: number;

  @IsNotEmpty()
  public username: string;

  public role: string;
}
