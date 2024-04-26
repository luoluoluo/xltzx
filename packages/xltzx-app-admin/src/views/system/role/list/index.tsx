import { can } from "@/utils/auth";
import { Table, Button, Space, message, Tag, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Permission, PermissionPagination, Role, RolePagination, RoleQuery } from "@/generated/graphql";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Index = () => {
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const navigate = useNavigate();
  const [roleQuery, setRoleQuery] = useState<RoleQuery>({
    offset: 0,
    limit: 5
  });
  const [rolePagination, setRolePagination] = useState<RolePagination>();
  const loadRoleData = async () => {
    console.log("loadRoleData");
    const userRes = await apolloClient.query<{ roles: RolePagination }>({
      query: gql(/* GraphQL */ `
        query Roles($query: RoleQuery!) {
          roles(query: $query) {
            edges {
              id
              name
              rolePermissions {
                id
                permission
              }
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: roleQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (userRes.errors) {
      message.error(userRes.errors[0].message);
      return;
    }
    setRolePagination(userRes.data.roles);
  };

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const loadPermissions = async () => {
    const res = await apolloClient.query<{ permissions: PermissionPagination }>({
      query: gql(/* GraphQL */ `
        query Permissions {
          permissions {
            edges {
              name
              value
            }
            totalCount
          }
        }
      `),
      errorPolicy: "all"
    });
    if (res.errors) {
      message.error(res.errors[0].message);
      return;
    }
    if (res.data.permissions.edges) {
      setPermissions(res.data.permissions.edges);
      // setPermissionOptions(roleRes.data.permissions.edges.map(v => ({ label: v.name!, value: v.value! })));
    }
  };

  useEffect(() => {
    loadRoleData();
    loadPermissions();
  }, [roleQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "权限",
      dataIndex: "permissions",
      key: "permissions",
      align: "center",
      render: (_: any, role: Role) => (
        <>
          {(role.rolePermissions || []).map(rolePermission => {
            return (
              <Tag key={rolePermission?.permission}>{permissions.find(v => v.value === rolePermission?.permission)?.name}</Tag>
            );
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
      render: (_: any, item: Role) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, role: Role) => (
        <Space size="small" direction="vertical">
          {can("mutation.updateRole") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/system/role/edit?id=${role.id}`);
              }}
            >
              编辑
            </Button>
          ) : null}
          {can("mutation.deleteRole") ? (
            <Popconfirm
              title="删除角色"
              description="确认删除"
              onConfirm={async () => {
                const deleteRes = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation DeleteRole($query: RoleQuery!) {
                      deleteRole(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: role.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (deleteRes.errors) {
                  message.error(deleteRes.errors[0].message);
                  return;
                }
                loadRoleData();
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
        {can("mutation.createRole") ? (
          <Button
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(`/system/role/add`);
            }}
          >
            新建
          </Button>
        ) : null}
      </div>
      <Table
        scroll={{ x: true }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: roleQuery.offset! / roleQuery.limit! + 1,
          pageSize: roleQuery.limit!,
          total: rolePagination?.totalCount,
          onChange: page => {
            setRoleQuery({ ...roleQuery, offset: (page - 1) * roleQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={rolePagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
