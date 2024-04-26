import { Staff } from "@/generated/graphql";
import { apolloClient } from "./request";
import { gql } from "@apollo/client";
import { message } from "antd";

export const tokenKey = "token";
export const meKey = "me";

export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
  const token = localStorage.getItem(tokenKey);
  return token || "";
};

export const deleteToken = () => {
  localStorage.removeItem(tokenKey);
};

export const loadMe = async () => {
  const token = getToken();
  if (!token) {
    return undefined;
  }
  const res = await apolloClient.query({
    query: gql(/* GraphQL */ `
      query {
        me {
          id
          name
          userId
          userBindedAt
          staffRoles {
            id
            role {
              name
              rolePermissions {
                permission
                roleId
              }
            }
          }
        }
      }
    `),
    errorPolicy: "all",
    fetchPolicy: "no-cache"
  });
  if (res.errors) {
    message.error(res.errors[0].message);
    return;
  }
  localStorage.setItem(meKey, JSON.stringify(res.data.me));
  return res.data.me as Staff;
};
export const getMe = () => {
  const me = localStorage.getItem(meKey);
  return me ? (JSON.parse(me) as Staff) : undefined;
};

export const deleteMe = () => {
  localStorage.removeItem(meKey);
};

export const can = (permission: string, staffId?: string) => {
  const me = getMe();
  const permissions: string[] = [];
  me?.staffRoles?.map(staffRole =>
    staffRole?.role?.rolePermissions?.map(rolePermission => {
      if (!rolePermission?.permission) return;
      permissions.push(rolePermission.permission);
    })
  );
  if (permissions.includes("*") || permissions.includes(permission) || me?.id === staffId) {
    return true;
  } else {
    return false;
  }
};
