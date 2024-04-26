import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/store",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  // documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/generated/": {
      preset: "client",
      // plugins: ["typescript", "typescript-operations"],
      presetConfig: {
        gqlTagName: "gql"
      }
    }
  },
  ignoreNoDocuments: true
};

export default config;
