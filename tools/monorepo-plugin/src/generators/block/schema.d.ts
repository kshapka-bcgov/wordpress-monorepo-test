export interface BlockGeneratorSchema {
    plugin: string;
    name: string;
    title?: string;
    description?: string;
    skipFormat?: boolean;
}