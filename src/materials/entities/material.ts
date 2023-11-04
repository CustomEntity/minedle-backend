import {Entity} from "../../shared/entity";

export type MaterialData = {
    id: number;
    name: string;
    displayName: string;
    maxStackSize: number;
    textureUrl?: string;
}

export class Material extends Entity<MaterialData> {
    get id(): number {
        return this.data.id;
    }

    get name(): string {
        return this.data.name;
    }

    get displayName(): string {
        return this.data.displayName;
    }

    get maxStackSize(): number {
        return this.data.maxStackSize;
    }

    get textureUrl(): string | undefined {
        return this.data.textureUrl;
    }
}