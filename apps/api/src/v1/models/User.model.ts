import mongoose from 'mongoose';
import { ERROR_MESSAGES } from '../../lib/utils/error-messages';
import bcrypt from 'bcrypt';
import { UserRoleEnum, UserStatusEnum, UserDocument } from '@repo/shared';

interface IUserSchema extends UserDocument {
  setPassword: (password: string) => void;
  validatePassword: (password: string) => boolean;
  passwordEncryption: (password: string) => string;
}

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: UserStatusEnum.ACTIVE,
      enum: UserStatusEnum,
    },
    role: {
      type: String,
      default: UserRoleEnum.USER,
      enum: UserRoleEnum,
    },
    id_number: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    full_name: {
      type: String,
    },
    orders_placed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryOrder',
      },
    ],
    order_full_filled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryOrder',
      },
    ],
    journeys_shared: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey',
      },
    ],
    journeys_joined: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    autoIndex: true,
  }
);

UserSchema.index({ email: 1, id_number: 1 });
UserSchema.methods.setPassword = function (password: string) {
  this.password = bcrypt.hashSync(password, 10);
};

UserSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.passwordEncryption = function (password: string) {
  return bcrypt.hashSync(password, 10);
};

UserSchema.post('save', { errorHandler: true }, function (error: any, _, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS));
  } else {
    next(error);
  }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
