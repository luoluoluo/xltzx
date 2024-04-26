import { can } from "@/utils/auth";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { Banner, BannerPagination, BannerQuery } from "@/generated/graphql";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [bannerQuery, setBannerQuery] = useState<BannerQuery>({
    offset: 0,
    limit: 5
  });
  const [bannerPagination, setBannerPagination] = useState<BannerPagination>();
  const loadBannerData = async () => {
    console.log("loadBannerData");
    const bannerRes = await apolloClient.query<{ banners: BannerPagination }>({
      query: gql(/* GraphQL */ `
        query Banners($query: BannerQuery!) {
          banners(query: $query) {
            edges {
              id
              title
              link
              fileId
              sort
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: bannerQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (bannerRes.errors) {
      message.error(bannerRes.errors[0].message);
      return;
    }
    setBannerPagination(bannerRes.data.banners);
  };
  useEffect(() => {
    loadBannerData();
  }, [bannerQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "标题",
      dataIndex: "title",
      className: "ant-table-cell-ellipsis",
      key: "title",
      align: "center"
    },
    {
      title: "链接",
      dataIndex: "link",
      className: "ant-table-cell-ellipsis",
      key: "link",
      align: "center"
    },
    {
      title: "排序",
      dataIndex: "sort",
      className: "ant-table-cell-ellipsis",
      key: "sort",
      align: "center"
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: Banner) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, banner: Banner) => (
        <Space size="small" direction="vertical">
          {can("mutation.updateBanner") ? (
            <Button
              size="small"
              onClick={() => {
                navigate(`/content/banner/edit?id=${banner.id}`);
              }}
            >
              编辑
            </Button>
          ) : null}
          {can("mutation.deleteBanner") ? (
            <Popconfirm
              title="删除"
              description="确认删除"
              onConfirm={async () => {
                const deleteBannerRes = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation DeleteBanner($query: BannerQuery!) {
                      deleteBanner(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: banner.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (deleteBannerRes.errors) {
                  message.error(deleteBannerRes.errors[0].message);
                  return;
                }
                loadBannerData();
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
        {can("mutation.createBanner") ? (
          <Button
            icon={<FileAddOutlined />}
            type="primary"
            onClick={() => {
              navigate(`/content/banner/add`);
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
          current: bannerQuery.offset! / bannerQuery.limit! + 1,
          pageSize: bannerQuery.limit!,
          total: bannerPagination?.totalCount,
          onChange: page => {
            setBannerQuery({ ...bannerQuery, offset: (page - 1) * bannerQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={bannerPagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
