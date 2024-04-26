import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/utils/request";
import { File, FilePagination, FileQuery } from "@/generated/graphql";
import dayjs from "dayjs";
import { getFileUrl } from "@/utils";
import { can } from "@/utils/auth";

const Index = () => {
  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  const [fileQuery, setFileQuery] = useState<FileQuery>({
    offset: 0,
    limit: 5
  });
  const [filePagination, setFilePagination] = useState<FilePagination>();
  const loadFileData = async () => {
    console.log("loadFileData");
    const fileRes = await apolloClient.query<{ files: FilePagination }>({
      query: gql(/* GraphQL */ `
        query Files($query: FileQuery!) {
          files(query: $query) {
            edges {
              id
              name
              createdAt
            }
            totalCount
          }
        }
      `),
      variables: { query: fileQuery },
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    });
    if (fileRes.errors) {
      message.error(fileRes.errors[0].message);
      return;
    }
    setFilePagination(fileRes.data.files);
  };
  useEffect(() => {
    loadFileData();
  }, [fileQuery]);

  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "left"
    },
    {
      title: "文件名",
      dataIndex: "name",
      className: "ant-table-cell-ellipsis",
      key: "name",
      align: "center",
      render: (_: any, item: File) => (
        <>
          <img className="h-10 w-auto" src={getFileUrl(item?.id || "")} />
          <div>{item.name}</div>
        </>
      )
    },
    {
      title: "文件链接",
      dataIndex: "url",
      className: "ant-table-cell-ellipsis",
      key: "url",
      align: "center",
      render: (_: any, item: File) => getFileUrl(item?.id || "")
    },
    // {
    //   title: "引用",
    //   dataIndex: "name",
    //   className: "ant-table-cell-ellipsis",
    //   key: "name",
    //   align: "left",
    //   render: (_: any, item: File) => {
    //     const skuIds = Array.from(new Set([...(item.skus?.map(v => v.id) || []), ...(item.skuFiles?.map(v => v.skuId) || [])]));
    //     return (
    //       <div>
    //         <div>sku:</div>
    //         <div className="ml-4">
    //           {skuIds.map((v, k) => (
    //             <div key={v}>{`${k}. ${v}`}</div>
    //           ))}
    //         </div>
    //         <div>产品:</div>
    //         <div className="ml-4">{item.spus?.map((v, k) => <div key={k}>{`${k}. ${v.id}`}</div>)}</div>
    //         <div>订单:</div>
    //         <div className="ml-4">{item.orderSkus?.map((v, k) => <div key={k}>{`${k}. ${v.orderId}`}</div>)}</div>
    //         <div>banner:</div>
    //         <div className="ml-4">{item.banners?.map((v, k) => <div key={k}>{`${k}. ${v.id}`}</div>)}</div>
    //       </div>
    //     );
    //   }
    // },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      className: "ant-table-cell-ellipsis",
      key: "createdAt",
      align: "center",
      render: (_: any, item: File) => <>{dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, item: File) => (
        <Space size="small" direction="vertical">
          {can("mutation.deleteFile") ? (
            <Popconfirm
              title="删除"
              description="确认删除"
              onConfirm={async () => {
                // if (
                //   item.skus?.length ||
                //   item?.skuFiles?.length ||
                //   item.spus?.length ||
                //   item.orderSkus?.length ||
                //   item.banners?.length
                // ) {
                //   message.error("有引用，无法删除！");
                //   return;
                // }
                const res = await apolloClient.mutate({
                  mutation: gql(/* GraphQL */ `
                    mutation DeleteFile($query: FileQuery!) {
                      deleteFile(query: $query) {
                        id
                      }
                    }
                  `),
                  variables: {
                    query: {
                      id: item.id
                    }
                  },
                  errorPolicy: "all"
                });
                if (res.errors) {
                  message.error(res.errors[0].message);
                  return;
                }
                loadFileData();
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
      <Table
        scroll={{ x: true }}
        className="mt-4"
        bordered={true}
        pagination={{
          current: fileQuery.offset! / fileQuery.limit! + 1,
          pageSize: fileQuery.limit!,
          total: filePagination?.totalCount,
          onChange: file => {
            setFileQuery({ ...fileQuery, offset: (file - 1) * fileQuery.limit! });
          }
        }}
        rowKey="id"
        dataSource={filePagination?.edges || []}
        columns={columns}
      />
    </div>
  );
};

export default Index;
