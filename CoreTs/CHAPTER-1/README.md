# What is TypeScript

TypeScript is an open-source programming language developed and maintained by Microsoft. It is a superset of JavaScript, which means that any valid JavaScript code is also valid TypeScript code. TypeScript extends JavaScript by adding static typing, which allows developers to define types for variables, function parameters, and return types.

## Key Features of TypeScript
- **Static Typing**: TypeScript enables developers to specify types for variables, parameters, and return values, providing better tooling support and catching errors during development.
- **Type Inference**: TypeScript's compiler can often infer the types of variables and expressions even if they are not explicitly specified, reducing the need for manual type annotations.
- **Interfaces**: TypeScript supports interfaces, which allow developers to define the shape of objects. This helps in defining contracts between different parts of the codebase.
- **Enums**: TypeScript provides support for enums, which allow developers to define a set of named constants. This makes code more readable and maintainable.
- **Generics**: TypeScript supports generics, allowing developers to write code that works with a variety of data types while maintaining type safety.
- **ES6+ Features**: TypeScript supports modern JavaScript features such as arrow functions, classes, modules, and async/await syntax.
- **Tooling Support**: TypeScript integrates well with popular development tools such as Visual Studio Code, providing features like code completion, refactoring, and inline documentation.

## Install Typescript
- You can install Typescript globally or you can add it to your project Folder

- Install NPM module For TypeScript (-g is for global installation)
    ```
    npm install typesript -g
    ```

## Write Your Hello World in Typesript

- Step 1: Create a TypeScript File main.ts
    ```ts
    let greeting = "Hello World";
    console.log(greet);
    ```
- Step 2: Compile TypeScript code
    ```ts
    tsc main.ts
    ```
    This will generate a JavaScript file named main.js in the same directory.

- Step 3: Run the JavaScript code
    ```js
    node main.js
    ```

## What do `tsc -init` do?

The `tsc --init` command is used to initialize a new `tsconfig.json` file in your TypeScript project. When you run `tsc --init` in your project directory, TypeScript creates a basic `tsconfig.json` file with default compiler options. This command is particularly useful if you want to quickly create a TypeScript configuration file without having to manually write it.

Here's what `tsc --init` does:

- **Creates `tsconfig.json`**: It generates a new `tsconfig.json` file in your current directory if one does not already exist.

- **Default Configuration**: The generated `tsconfig.json` file includes a set of default compiler options, which may vary based on the version of TypeScript you're using. These options typically include basic settings such as the target ECMAScript version, module system, output directory, and some default values for other compiler options.

- **Commented Out Options**: Some of the compiler options in the generated `tsconfig.json` file may be commented out initially. This allows you to easily enable or customize these options according to your project requirements.

- **No Changes to Existing File**: If a `tsconfig.json` file already exists in your project directory, running `tsc --init` won't overwrite it. Instead, it will leave the existing file untouched.

Overall, `tsc --init` is a convenient way to set up a basic TypeScript configuration file, saving you the trouble of manually creating one from scratch. After running this command, you can further customize the `tsconfig.json` file to tailor it to your specific project needs.

## What is tsconfig.json?

In TypeScript, `tsconfig.json` is a configuration file used to specify compiler options and project settings for TypeScript projects. It allows developers to define how TypeScript should compile their code, including settings such as target ECMAScript version, module system, output directory, and more.

Here are some key aspects of the `tsconfig.json` file:

- **Compiler Options**: This is the most important section of the `tsconfig.json` file. It allows you to specify various compiler options such as:

   - `target`: The ECMAScript version the TypeScript code should be compiled to.
   - `module`: The module system to use (e.g., CommonJS, ESNext, etc.).
   - `outDir`: The directory where compiled JavaScript files should be placed.
   - `strict`: Enables strict type-checking options.
   - `esModuleInterop`: Enables compatibility with modules that use `export =` syntax.
   - And many more options for controlling compilation behavior.

- **File Inclusion and Exclusion**: You can specify which files should be included or excluded from compilation using the `include` and `exclude` properties. For example if you do not specify `include` and `exclude` properties in that case it will compile all the .ts files to .js files.

- **Project References**: TypeScript supports project references, which allow you to split your codebase into smaller projects and reference them from a single root project. This can be configured using the `references` property.

- **Additional Configuration Files**: You can use the `extends` property to inherit settings from another `tsconfig.json` file.

Here's a minimal example of a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "./build",
    "strict": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

This configuration specifies that TypeScript should compile all TypeScript files (`*.ts`) in the `src` directory and its subdirectories, targeting ECMAScript 5, using the CommonJS module system, and placing compiled JavaScript files in the `dist` directory. It also enables strict type-checking. Additionally, it excludes the `node_modules` directory from compilation.

## How to Enable No Compiling when Error in typescript

- In `tsconfig.json` file you can specify 

    ```json
     "noEmitOnError": true
    ```

