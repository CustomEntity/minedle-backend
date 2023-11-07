import { DateProvider } from './date-provider.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrentDateProvider implements DateProvider {
  public getDate(): Date {
    return new Date(Date.now());
  }
}
