import { useEffect, useState } from "react";
import Form from "../_components/form";
import { Role } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
const Index = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [role, setRole] = useState<Role>();
  const loadRoleData = async () => {
    const roleRes = await apolloClient.query<{ role: Role }>({
      query: gql(/* GraphQL */ `
        query Role($query: RoleQuery!) {
          role(query: $query) {
            id
            name
            rolePermissions {
              id
              permission
            }
            createdAt
          }
        }
      `),
      variables: { query: { id } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (roleRes.errors) {
      message.error(roleRes.errors[0].message);
      return;
    }
    setRole(roleRes.data.role);
  };
  useEffect(() => {
    loadRoleData();
  }, []);
  if (!role) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form role={role}></Form>
    </div>
  );
};

export default Index;
