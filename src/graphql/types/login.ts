/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: login
// ====================================================

export interface login_login_user {
  __typename: "User";
  _id: string;
  email: string;
  password: string | null;
  username: string;
  avatar: string;
  phone: string;
}

export interface login_login {
  __typename: "AuthData";
  user: login_login_user;
  token: string;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  email: string;
  password: string;
}
