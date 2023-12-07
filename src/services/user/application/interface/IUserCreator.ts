export interface IUserCreator {
  id?: number;
  email?: string;
  identification?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string
  isFather?: boolean;
  isUpdate?: boolean;
  sex?: boolean;
  acceptTyC?: boolean;
  acceptTPD?: boolean
  updatedAt?: string;
  createdAt?: string;
}