# monorepo-plugin

This library was generated with [Nx](https://nx.dev).

## Generators

### Create a plugin

```shell
npx nx generate monorepo-plugin:plugin
```

By default, this creates a plugin with one initial `sample-block`.

You can optionally scaffold up to three initial blocks in the same command using `block1`, `block2`, and `block3` options.

#### Sample Instructions

Create a plugin with the default `sample-block`:

```shell
npx nx generate monorepo-plugin:plugin --name="My Plugin" --description="My plugin description"
```

Create a plugin with one explicit block:

```shell
npx nx generate monorepo-plugin:plugin --name="My Plugin" --block1Name=hero-banner --block1Title="Hero Banner" --block1Description="Hero block"
```

Create a plugin with three explicit blocks:

```shell
npx nx generate monorepo-plugin:plugin --name="Composed Plugin" --description="Plugin description" --block1Name=hero-banner --block1Title="Hero Banner" --block2Name=call-to-action --block3Name=stats-grid
```

Add additional blocks later to an existing plugin:

```shell
npx nx generate monorepo-plugin:block composed-plugin testimonial-card
```

Block names must be unique after slug normalization, so values like `Hero Banner` and `hero-banner` cannot be used together.

#### wp-env Ports In Generated Plugins

Generated plugins use the default `wp-env` ports (development `8888`, tests `8889`) and do not set explicit `port`/`testsPort` values in `.wp-env.json`.

To avoid collisions when running tests across multiple projects, generated Nx targets pass per-plugin `WP_ENV_PORT`/`WP_ENV_TESTS_PORT` values at runtime. Playwright-based targets also set `WP_BASE_URL` to the matching tests URL.

#### Build For Gutenberg Registration

After generating a plugin or adding new blocks, build plugin assets before checking the block inserter in Gutenberg:

```shell
npx nx run <plugin-slug>:build
```

For active development, run the watch task in a separate terminal:

```shell
npx nx run <plugin-slug>:start
```

The generated plugin registers blocks from `plugins/<plugin-slug>/build`, so Gutenberg will not list new blocks until that folder is produced.

### Create a block in an existing plugin

```shell
npx nx generate monorepo-plugin:block <plugin-slug> <block-name>
```

Example:

```shell
npx nx generate monorepo-plugin:block add-new-block hero-banner
```

## Building

Run `nx build monorepo-plugin` to build the library.
