/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  title?: Maybe<Scalars['String']['output']>;
};

export type ArticlePagination = {
  __typename?: 'ArticlePagination';
  edges?: Maybe<Array<Article>>;
  totalCount: Scalars['Int']['output'];
};

export type ArticleQuery = {
  fileId?: InputMaybe<Scalars['String']['input']>;
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
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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

export type File = {
  __typename?: 'File';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
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

export type JsConfig = {
  __typename?: 'JsConfig';
  appId: Scalars['String']['output'];
  nonceStr: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type LoginInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  loginKey?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
};

export type LoginKey = {
  __typename?: 'LoginKey';
  loginKey: Scalars['String']['output'];
  type: UserType;
};

export type LoginKeyQuery = {
  type: UserType;
};

export type Mutation = {
  __typename?: 'Mutation';
  bindStaff?: Maybe<User>;
  /** 创建订单 */
  createOrder?: Maybe<Order>;
  /** 删除文件 */
  deleteFile?: Maybe<File>;
  /** 登录 */
  login?: Maybe<Token>;
  /** 登录 */
  loginWithKey?: Maybe<Token>;
  /** 支付订单 */
  payOrder?: Maybe<Pay>;
  /** 退款 */
  refundOrder?: Maybe<Order>;
  updateMe?: Maybe<User>;
};


export type MutationBindStaffArgs = {
  input: UserInput;
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
};


export type MutationDeleteFileArgs = {
  query: FileQuery;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLoginWithKeyArgs = {
  input: LoginInput;
};


export type MutationPayOrderArgs = {
  query: PayOrderQuery;
};


export type MutationRefundOrderArgs = {
  query: OrderQuery;
};


export type MutationUpdateMeArgs = {
  input: UserInput;
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
  quantity?: InputMaybe<Scalars['Int']['input']>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  shippingArea?: InputMaybe<Scalars['String']['input']>;
  shippingName?: InputMaybe<Scalars['String']['input']>;
  shippingPhone?: InputMaybe<Scalars['String']['input']>;
  skuId?: InputMaybe<Scalars['String']['input']>;
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
  state?: InputMaybe<OrderState>;
};

export enum OrderState {
  Canceled = 'canceled',
  Completed = 'completed',
  Created = 'created',
  Paid = 'paid',
  Refunded = 'refunded',
  Shipped = 'shipped'
}

export type Pay = {
  __typename?: 'Pay';
  wechatJsapi?: Maybe<PayWechatJsapi>;
};

export type PayOrderQuery = {
  orderId: Scalars['String']['input'];
  type?: InputMaybe<PayType>;
};

export enum PayType {
  WechatJsApi = 'wechatJsApi'
}

export type PayWechatJsapi = {
  __typename?: 'PayWechatJsapi';
  appId?: Maybe<Scalars['String']['output']>;
  nonceStr?: Maybe<Scalars['String']['output']>;
  package?: Maybe<Scalars['String']['output']>;
  paySign?: Maybe<Scalars['String']['output']>;
  signType?: Maybe<Scalars['String']['output']>;
  timeStamp?: Maybe<Scalars['String']['output']>;
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
  /** 页面详情 */
  article?: Maybe<Article>;
  /** 页面列表 */
  articles?: Maybe<ArticlePagination>;
  /** banner详情 */
  banner?: Maybe<Banner>;
  /** banner列表 */
  banners?: Maybe<BannerPagination>;
  /** 文件详情 */
  file?: Maybe<File>;
  /** 文件列表 */
  files?: Maybe<FilePagination>;
  jsConfig?: Maybe<JsConfig>;
  loginKey?: Maybe<LoginKey>;
  /** 我的信息 */
  me?: Maybe<User>;
  /** 订单详情 */
  order?: Maybe<Order>;
  /** 订单列表 */
  orders?: Maybe<OrderPagination>;
  setting?: Maybe<Setting>;
  /** sku详情 */
  sku?: Maybe<Sku>;
  /** sku列表 */
  skus?: Maybe<SkuPagination>;
  /** 产品详情 */
  spu?: Maybe<Spu>;
  /** 产品列表 */
  spus?: Maybe<SpuPagination>;
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


export type QueryFileArgs = {
  query: FileQuery;
};


export type QueryFilesArgs = {
  query: FileQuery;
};


export type QueryJsConfigArgs = {
  url: Scalars['String']['input'];
};


export type QueryLoginKeyArgs = {
  query: LoginKeyQuery;
};


export type QueryOrderArgs = {
  query: OrderQuery;
};


export type QueryOrdersArgs = {
  query: OrderQuery;
};


export type QuerySkuArgs = {
  query: SkuQuery;
};


export type QuerySkusArgs = {
  query: SkuQuery;
};


export type QuerySpuArgs = {
  query: SpuQuery;
};


export type QuerySpusArgs = {
  query: SpuQuery;
};

export type Setting = {
  __typename?: 'Setting';
  address?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
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

export type Sku = {
  __typename?: 'Sku';
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


export type SkuSkuSpecValuesArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<OrderByInput>>>;
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
  name?: InputMaybe<Scalars['String']['input']>;
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
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Sku>;
  skuId?: Maybe<Scalars['String']['output']>;
  skus?: Maybe<Array<Sku>>;
  specNames?: Maybe<Array<SpecName>>;
  specValues?: Maybe<Array<SpecValue>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type SpuSpecNamesArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<OrderByInput>>>;
};

export type SpuInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SpuMedia = {
  __typename?: 'SpuMedia';
  createdAt?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  spu?: Maybe<Spu>;
  spuId?: Maybe<Scalars['String']['output']>;
};

export type SpuMediaInput = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  spuId?: InputMaybe<Scalars['String']['input']>;
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

export type Token = {
  __typename?: 'Token';
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
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
  staffId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<UserType>;
};

export type UserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  staffId?: InputMaybe<Scalars['String']['input']>;
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
};

export enum UserType {
  Phone = 'phone',
  Wechat = 'wechat'
}
