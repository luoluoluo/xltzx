import { can } from "@/utils/auth";
import { Table, Button, Space, message, Tag, Popconfirm, Input } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Staff, StaffPagination, StaffQuery } from "@/generated/graphql";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [staffQuery, setStaffQuery] = useState<StaffQuery>({
    offset: 0,
    limit: 5
  });
  const [staffPagination, setStaffPagination] = useState<StaffPagination>();
  const loadStaffData = async () => {
    console.log("loadStaffData");
    const staffRes = await apolloClient.query<{ staffs: StaffPagination }>({
      query: gql(/* GraphQL */ `
        query Staffs($query: StaffQuery!) {
          staffs(query: $query) {
            edges {
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
            totalCount
          }
        }
      `),
      variables: { query: staffQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (staffRes.errors) {
      message.error(staffRes.errors[0].message);
      return;
    }
    setStaffPagination(staffRes.data.staffs);
  };
  useEffect(() => {
    loadStaffData();
  }, [staffQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "账号",
      dataIndex: "code",
      key: "code",
      align: "center"
    },
    {
      title: "角色",
      dataIndex: "roles",
      key: "roles",
      align: "center",
      render: (_: any, { staffRoles }: Staff) => (
        <>
          {(staffRoles || []).map(staffRole => {
            return <Tag key={staffRole?.role?.id}>{staffRole?.role?.name}</Tag>;
          })}
        </>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: Staff) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, staff: Staff) => (
        <Space size="small" direction="vertical">
          {can("mutation.updateStaff") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/system/staff/edit?id=${staff.id}`);
              }}
            >
              编辑
            </Button>
          ) : null}
          {can("mutation.deleteStaff") ? (
            <Popconfirm
              title="删除用户"
              description="确认删除"
              onConfirm={async () => {
                const deleteStaffRes = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation DeleteStaff($query: StaffQuery!) {
                      deleteStaff(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: staff.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (deleteStaffRes.errors) {
                  message.error(deleteStaffRes.errors[0].message);
                  return;
                }
                loadStaffData();
              }}
            >
              <Button danger size="small">
                删除
              </Button>
            </Popconfirm>
          ) : null}
        </Space>
      )
    }
  ];
  return (
    <div className="card content-box">
      <div className="flex justify-end">
        {can("mutation.createStaff") ? (
          <Button
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(`/system/staff/add`);
            }}
          >
            新建
          </Button>
        ) : null}
      </div>
      <div className="flex gap-2 flex-wrap mt-4">
        <Input
          className="w-40"
          allowClear
          placeholder="员工ID"
          defaultValue={staffQuery.id || ""}
          onChange={e => {
            setStaffQuery({ ...staffQuery, id: e.currentTarget.value });
          }}
        />
        <Input
          className="w-40"
          allowClear
          placeholder="姓名"
          defaultValue={staffQuery.name || ""}
          onChange={e => {
            setStaffQuery({ ...staffQuery, name: e.currentTarget.value });
          }}
        />
      </div>
      <Table
        scroll={{ x: true }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: staffQuery.offset! / staffQuery.limit! + 1,
          pageSize: staffQuery.limit!,
          total: staffPagination?.totalCount,
          onChange: page => {
            setStaffQuery({ ...staffQuery, offset: (page - 1) * staffQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={staffPagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
