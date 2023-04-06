/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "User";
  email: string;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  input?: UserInput | null;
}
