import {
    formatFiles,
    generateFiles,
    readProjectConfiguration,
    Tree,
} from '@nx/devkit';
import * as path from 'path';
import { slugify, toTitle } from '../helpers';
import { BlockGeneratorSchema } from './schema';

/**
 * Generates a WordPress block in an existing plugin project.
 * @param {Tree}                 tree    Filesystem tree.
 * @param {BlockGeneratorSchema} options Options from schema.json.
 */
export const blockGenerator = async (
    tree: Tree,
    options: BlockGeneratorSchema
) => {
    const blockSlug = slugify( options.name );
    if ( ! blockSlug ) {
        throw new Error(
            'Block name must contain at least one alphanumeric character.'
        );
    }

    const pluginConfig = readProjectConfiguration( tree, options.plugin );
    if ( ! pluginConfig.root?.startsWith( 'plugins/' ) ) {
        throw new Error(
            `Project "${ options.plugin }" is not a plugin project under plugins/.`
        );
    }

    const pluginSlug = pluginConfig.root.replace( /^plugins\//, '' );
    const blockRoot = `${ pluginConfig.root }/src/${ blockSlug }`;
    const blockJsonPath = `${ blockRoot }/block.json`;

    if ( tree.exists( blockJsonPath ) ) {
        throw new Error(
            `Block "${ blockSlug }" already exists in plugin "${ pluginSlug }".`
        );
    }

    generateFiles( tree, path.join( __dirname, 'files' ), pluginConfig.root, {
        pluginSlug,
        blockSlug,
        blockTitle: options.title ?? toTitle( blockSlug ),
        blockDescription: options.description ?? '',
    } );

    if ( ! options.skipFormat ) {
        await formatFiles( tree );
    }
};

export default blockGenerator;
