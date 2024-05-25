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
    lastName: {
      type: GraphQLString,
      description: 'The user last name',
    },
    taxId: {
      type: GraphQLString,
      description: 'The taxId of the user',
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
