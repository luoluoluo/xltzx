import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArticlePagination = {
  __typename?: 'ArticlePagination';
  edges?: Maybe<Array<Article>>;
  totalCount: Scalars['Int']['output'];
};

export type ArticleQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Attr = {
  __typename?: 'Attr';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  spu?: Maybe<Spu>;
  spuId?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type AttrInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  spuId?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AttrPagination = {
  __typename?: 'AttrPagination';
  edges?: Maybe<Array<Attr>>;
  totalCount: Scalars['Int']['output'];
};

export type Banner = {
  __typename?: 'Banner';
  createdAt?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BannerInput = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BannerPagination = {
  __typename?: 'BannerPagination';
  edges?: Maybe<Array<Banner>>;
  totalCount: Scalars['Int']['output'];
};

export type BannerQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Commission = {
  __typename?: 'Commission';
  amount?: Maybe<Scalars['Float']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']['output']>;
  staff?: Maybe<Staff>;
  staffId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<CommissionState>;
};

export type CommissionPagination = {
  __typename?: 'CommissionPagination';
  edges?: Maybe<Array<Commission>>;
  totalCount: Scalars['Int']['output'];
};

export type CommissionQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  staffId?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<CommissionState>;
};

export enum CommissionState {
  Completed = 'completed',
  Created = 'created'
}

export type File = {
  __typename?: 'File';
  banners?: Maybe<Array<Banner>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Order>>;
  size?: Maybe<Scalars['Int']['output']>;
  skuFiles?: Maybe<Array<SkuFile>>;
  skus?: Maybe<Array<Sku>>;
  spus?: Maybe<Array<Spu>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type FileInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FilePagination = {
  __typename?: 'FilePagination';
  edges?: Maybe<Array<File>>;
  totalCount: Scalars['Int']['output'];
};

export type FileQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  me?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 内容管理-新建文章 */
  createArticle?: Maybe<Article>;
  /** 内容管理-新建banner */
  createBanner?: Maybe<Banner>;
  /** 系统管理-创建角色 */
  createRole?: Maybe<Role>;
  /** 产品管理-新建sku */
  createSku?: Maybe<Sku>;
  /** 产品管理-新建产品 */
  createSpu?: Maybe<Spu>;
  /** 系统管理-创建管理员 */
  createStaff?: Maybe<Staff>;
  /** 内容管理-删除文章 */
  deleteArticle?: Maybe<Article>;
  /** 内容管理-删除banner */
  deleteBanner?: Maybe<Banner>;
  /** 内容管理-删除文件 */
  deleteFile?: Maybe<File>;
  /** 系统管理-删除角色 */
  deleteRole?: Maybe<Role>;
  /** 产品管理-删除sku */
  deleteSku?: Maybe<Sku>;
  /** 产品管理-删除产品 */
  deleteSpu?: Maybe<Spu>;
  /** 系统管理-删除管理员 */
  deleteStaff?: Maybe<Staff>;
  /** 登录 */
  login?: Maybe<Token>;
  /** 系统管理 - 修改系统设置 */
  mutationSetting?: Maybe<Setting>;
  /** 内容管理-发布文章 */
  publishArticle?: Maybe<Article>;
  /** 产品管理-上架产品 */
  publishSpu?: Maybe<Spu>;
  /** 订单管理-退款 */
  refundOrder?: Maybe<Order>;
  /** 产品管理-设置默认sku */
  setDefaultSku?: Maybe<Spu>;
  /** 订单管理-发货 */
  shipOrder?: Maybe<Order>;
  /** 内容管理-取消发布文章 */
  unpublishArticle?: Maybe<Article>;
  /** 产品管理-下架产品 */
  unpublishSpu?: Maybe<Spu>;
  /** 内容管理-编辑文章 */
  updateArticle?: Maybe<Article>;
  /** 内容管理-编辑banner */
  updateBanner?: Maybe<Banner>;
  /** 修改我的密码 */
  updateMePassword?: Maybe<Staff>;
  /** 系统管理-编辑角色 */
  updateRole?: Maybe<Role>;
  /** 产品管理-编辑sku */
  updateSku?: Maybe<Sku>;
  /** 产品管理-编辑产品 */
  updateSpu?: Maybe<Spu>;
  /** 系统管理-编辑管理员 */
  updateStaff?: Maybe<Staff>;
};


export type MutationCreateArticleArgs = {
  input: ArticleInput;
};


export type MutationCreateBannerArgs = {
  input: BannerInput;
};


export type MutationCreateRoleArgs = {
  input: RoleInput;
};


export type MutationCreateSkuArgs = {
  input: SkuInput;
};


export type MutationCreateSpuArgs = {
  input: SpuInput;
};


export type MutationCreateStaffArgs = {
  input: StaffInput;
};


export type MutationDeleteArticleArgs = {
  query: ArticleQuery;
};


export type MutationDeleteBannerArgs = {
  query: BannerQuery;
};


export type MutationDeleteFileArgs = {
  query: FileQuery;
};


export type MutationDeleteRoleArgs = {
  query: RoleQuery;
};


export type MutationDeleteSkuArgs = {
  query: SkuQuery;
};


export type MutationDeleteSpuArgs = {
  query: SpuQuery;
};


export type MutationDeleteStaffArgs = {
  query: StaffQuery;
};


export type MutationLoginArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMutationSettingArgs = {
  input: SettingInput;
};


export type MutationPublishArticleArgs = {
  query: ArticleQuery;
};


export type MutationPublishSpuArgs = {
  query: SpuQuery;
};


export type MutationRefundOrderArgs = {
  input: RefundInput;
  query: OrderQuery;
};


export type MutationSetDefaultSkuArgs = {
  input: SpuInput;
  query: SpuQuery;
};


export type MutationShipOrderArgs = {
  input: OrderInput;
  query: OrderQuery;
};


export type MutationUnpublishArticleArgs = {
  query: ArticleQuery;
};


export type MutationUnpublishSpuArgs = {
  query: SpuQuery;
};


export type MutationUpdateArticleArgs = {
  input: ArticleInput;
  query: ArticleQuery;
};


export type MutationUpdateBannerArgs = {
  input: BannerInput;
  query: BannerQuery;
};


export type MutationUpdateMePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateRoleArgs = {
  input: RoleInput;
  query: RoleQuery;
};


export type MutationUpdateSkuArgs = {
  input: SkuInput;
  query: SkuQuery;
};


export type MutationUpdateSpuArgs = {
  input: SpuInput;
  query: SpuQuery;
};


export type MutationUpdateStaffArgs = {
  input: StaffInput;
  query: StaffQuery;
};

export type Order = {
  __typename?: 'Order';
  amount?: Maybe<Scalars['Float']['output']>;
  canceledAt?: Maybe<Scalars['String']['output']>;
  commissionAmount?: Maybe<Scalars['Float']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  expressCode?: Maybe<Scalars['String']['output']>;
  expressCompany?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  refundedAt?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  shippingArea?: Maybe<Scalars['String']['output']>;
  shippingName?: Maybe<Scalars['String']['output']>;
  shippingPhone?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Sku>;
  skuId?: Maybe<Scalars['String']['output']>;
  spec?: Maybe<Scalars['String']['output']>;
  staff?: Maybe<Staff>;
  staffId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<OrderState>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SkuType>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderByInput = {
  id?: InputMaybe<OrderBy>;
};

export type OrderInput = {
  expressCode?: InputMaybe<Scalars['String']['input']>;
  expressCompany?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  shippingArea?: InputMaybe<Scalars['String']['input']>;
  shippingName?: InputMaybe<Scalars['String']['input']>;
  shippingPhone?: InputMaybe<Scalars['String']['input']>;
};

export type OrderPagination = {
  __typename?: 'OrderPagination';
  edges?: Maybe<Array<Order>>;
  totalCount: Scalars['Int']['output'];
};

export type OrderQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  staffId?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<OrderState>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderState {
  Canceled = 'canceled',
  Completed = 'completed',
  Created = 'created',
  Paid = 'paid',
  Refunded = 'refunded',
  Shipped = 'shipped'
}

export type Permission = {
  __typename?: 'Permission';
  name?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type PermissionPagination = {
  __typename?: 'PermissionPagination';
  edges?: Maybe<Array<Permission>>;
  totalCount: Scalars['Int']['output'];
};

export type Policy = {
  __typename?: 'Policy';
  accessid?: Maybe<Scalars['String']['output']>;
  callback?: Maybe<Scalars['String']['output']>;
  dir?: Maybe<Scalars['String']['output']>;
  expire?: Maybe<Scalars['String']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  policy?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** 内容管理-文章详情 */
  article?: Maybe<Article>;
  /** 内容管理-文章列表 */
  articles?: Maybe<ArticlePagination>;
  /** 内容管理-banner详情 */
  banner?: Maybe<Banner>;
  /** 内容管理-banner列表 */
  banners?: Maybe<BannerPagination>;
  /** 分销管理-佣金详情 */
  commission?: Maybe<Commission>;
  /** 分销管理-佣金列表 */
  commissions?: Maybe<CommissionPagination>;
  /** 分销管理-订单列表 */
  distributionOrders?: Maybe<OrderPagination>;
  /** 分销管理-产品列表 */
  distributionSpus?: Maybe<SpuPagination>;
  /** 分销管理-用户列表 */
  distributionUsers?: Maybe<UserPagination>;
  /** 内容管理-文件详情 */
  file?: Maybe<File>;
  /** 内容管理-文件列表 */
  files?: Maybe<FilePagination>;
  /** 我的信息 */
  me?: Maybe<Staff>;
  /** 订单管理-订单详情 */
  order?: Maybe<Order>;
  /** 订单管理-订单列表 */
  orders?: Maybe<OrderPagination>;
  /** 系统管理-权限列表 */
  permissions?: Maybe<PermissionPagination>;
  /** 系统管理-角色详情 */
  role?: Maybe<Role>;
  /** 系统管理-角色列表 */
  roles?: Maybe<RolePagination>;
  /** 系统管理 - 查看系统设置  */
  setting?: Maybe<Setting>;
  /** 产品管理-sku详情 */
  sku?: Maybe<Sku>;
  /** 产品管理-sku列表 */
  skus?: Maybe<SkuPagination>;
  /** 产品管理-规格名列表 */
  specNames?: Maybe<SpecNamePagination>;
  /** 产品管理-产品详情 */
  spu?: Maybe<Spu>;
  /** 产品管理-产品列表 */
  spus?: Maybe<SpuPagination>;
  /** 系统管理-管理员详情 */
  staff?: Maybe<Staff>;
  /** 系统管理-管理员列表 */
  staffs?: Maybe<StaffPagination>;
  /** 用户管理-用户详情 */
  user?: Maybe<User>;
  /** 用户管理-用户列表 */
  users?: Maybe<UserPagination>;
};


export type QueryArticleArgs = {
  query: ArticleQuery;
};


export type QueryArticlesArgs = {
  query: ArticleQuery;
};


export type QueryBannerArgs = {
  query: BannerQuery;
};


export type QueryBannersArgs = {
  query: BannerQuery;
};


export type QueryCommissionArgs = {
  query: CommissionQuery;
};


export type QueryCommissionsArgs = {
  query: CommissionQuery;
};


export type QueryDistributionOrdersArgs = {
  query: OrderQuery;
};


export type QueryDistributionSpusArgs = {
  query: SpuQuery;
};


export type QueryDistributionUsersArgs = {
  query: UserQuery;
};


export type QueryFileArgs = {
  query: FileQuery;
};


export type QueryFilesArgs = {
  query: FileQuery;
};


export type QueryOrderArgs = {
  query: OrderQuery;
};


export type QueryOrdersArgs = {
  query: OrderQuery;
};


export type QueryRoleArgs = {
  query: RoleQuery;
};


export type QueryRolesArgs = {
  query: RoleQuery;
};


export type QuerySkuArgs = {
  query: SkuQuery;
};


export type QuerySkusArgs = {
  query: SkuQuery;
};


export type QuerySpecNamesArgs = {
  query: SpecNameQuery;
};


export type QuerySpuArgs = {
  query: SpuQuery;
};


export type QuerySpusArgs = {
  query: SpuQuery;
};


export type QueryStaffArgs = {
  query: StaffQuery;
};


export type QueryStaffsArgs = {
  query: StaffQuery;
};


export type QueryUserArgs = {
  query: UserQuery;
};


export type QueryUsersArgs = {
  query: UserQuery;
};

export type Refund = {
  __typename?: 'Refund';
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']['output']>;
};

export type RefundInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
};

export type Role = {
  __typename?: 'Role';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rolePermissions?: Maybe<Array<Maybe<RolePermission>>>;
};

export type RoleInput = {
  name: Scalars['String']['input'];
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RolePagination = {
  __typename?: 'RolePagination';
  edges?: Maybe<Array<Role>>;
  totalCount: Scalars['Int']['output'];
};

export type RolePermission = {
  __typename?: 'RolePermission';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  permission: Scalars['String']['output'];
  roleId: Scalars['String']['output'];
};

export type RoleQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Setting = {
  __typename?: 'Setting';
  address?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  guide?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  keyword?: Maybe<Scalars['String']['output']>;
  logoFileId?: Maybe<Scalars['String']['output']>;
  mpQrcodeFileId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  privacyAgreement?: Maybe<Scalars['String']['output']>;
  termsOfService?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  wechat?: Maybe<Scalars['String']['output']>;
};

export type SettingInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  copyright?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  guide?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  logoFileId?: InputMaybe<Scalars['String']['input']>;
  mpQrcodeFileId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  privacyAgreement?: InputMaybe<Scalars['String']['input']>;
  termsOfService?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  wechat?: InputMaybe<Scalars['String']['input']>;
};

export type Sku = {
  __typename?: 'Sku';
  commissionPrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  skuFiles?: Maybe<Array<SkuFile>>;
  skuSpecValues?: Maybe<Array<SkuSpecValue>>;
  spu?: Maybe<Spu>;
  spuId?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SkuType>;
};

export type SkuFile = {
  __typename?: 'SkuFile';
  createdAt?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Sku>;
  skuId?: Maybe<Scalars['String']['output']>;
};

export type SkuFileInput = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  skuId?: InputMaybe<Scalars['String']['input']>;
};

export type SkuInput = {
  commissionPrice?: InputMaybe<Scalars['Float']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  skuFiles?: InputMaybe<Array<SkuFileInput>>;
  skuSpecValues?: InputMaybe<Array<SkuSpecValueInput>>;
  spuId?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SkuType>;
};

export type SkuPagination = {
  __typename?: 'SkuPagination';
  edges?: Maybe<Array<Sku>>;
  totalCount: Scalars['Int']['output'];
};

export type SkuQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  spuId?: InputMaybe<Scalars['String']['input']>;
};

