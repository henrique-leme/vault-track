import { GraphQLObjectType, GraphQLString } from 'graphql'
import { UserModel } from 'src/models/user.model'

export const userType = new GraphQLObjectType<UserModel>({
  name: 'User',
  description: 'An user object',
  fields: () => ({
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
  }),
})
