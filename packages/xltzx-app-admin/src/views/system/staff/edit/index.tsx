import { useEffect, useState } from "react";
import Form from "../_components/form";
import { Staff } from "@/generated/graphql";
import { apolloClient } from "@/utils/request";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
const Index = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [staff, setStaff] = useState<Staff>();
  const loadStaffData = async () => {
    const staffRes = await apolloClient.query<{ staff: Staff }>({
      query: gql(/* GraphQL */ `
        query Staff($query: StaffQuery!) {
          staff(query: $query) {
            code
            id
            name
            password
            staffRoles {
              id
              role {
                name
                id
              }
            }
            createdAt
          }
        }
      `),
      variables: { query: { id } },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (staffRes.errors) {
      message.error(staffRes.errors[0].message);
      return;
    }
    setStaff(staffRes.data.staff);
  };
  useEffect(() => {
    loadStaffData();
  }, []);
  if (!staff) return <></>;
  return (
    <div className="p-4 bg-white">
      <Form staff={staff}></Form>
    </div>
  );
};

export default Index;
