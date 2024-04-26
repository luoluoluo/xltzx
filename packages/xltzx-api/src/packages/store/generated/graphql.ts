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
  ArticlePagination: ResolverTypeWrapper<ArticlePagination>;
  ArticleQuery: ArticleQuery;
  Attr: ResolverTypeWrapper<Attr>;
  AttrInput: AttrInput;
  AttrPagination: ResolverTypeWrapper<AttrPagination>;
  Banner: ResolverTypeWrapper<Banner>;
  BannerPagination: ResolverTypeWrapper<BannerPagination>;
  BannerQuery: BannerQuery;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  File: ResolverTypeWrapper<File>;
  FileInput: FileInput;
  FilePagination: ResolverTypeWrapper<FilePagination>;
  FileQuery: FileQuery;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JsConfig: ResolverTypeWrapper<JsConfig>;
  LoginInput: LoginInput;
  LoginKey: ResolverTypeWrapper<LoginKey>;
  LoginKeyQuery: LoginKeyQuery;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderBy: OrderBy;
  OrderByInput: OrderByInput;
  OrderInput: OrderInput;
  OrderPagination: ResolverTypeWrapper<OrderPagination>;
  OrderQuery: OrderQuery;
  OrderState: OrderState;
  Pay: ResolverTypeWrapper<Pay>;
  PayOrderQuery: PayOrderQuery;
  PayType: PayType;
  PayWechatJsapi: ResolverTypeWrapper<PayWechatJsapi>;
  Policy: ResolverTypeWrapper<Policy>;
  Query: ResolverTypeWrapper<{}>;
  Setting: ResolverTypeWrapper<Setting>;
  Sku: ResolverTypeWrapper<Sku>;
  SkuFile: ResolverTypeWrapper<SkuFile>;
  SkuFileInput: SkuFileInput;
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
  SpuMedia: ResolverTypeWrapper<SpuMedia>;
  SpuMediaInput: SpuMediaInput;
  SpuPagination: ResolverTypeWrapper<SpuPagination>;
  SpuQuery: SpuQuery;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserPagination: ResolverTypeWrapper<UserPagination>;
  UserQuery: UserQuery;
  UserType: UserType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: Article;
  ArticlePagination: ArticlePagination;
  ArticleQuery: ArticleQuery;
  Attr: Attr;
  AttrInput: AttrInput;
  AttrPagination: AttrPagination;
  Banner: Banner;
  BannerPagination: BannerPagination;
  BannerQuery: BannerQuery;
  Boolean: Scalars['Boolean']['output'];
  File: File;
  FileInput: FileInput;
  FilePagination: FilePagination;
  FileQuery: FileQuery;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  JsConfig: JsConfig;
  LoginInput: LoginInput;
  LoginKey: LoginKey;
  LoginKeyQuery: LoginKeyQuery;
  Mutation: {};
  Order: Order;
  OrderByInput: OrderByInput;
  OrderInput: OrderInput;
  OrderPagination: OrderPagination;
  OrderQuery: OrderQuery;
  Pay: Pay;
  PayOrderQuery: PayOrderQuery;
  PayWechatJsapi: PayWechatJsapi;
  Policy: Policy;
  Query: {};
  Setting: Setting;
  Sku: Sku;
  SkuFile: SkuFile;
  SkuFileInput: SkuFileInput;
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
  SpuMedia: SpuMedia;
  SpuMediaInput: SpuMediaInput;
  SpuPagination: SpuPagination;
  SpuQuery: SpuQuery;
  String: Scalars['String']['output'];
  Token: Token;
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
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BannerPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BannerPagination'] = ResolversParentTypes['BannerPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Banner']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilePaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FilePagination'] = ResolversParentTypes['FilePagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JsConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['JsConfig'] = ResolversParentTypes['JsConfig']> = {
  appId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonceStr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginKey'] = ResolversParentTypes['LoginKey']> = {
  loginKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  bindStaff?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationBindStaffArgs, 'input'>>;
  createOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'input'>>;
  deleteFile?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationDeleteFileArgs, 'query'>>;
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  loginWithKey?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginWithKeyArgs, 'input'>>;
  payOrder?: Resolver<Maybe<ResolversTypes['Pay']>, ParentType, ContextType, RequireFields<MutationPayOrderArgs, 'query'>>;
  refundOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationRefundOrderArgs, 'query'>>;
  updateMe?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateMeArgs, 'input'>>;
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

export type PayResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pay'] = ResolversParentTypes['Pay']> = {
  wechatJsapi?: Resolver<Maybe<ResolversTypes['PayWechatJsapi']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayWechatJsapiResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayWechatJsapi'] = ResolversParentTypes['PayWechatJsapi']> = {
  appId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonceStr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  package?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paySign?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeStamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<QueryFileArgs, 'query'>>;
  files?: Resolver<Maybe<ResolversTypes['FilePagination']>, ParentType, ContextType, RequireFields<QueryFilesArgs, 'query'>>;
  jsConfig?: Resolver<Maybe<ResolversTypes['JsConfig']>, ParentType, ContextType, RequireFields<QueryJsConfigArgs, 'url'>>;
  loginKey?: Resolver<Maybe<ResolversTypes['LoginKey']>, ParentType, ContextType, RequireFields<QueryLoginKeyArgs, 'query'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderArgs, 'query'>>;
  orders?: Resolver<Maybe<ResolversTypes['OrderPagination']>, ParentType, ContextType, RequireFields<QueryOrdersArgs, 'query'>>;
  setting?: Resolver<Maybe<ResolversTypes['Setting']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType, RequireFields<QuerySkuArgs, 'query'>>;
  skus?: Resolver<Maybe<ResolversTypes['SkuPagination']>, ParentType, ContextType, RequireFields<QuerySkusArgs, 'query'>>;
  spu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType, RequireFields<QuerySpuArgs, 'query'>>;
  spus?: Resolver<Maybe<ResolversTypes['SpuPagination']>, ParentType, ContextType, RequireFields<QuerySpusArgs, 'query'>>;
};

