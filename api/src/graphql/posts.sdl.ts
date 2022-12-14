export const schema = gql`
  type Post {
    id: Int!
    title: String!
    explanation: String!
    codeLanguage: String!
    codeSnippet: String!
    authorId: Int!
    createdAt: DateTime!
  }

  type Query {
    posts: [Post!]! @requireAuth
    post(id: Int!): Post @requireAuth
  }

  input CreatePostInput {
    title: String!
    explanation: String!
    codeLanguage: String!
    codeSnippet: String!
    authorId: Int!
  }

  input UpdatePostInput {
    title: String
    explanation: String
    codeLanguage: String
    codeSnippet: String
    authorId: Int!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
