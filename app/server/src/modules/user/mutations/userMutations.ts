import { DeleteUserMutation } from './deleteUserMutation'
import { LoginUserMutation } from './loginUserMutation'
import { RegisterUserMutation } from './registerUserMutation'
import { UpdateUserMutation } from './updateUserMutation'

export const userMutations = {
  RegisterUser: RegisterUserMutation,
  LoginUser: LoginUserMutation,
  DeleteUser: DeleteUserMutation,
  UpdateUser: UpdateUserMutation,
}