export type SkuSpecValue = {
  __typename?: 'SkuSpecValue';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Sku>;
  skuId?: Maybe<Scalars['String']['output']>;
  specValue?: Maybe<SpecValue>;
  specValueId?: Maybe<Scalars['String']['output']>;
};

export type SkuSpecValueInput = {
  skuId?: InputMaybe<Scalars['String']['input']>;
  specValueId?: InputMaybe<Scalars['String']['input']>;
};

export enum SkuType {
  Physical = 'physical',
  Virtual = 'virtual'
}

export type SpecName = {
  __typename?: 'SpecName';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  specValues?: Maybe<Array<SpecValue>>;
  spu?: Maybe<Spu>;
  spuId?: Maybe<Scalars['String']['output']>;
};

export type SpecNameInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  specValues?: InputMaybe<Array<SpecValueInput>>;
  spuId?: InputMaybe<Scalars['String']['input']>;
};

export type SpecNamePagination = {
  __typename?: 'SpecNamePagination';
  edges?: Maybe<Array<SpecName>>;
  totalCount: Scalars['Int']['output'];
};

export type SpecNameQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  spuId?: InputMaybe<Scalars['String']['input']>;
};

export type SpecValue = {
  __typename?: 'SpecValue';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  specName?: Maybe<SpecName>;
  specNameId?: Maybe<Scalars['String']['output']>;
  spu?: Maybe<Spu>;
  spuId?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type SpecValueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  specNameId?: InputMaybe<Scalars['String']['input']>;
  spuId?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type SpecValuePagination = {
  __typename?: 'SpecValuePagination';
  edges?: Maybe<Array<SpecValue>>;
  totalCount: Scalars['Int']['output'];
};

export type SpecValueQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Spu = {
  __typename?: 'Spu';
  attrs?: Maybe<Array<Attr>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Sku>;
  skuId?: Maybe<Scalars['String']['output']>;
  skus?: Maybe<Array<Sku>>;
  sort?: Maybe<Scalars['Int']['output']>;
  specNames?: Maybe<Array<SpecName>>;
  specValues?: Maybe<Array<SpecValue>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SpuInput = {
  attrs?: InputMaybe<Array<AttrInput>>;
  content?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  skuId?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  specNames?: InputMaybe<Array<SpecNameInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SpuPagination = {
  __typename?: 'SpuPagination';
  edges?: Maybe<Array<Spu>>;
  totalCount: Scalars['Int']['output'];
};

export type SpuQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Staff = {
  __typename?: 'Staff';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  staffRoles?: Maybe<Array<Maybe<StaffRole>>>;
  user?: Maybe<User>;
  userBindedAt?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type StaffInput = {
  code: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roleIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type StaffPagination = {
  __typename?: 'StaffPagination';
  edges?: Maybe<Array<Staff>>;
  totalCount: Scalars['Int']['output'];
};

export type StaffQuery = {
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StaffRole = {
  __typename?: 'StaffRole';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  role?: Maybe<Role>;
  roleId: Scalars['String']['output'];
  staffId: Scalars['String']['output'];
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  area?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  staff?: Maybe<Staff>;
  staffId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  edges?: Maybe<Array<User>>;
  totalCount: Scalars['Int']['output'];
};

export type UserQuery = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  staffId?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Article: ResolverTypeWrapper<Article>;
  ArticleInput: ArticleInput;
  ArticlePagination: ResolverTypeWrapper<ArticlePagination>;
  ArticleQuery: ArticleQuery;
  Attr: ResolverTypeWrapper<Attr>;
  AttrInput: AttrInput;
  AttrPagination: ResolverTypeWrapper<AttrPagination>;
  Banner: ResolverTypeWrapper<Banner>;
  BannerInput: BannerInput;
  BannerPagination: ResolverTypeWrapper<BannerPagination>;
  BannerQuery: BannerQuery;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Commission: ResolverTypeWrapper<Commission>;
  CommissionPagination: ResolverTypeWrapper<CommissionPagination>;
  CommissionQuery: CommissionQuery;
  CommissionState: CommissionState;
  File: ResolverTypeWrapper<File>;
  FileInput: FileInput;
  FilePagination: ResolverTypeWrapper<FilePagination>;
  FileQuery: FileQuery;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderBy: OrderBy;
  OrderByInput: OrderByInput;
  OrderInput: OrderInput;
  OrderPagination: ResolverTypeWrapper<OrderPagination>;
  OrderQuery: OrderQuery;
  OrderState: OrderState;
  Permission: ResolverTypeWrapper<Permission>;
  PermissionPagination: ResolverTypeWrapper<PermissionPagination>;
  Policy: ResolverTypeWrapper<Policy>;
  Query: ResolverTypeWrapper<{}>;
  Refund: ResolverTypeWrapper<Refund>;
  RefundInput: RefundInput;
  Role: ResolverTypeWrapper<Role>;
  RoleInput: RoleInput;
  RolePagination: ResolverTypeWrapper<RolePagination>;
  RolePermission: ResolverTypeWrapper<RolePermission>;
  RoleQuery: RoleQuery;
  Setting: ResolverTypeWrapper<Setting>;
  SettingInput: SettingInput;
  Sku: ResolverTypeWrapper<Sku>;
  SkuFile: ResolverTypeWrapper<SkuFile>;
  SkuFileInput: SkuFileInput;
  SkuInput: SkuInput;
  SkuPagination: ResolverTypeWrapper<SkuPagination>;
  SkuQuery: SkuQuery;
  SkuSpecValue: ResolverTypeWrapper<SkuSpecValue>;
  SkuSpecValueInput: SkuSpecValueInput;
  SkuType: SkuType;
  SpecName: ResolverTypeWrapper<SpecName>;
  SpecNameInput: SpecNameInput;
  SpecNamePagination: ResolverTypeWrapper<SpecNamePagination>;
  SpecNameQuery: SpecNameQuery;
  SpecValue: ResolverTypeWrapper<SpecValue>;
  SpecValueInput: SpecValueInput;
  SpecValuePagination: ResolverTypeWrapper<SpecValuePagination>;
  SpecValueQuery: SpecValueQuery;
  Spu: ResolverTypeWrapper<Spu>;
  SpuInput: SpuInput;
  SpuPagination: ResolverTypeWrapper<SpuPagination>;
  SpuQuery: SpuQuery;
  Staff: ResolverTypeWrapper<Staff>;
  StaffInput: StaffInput;
  StaffPagination: ResolverTypeWrapper<StaffPagination>;
  StaffQuery: StaffQuery;
  StaffRole: ResolverTypeWrapper<StaffRole>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Token: ResolverTypeWrapper<Token>;
  UpdatePasswordInput: UpdatePasswordInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserPagination: ResolverTypeWrapper<UserPagination>;
  UserQuery: UserQuery;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: Article;
  ArticleInput: ArticleInput;
  ArticlePagination: ArticlePagination;
  ArticleQuery: ArticleQuery;
  Attr: Attr;
  AttrInput: AttrInput;
  AttrPagination: AttrPagination;
  Banner: Banner;
  BannerInput: BannerInput;
  BannerPagination: BannerPagination;
  BannerQuery: BannerQuery;
  Boolean: Scalars['Boolean']['output'];
  Commission: Commission;
  CommissionPagination: CommissionPagination;
  CommissionQuery: CommissionQuery;
  File: File;
  FileInput: FileInput;
  FilePagination: FilePagination;
  FileQuery: FileQuery;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Order: Order;
  OrderByInput: OrderByInput;
  OrderInput: OrderInput;
  OrderPagination: OrderPagination;
  OrderQuery: OrderQuery;
  Permission: Permission;
  PermissionPagination: PermissionPagination;
  Policy: Policy;
  Query: {};
  Refund: Refund;
  RefundInput: RefundInput;
  Role: Role;
  RoleInput: RoleInput;
  RolePagination: RolePagination;
  RolePermission: RolePermission;
  RoleQuery: RoleQuery;
  Setting: Setting;
  SettingInput: SettingInput;
  Sku: Sku;
  SkuFile: SkuFile;
  SkuFileInput: SkuFileInput;
  SkuInput: SkuInput;
  SkuPagination: SkuPagination;
  SkuQuery: SkuQuery;
  SkuSpecValue: SkuSpecValue;
  SkuSpecValueInput: SkuSpecValueInput;
  SpecName: SpecName;
  SpecNameInput: SpecNameInput;
  SpecNamePagination: SpecNamePagination;
  SpecNameQuery: SpecNameQuery;
  SpecValue: SpecValue;
  SpecValueInput: SpecValueInput;
  SpecValuePagination: SpecValuePagination;
  SpecValueQuery: SpecValueQuery;
  Spu: Spu;
  SpuInput: SpuInput;
  SpuPagination: SpuPagination;
  SpuQuery: SpuQuery;
  Staff: Staff;
  StaffInput: StaffInput;
  StaffPagination: StaffPagination;
  StaffQuery: StaffQuery;
  StaffRole: StaffRole;
  String: Scalars['String']['output'];
  Token: Token;
  UpdatePasswordInput: UpdatePasswordInput;
  User: User;
  UserInput: UserInput;
  UserPagination: UserPagination;
  UserQuery: UserQuery;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticlePaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticlePagination'] = ResolversParentTypes['ArticlePagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Article']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttrResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attr'] = ResolversParentTypes['Attr']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType>;
  spuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttrPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttrPagination'] = ResolversParentTypes['AttrPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Attr']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BannerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Banner'] = ResolversParentTypes['Banner']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sort?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BannerPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BannerPagination'] = ResolversParentTypes['BannerPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Banner']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Commission'] = ResolversParentTypes['Commission']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  staffId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['CommissionState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommissionPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommissionPagination'] = ResolversParentTypes['CommissionPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Commission']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  banners?: Resolver<Maybe<Array<ResolversTypes['Banner']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  skuFiles?: Resolver<Maybe<Array<ResolversTypes['SkuFile']>>, ParentType, ContextType>;
  skus?: Resolver<Maybe<Array<ResolversTypes['Sku']>>, ParentType, ContextType>;
  spus?: Resolver<Maybe<Array<ResolversTypes['Spu']>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilePaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FilePagination'] = ResolversParentTypes['FilePagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'input'>>;
  createBanner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<MutationCreateBannerArgs, 'input'>>;
  createRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<MutationCreateRoleArgs, 'input'>>;
  createSku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType, RequireFields<MutationCreateSkuArgs, 'input'>>;
  createSpu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<MutationCreateSpuArgs, 'input'>>;
  createStaff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType, RequireFields<MutationCreateStaffArgs, 'input'>>;
  deleteArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'query'>>;
  deleteBanner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<MutationDeleteBannerArgs, 'query'>>;
  deleteFile?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationDeleteFileArgs, 'query'>>;
  deleteRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<MutationDeleteRoleArgs, 'query'>>;
  deleteSku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType, RequireFields<MutationDeleteSkuArgs, 'query'>>;
  deleteSpu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<MutationDeleteSpuArgs, 'query'>>;
  deleteStaff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType, RequireFields<MutationDeleteStaffArgs, 'query'>>;
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'code' | 'password'>>;
  mutationSetting?: Resolver<Maybe<ResolversTypes['Setting']>, ParentType, ContextType, RequireFields<MutationMutationSettingArgs, 'input'>>;
  publishArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationPublishArticleArgs, 'query'>>;
  publishSpu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<MutationPublishSpuArgs, 'query'>>;
  refundOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationRefundOrderArgs, 'input' | 'query'>>;
  setDefaultSku?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<MutationSetDefaultSkuArgs, 'input' | 'query'>>;
  shipOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationShipOrderArgs, 'input' | 'query'>>;
  unpublishArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationUnpublishArticleArgs, 'query'>>;
  unpublishSpu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<MutationUnpublishSpuArgs, 'query'>>;
  updateArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'input' | 'query'>>;
  updateBanner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<MutationUpdateBannerArgs, 'input' | 'query'>>;
  updateMePassword?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType, RequireFields<MutationUpdateMePasswordArgs, 'input'>>;
  updateRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, 'input' | 'query'>>;
  updateSku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType, RequireFields<MutationUpdateSkuArgs, 'input' | 'query'>>;
  updateSpu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<MutationUpdateSpuArgs, 'input' | 'query'>>;
  updateStaff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType, RequireFields<MutationUpdateStaffArgs, 'input' | 'query'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  canceledAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commissionAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expressCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expressCompany?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  refundedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType>;
  skuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spec?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  staffId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['OrderState']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['SkuType']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderPagination'] = ResolversParentTypes['OrderPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permission'] = ResolversParentTypes['Permission']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermissionPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PermissionPagination'] = ResolversParentTypes['PermissionPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Permission']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolicyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Policy'] = ResolversParentTypes['Policy']> = {
  accessid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  callback?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dir?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  host?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  policy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryArticleArgs, 'query'>>;
  articles?: Resolver<Maybe<ResolversTypes['ArticlePagination']>, ParentType, ContextType, RequireFields<QueryArticlesArgs, 'query'>>;
  banner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<QueryBannerArgs, 'query'>>;
  banners?: Resolver<Maybe<ResolversTypes['BannerPagination']>, ParentType, ContextType, RequireFields<QueryBannersArgs, 'query'>>;
  commission?: Resolver<Maybe<ResolversTypes['Commission']>, ParentType, ContextType, RequireFields<QueryCommissionArgs, 'query'>>;
  commissions?: Resolver<Maybe<ResolversTypes['CommissionPagination']>, ParentType, ContextType, RequireFields<QueryCommissionsArgs, 'query'>>;
  distributionOrders?: Resolver<Maybe<ResolversTypes['OrderPagination']>, ParentType, ContextType, RequireFields<QueryDistributionOrdersArgs, 'query'>>;
  distributionSpus?: Resolver<Maybe<ResolversTypes['SpuPagination']>, ParentType, ContextType, RequireFields<QueryDistributionSpusArgs, 'query'>>;
  distributionUsers?: Resolver<Maybe<ResolversTypes['UserPagination']>, ParentType, ContextType, RequireFields<QueryDistributionUsersArgs, 'query'>>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<QueryFileArgs, 'query'>>;
  files?: Resolver<Maybe<ResolversTypes['FilePagination']>, ParentType, ContextType, RequireFields<QueryFilesArgs, 'query'>>;
  me?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderArgs, 'query'>>;
  orders?: Resolver<Maybe<ResolversTypes['OrderPagination']>, ParentType, ContextType, RequireFields<QueryOrdersArgs, 'query'>>;
  permissions?: Resolver<Maybe<ResolversTypes['PermissionPagination']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryRoleArgs, 'query'>>;
  roles?: Resolver<Maybe<ResolversTypes['RolePagination']>, ParentType, ContextType, RequireFields<QueryRolesArgs, 'query'>>;
  setting?: Resolver<Maybe<ResolversTypes['Setting']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType, RequireFields<QuerySkuArgs, 'query'>>;
  skus?: Resolver<Maybe<ResolversTypes['SkuPagination']>, ParentType, ContextType, RequireFields<QuerySkusArgs, 'query'>>;
  specNames?: Resolver<Maybe<ResolversTypes['SpecNamePagination']>, ParentType, ContextType, RequireFields<QuerySpecNamesArgs, 'query'>>;
  spu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<QuerySpuArgs, 'query'>>;
  spus?: Resolver<Maybe<ResolversTypes['SpuPagination']>, ParentType, ContextType, RequireFields<QuerySpusArgs, 'query'>>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType, RequireFields<QueryStaffArgs, 'query'>>;
  staffs?: Resolver<Maybe<ResolversTypes['StaffPagination']>, ParentType, ContextType, RequireFields<QueryStaffsArgs, 'query'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'query'>>;
  users?: Resolver<Maybe<ResolversTypes['UserPagination']>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'query'>>;
};

export type RefundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Refund'] = ResolversParentTypes['Refund']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rolePermissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['RolePermission']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolePaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolePagination'] = ResolversParentTypes['RolePagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Role']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolePermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolePermission'] = ResolversParentTypes['RolePermission']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guide?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keyword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logoFileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mpQrcodeFileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privacyAgreement?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  termsOfService?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wechat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sku'] = ResolversParentTypes['Sku']> = {
  commissionPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  skuFiles?: Resolver<Maybe<Array<ResolversTypes['SkuFile']>>, ParentType, ContextType>;
  skuSpecValues?: Resolver<Maybe<Array<ResolversTypes['SkuSpecValue']>>, ParentType, ContextType>;
  spu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType>;
  spuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['SkuType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuFile'] = ResolversParentTypes['SkuFile']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType>;
  skuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuPagination'] = ResolversParentTypes['SkuPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Sku']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkuSpecValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkuSpecValue'] = ResolversParentTypes['SkuSpecValue']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType>;
  skuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  specValue?: Resolver<Maybe<ResolversTypes['SpecValue']>, ParentType, ContextType>;
  specValueId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpecName'] = ResolversParentTypes['SpecName']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  specValues?: Resolver<Maybe<Array<ResolversTypes['SpecValue']>>, ParentType, ContextType>;
  spu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType>;
  spuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecNamePaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpecNamePagination'] = ResolversParentTypes['SpecNamePagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['SpecName']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpecValue'] = ResolversParentTypes['SpecValue']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  specName?: Resolver<Maybe<ResolversTypes['SpecName']>, ParentType, ContextType>;
  specNameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType>;
  spuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecValuePaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpecValuePagination'] = ResolversParentTypes['SpecValuePagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['SpecValue']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpuResolvers<ContextType = any, ParentType extends ResolversParentTypes['Spu'] = ResolversParentTypes['Spu']> = {
  attrs?: Resolver<Maybe<Array<ResolversTypes['Attr']>>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType>;
  skuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skus?: Resolver<Maybe<Array<ResolversTypes['Sku']>>, ParentType, ContextType>;
  sort?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specNames?: Resolver<Maybe<Array<ResolversTypes['SpecName']>>, ParentType, ContextType>;
  specValues?: Resolver<Maybe<Array<ResolversTypes['SpecValue']>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpuPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpuPagination'] = ResolversParentTypes['SpuPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Spu']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffResolvers<ContextType = any, ParentType extends ResolversParentTypes['Staff'] = ResolversParentTypes['Staff']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['StaffRole']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userBindedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffPagination'] = ResolversParentTypes['StaffPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Staff']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffRole'] = ResolversParentTypes['StaffRole']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  staffId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  staffId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPagination'] = ResolversParentTypes['UserPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Article?: ArticleResolvers<ContextType>;
  ArticlePagination?: ArticlePaginationResolvers<ContextType>;
  Attr?: AttrResolvers<ContextType>;
  AttrPagination?: AttrPaginationResolvers<ContextType>;
  Banner?: BannerResolvers<ContextType>;
  BannerPagination?: BannerPaginationResolvers<ContextType>;
  Commission?: CommissionResolvers<ContextType>;
  CommissionPagination?: CommissionPaginationResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  FilePagination?: FilePaginationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderPagination?: OrderPaginationResolvers<ContextType>;
  Permission?: PermissionResolvers<ContextType>;
  PermissionPagination?: PermissionPaginationResolvers<ContextType>;
  Policy?: PolicyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Refund?: RefundResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RolePagination?: RolePaginationResolvers<ContextType>;
  RolePermission?: RolePermissionResolvers<ContextType>;
  Setting?: SettingResolvers<ContextType>;
  Sku?: SkuResolvers<ContextType>;
  SkuFile?: SkuFileResolvers<ContextType>;
  SkuPagination?: SkuPaginationResolvers<ContextType>;
  SkuSpecValue?: SkuSpecValueResolvers<ContextType>;
  SpecName?: SpecNameResolvers<ContextType>;
  SpecNamePagination?: SpecNamePaginationResolvers<ContextType>;
  SpecValue?: SpecValueResolvers<ContextType>;
  SpecValuePagination?: SpecValuePaginationResolvers<ContextType>;
  Spu?: SpuResolvers<ContextType>;
  SpuPagination?: SpuPaginationResolvers<ContextType>;
  Staff?: StaffResolvers<ContextType>;
  StaffPagination?: StaffPaginationResolvers<ContextType>;
  StaffRole?: StaffRoleResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPagination?: UserPaginationResolvers<ContextType>;
};

