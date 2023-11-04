import {Module} from "@nestjs/common";
import {KnexModule} from "../core/adapters/knex/knex.module";
import {MATERIAL_REPOSITORY} from "./ports/material-repository.interface";
import {KnexService} from "../core/adapters/knex/knex.service";
import {KnexMaterialRepository} from "./adapters/knex-material-repository";

@Module({
    imports: [KnexModule],
    providers: [
        {
            provide: MATERIAL_REPOSITORY,
            useFactory: (knexService: KnexService) => {
                return new KnexMaterialRepository(knexService.connection);
            },
            inject: [KnexService],
        }
    ],
    exports: [
        MATERIAL_REPOSITORY,
    ]
})
export class MaterialsModule {
}