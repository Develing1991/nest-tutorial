import { BoardStatus } from './../board.model';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { BadRequestException } from '@nestjs/common';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not valid`);
    }

    return value;
  }
  private isStatusValid(status: any) {
    // const index = this.StatusOption.includes(status);
    // return index !== -1;
    return this.StatusOption.includes(status);
  }
}
