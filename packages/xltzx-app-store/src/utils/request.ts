import { GraphQLFormattedError } from "graphql";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "";

export const graphqlRequest = async <T>(
  {
    document,
    variables
  }: {
    document: string;
    variables?: Record<string, any>;
  },
  headers?: HeadersInit
): Promise<{ data?: T; errors?: GraphQLFormattedError[] }> => {
  // const req = parse(document);
  return fetch(`${baseUrl}/store`, {
    method: "POST",
    cache: "no-store",
    // next: { revalidate: 60 },
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ query: document, variables })
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(async e => {
      if (e.errors) {
        return e;
      } else {
        return {
          errors: [
            {
              message: JSON.stringify(e),
              extensions: {
                code: "INTERNAL"
              }
            }
          ]
        };
      }
    });
};

export const upload = async <T>(formData: FormData, headers: HeadersInit) => {
  return fetch(`${baseUrl}/file`, {
    body: formData,
    method: "POST",
    headers: { ...headers }
  })
    .then(async res => {
      return res.json() as Promise<T>;
    })
    .catch(e => {
      return { code: 500, message: e.message } as T;
    });
};
