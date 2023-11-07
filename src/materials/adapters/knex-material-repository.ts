import { Nullable } from '../../shared/nullable';
import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { Mapper } from '../../shared/mapper';
import { MaterialRepository } from '../ports/material-repository.interface';
import { Material } from '../entities/material';

export const MATERIAL_TABLE = 'materials';

@Injectable()
export class KnexMaterialRepository implements MaterialRepository {
  private readonly mapper: KnexMaterialMapper = new KnexMaterialMapper();

  constructor(private readonly connection: Knex) {}

  async findById(id: number): Promise<Nullable<Material>> {
    const data = await this.connection(MATERIAL_TABLE).where('id', id).first();
    return data ? this.mapper.toEntity(data) : null;
  }
}

export class KnexMaterialMapper extends Mapper<Material> {
  toEntity(data: any): Material {
    return new Material({
      id: data.id,
      name: data.name,
      displayName: data.display_name,
      maxStackSize: data.stack_size,
      textureUrl: data.texture_url,
    });
  }

  toPersistence(entity: Material): any {
    return {
      id: entity.id,
      name: entity.name,
      display_name: entity.displayName,
      stack_size: entity.maxStackSize,
      texture_url: entity.textureUrl,
    };
  }
}
