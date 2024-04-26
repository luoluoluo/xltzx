const typeDefs = /* GraphQL */ `
  type StaffRole {
    id: String!
    staffId: String!
    roleId: String!
    role: Role
    createdAt: String
  }
`;
export default typeDefs;
