import { IsString, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsString()  threadId: string;
  @IsString() @MinLength(1) content: string;
}
