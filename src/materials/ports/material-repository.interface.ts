import { Nullable } from '../../shared/nullable';
import { Material } from '../entities/material';

export const MATERIAL_REPOSITORY = Symbol('MATERIAL_REPOSITORY');

export interface MaterialRepository {
  findById(id: number): Promise<Nullable<Material>>;
}
