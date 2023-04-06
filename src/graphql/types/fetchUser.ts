/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchUser
// ====================================================

export interface fetchUser_fetchUser {
  __typename: "User";
  _id: string;
  email: string;
  username: string;
  avatar: string;
  phone: string;
}

export interface fetchUser {
  fetchUser: fetchUser_fetchUser;
}

export interface fetchUserVariables {
  userId: string;
}
