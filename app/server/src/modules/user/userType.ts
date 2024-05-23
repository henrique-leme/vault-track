import { GraphQLObjectType, GraphQLString } from 'graphql'
import { UserModel } from 'src/models/user.model'

export const userType = new GraphQLObjectType<UserModel>({
  name: 'User',
  description: 'A user object',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The user id ',
    },
    firstName: {
      type: GraphQLString,
      description: 'The user first name',
    },
    secondName: {
      type: GraphQLString,
      description: 'The user second name',
    },
    taxId: {
      type: GraphQLString,
      description: 'The taxId of the user',
    },
    email: {
      type: GraphQLString,
      description: 'User email',
    },
    password: {
      type: GraphQLString,
      description: 'User password ',
    },
    createdAt: {
      type: GraphQLString,
      description: 'The date that user was created',
    },
  }),
})
