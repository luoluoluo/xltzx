const typeDefs = /* GraphQL */ `
  type Setting {
    id: String
    name: String
    keyword: String
    title: String
    description: String
    address: String
    phone: String
    wechat: String
    email: String
    copyright: String
    mpQrcodeFileId: String
    logoFileId: String
    createdAt: String
    privacyAgreement: String
    termsOfService: String
    guide: String
  }

  input SettingInput {
    name: String
    keyword: String
    title: String
    description: String
    address: String
    phone: String
    wechat: String
    copyright: String
    mpQrcodeFileId: String
    logoFileId: String
    privacyAgreement: String
    termsOfService: String
    guide: String
  }

  type Query {
    "系统管理 - 查看系统设置 "
    setting: Setting
  }

  type Mutation {
    "系统管理 - 修改系统设置"
    mutationSetting(input: SettingInput!): Setting
  }
`;
export default typeDefs;
