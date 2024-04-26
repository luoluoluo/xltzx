import { Input, Table, message } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { User, UserPagination, UserQuery } from "@/generated/graphql";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [searchParams] = useSearchParams();
  const [userQuery, setUserQuery] = useState<UserQuery>({
    offset: 0,
    limit: 5,
    id: searchParams.get("id") || undefined,
    staffId: searchParams.get("staffId") || undefined
  });
  const [userPagination, setUserPagination] = useState<UserPagination>();
  const loadUserData = async () => {
    console.log("loadUserData");
    const userRes = await apolloClient.query<{ distributionUsers: UserPagination }>({
      query: gql(/* GraphQL */ `
        query DistributionUsers($query: UserQuery!) {
          distributionUsers(query: $query) {
            edges {
              id
              staffId
              staff {
                id
                name
              }
              name
              phone
              area
              address
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: userQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (userRes.errors) {
      message.error(userRes.errors[0].message);
      return;
    }
    setUserPagination(userRes.data.distributionUsers);
  };
  useEffect(() => {
    loadUserData();
  }, [userQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "分销员工",
      dataIndex: "staffId",
      key: "staffId",
      align: "left",
      render: (_: any, item: User) => (
        <div>
          <div className=" whitespace-nowrap">ID: {item.staffId}</div>
          <div>姓名: {item.staff?.name}</div>
        </div>
      )
    },
    {
      title: "姓名",
      dataIndex: "name",
      className: "ant-table-cell-ellipsis",
      key: "name",
      align: "center"
    },
    {
      title: "手机号",
      dataIndex: "phone",
      className: "ant-table-cell-ellipsis",
      key: "phone",
      align: "center"
    },
    {
      title: "地区",
      dataIndex: "area",
      className: "ant-table-cell-ellipsis",
      key: "area",
      align: "center"
    },
    {
      title: "地址",
      dataIndex: "address",
      className: "ant-table-cell-ellipsis",
      key: "address",
      align: "center"
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: User) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    }
  ];
  return (
    <div className="card content-box">
      <div className="flex gap-2 flex-wrap mt-4">
        <Input
          className="w-40"
          allowClear
          placeholder="用户ID"
          defaultValue={userQuery.id || ""}
          onChange={e => {
            setUserQuery({ ...userQuery, id: e.currentTarget.value });
          }}
        />
        <Input
          className="w-40"
          allowClear
          placeholder="员工ID"
          defaultValue={userQuery.staffId || ""}
          onChange={e => {
            setUserQuery({ ...userQuery, staffId: e.currentTarget.value });
          }}
        />
      </div>
      <Table
        scroll={{ x: true }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: userQuery.offset! / userQuery.limit! + 1,
          pageSize: userQuery.limit!,
          total: userPagination?.totalCount,
          onChange: page => {
            setUserQuery({ ...userQuery, offset: (page - 1) * userQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={userPagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
