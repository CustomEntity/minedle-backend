import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly zodSchema: z.Schema<any>) {}

  transform(value: any) {
    const result = this.zodSchema.safeParse(value);
    if (!result.success) {
      console.log(result.error);
      throw new BadRequestException(result.error);
    }

    return result.data;
  }
}
