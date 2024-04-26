import fs from "fs";
import { GraphQLError } from "graphql";
import path from "path";

export const loadTypeDefs = async (typeDefsDir: string) => {
  // const typeDefsDir = `${__dirname}/typeDefs`;
  const typeDefPromises: Promise<any>[] = [];
  fs.readdirSync(typeDefsDir, { withFileTypes: true }).forEach(dirent => {
    typeDefPromises.push(import(path.join(typeDefsDir, dirent.name)));
  });
  const typeDefs = await Promise.all(typeDefPromises);
  return typeDefs.reduce((sum, current) => {
    sum += current.default;
    return sum;
  }, "");
};

export const loadDocuments = async (typeDefsDir: string) => {
  // const typeDefsDir = `${__dirname}/typeDefs`;
  const typeDefPromises: Promise<any>[] = [];
  fs.readdirSync(typeDefsDir, { withFileTypes: true }).forEach(dirent => {
    typeDefPromises.push(import(path.join(typeDefsDir, dirent.name)));
  });
  const typeDefs = await Promise.all(typeDefPromises);
  return typeDefs.reduce((sum, current) => {
    sum += current.default;
    return sum;
  }, "");
};

export const loadResolvers = async (resolverDir: string) => {
  // const resolverDir = `${__dirname}/resolvers`;
  const resolverPromises: Promise<any>[] = [];
  fs.readdirSync(resolverDir, { withFileTypes: true }).forEach(dirent => {
    resolverPromises.push(import(path.join(resolverDir, dirent.name)));
  });
  const resolvers = await Promise.all(resolverPromises);
  let querys = {};
  let mutations = {};
  resolvers.map(v => {
    querys = { ...querys, ...v.default.Query };
    mutations = { ...mutations, ...v.default.Mutation };
  });
  return {
    Query: querys,
    Mutation: mutations
  };
};

export const graphQLError = (options: { message: string; code?: string; data?: Record<string, any> }) => {
  return new GraphQLError(options.message, {
    extensions: {
      code: options.code,
      data: options.data,
      http: {
        status: 200
      }
    }
  });
};
