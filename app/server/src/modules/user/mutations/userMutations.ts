import { DeleteUserMutation } from './deleteUserMutation'
import { LoginUserMutation } from './loginUserMutation'
import { RegisterUserMutation } from './registerUserMutation'

export const userMutations = {
  RegisterUser: RegisterUserMutation,
  LoginUser: LoginUserMutation,
  DeleteUser: DeleteUserMutation,
}