export type SettingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  skuFiles?: Resolver<Maybe<Array<ResolversTypes['SkuFile']>>, ParentType, ContextType>;
  skuSpecValues?: Resolver<Maybe<Array<ResolversTypes['SkuSpecValue']>>, ParentType, ContextType, Partial<SkuSkuSpecValuesArgs>>;
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
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['Sku']>, ParentType, ContextType>;
  skuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skus?: Resolver<Maybe<Array<ResolversTypes['Sku']>>, ParentType, ContextType>;
  specNames?: Resolver<Maybe<Array<ResolversTypes['SpecName']>>, ParentType, ContextType, Partial<SpuSpecNamesArgs>>;
  specValues?: Resolver<Maybe<Array<ResolversTypes['SpecValue']>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpuMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpuMedia'] = ResolversParentTypes['SpuMedia']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  fileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spu?: Resolver<Maybe<ResolversTypes['Spu']>, ParentType, ContextType>;
  spuId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpuPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpuPagination'] = ResolversParentTypes['SpuPagination']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['Spu']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  staffId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['UserType']>, ParentType, ContextType>;
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
  File?: FileResolvers<ContextType>;
  FilePagination?: FilePaginationResolvers<ContextType>;
  JsConfig?: JsConfigResolvers<ContextType>;
  LoginKey?: LoginKeyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderPagination?: OrderPaginationResolvers<ContextType>;
  Pay?: PayResolvers<ContextType>;
  PayWechatJsapi?: PayWechatJsapiResolvers<ContextType>;
  Policy?: PolicyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
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
  SpuMedia?: SpuMediaResolvers<ContextType>;
  SpuPagination?: SpuPaginationResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPagination?: UserPaginationResolvers<ContextType>;
};

