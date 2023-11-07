import { Module } from '@nestjs/common';
import { DATE_PROVIDER } from './date/date-provider.interface';
import { CurrentDateProvider } from './date/current-date-provider';

@Module({
  controllers: [],
  providers: [
    {
      provide: DATE_PROVIDER,
      useFactory: (currentDateProvider: CurrentDateProvider) => {
        return currentDateProvider;
      },
      inject: [CurrentDateProvider],
    },
    {
      provide: CurrentDateProvider,
      useFactory: () => {
        return new CurrentDateProvider();
      },
    },
  ],
  exports: [DATE_PROVIDER],
})
export class SystemModule {}
