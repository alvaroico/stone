export interface ResourceAccess {
  customers: Customers;
}

export interface Customers {
  roles: string[];
}

export interface ITokenJWT {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  acr: string;
  resource_access: ResourceAccess;
  scope: string;
  clientId: string;
  email_verified: boolean;
  clientHost: string;
  preferred_username: string;
  clientAddress: string;
}
