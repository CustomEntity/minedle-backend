import { Global, Module } from '@nestjs/common';
import { KnexService } from './knex.service';

export const I_KNEX_CONNECTION = Symbol('I_KNEX_CONNECTION');

@Global()
@Module({
  providers: [KnexService],
  exports: [KnexService],
})
export class KnexModule {}
