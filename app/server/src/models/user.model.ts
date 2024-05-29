import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName?: string
  taxId: string
  password: string
  createdAt: Date
}

export interface UserModel extends IUser, Document {
  id: string
}

const UserSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    taxId: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Users',
    timestamps: true,
  },
)

UserSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.password
  },
})
export default model<UserModel>('User', UserSchema)
