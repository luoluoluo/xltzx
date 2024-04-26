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
    mpQrcodeFileId: String
    logoFileId: String
    copyright: String
    createdAt: String
    privacyAgreement: String
    termsOfService: String
    guide: String
  }

  type Query {
    setting: Setting
  }
`;
export default typeDefs;
