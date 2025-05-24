/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  ": typeof types.CreateNewProductDocument,
    "mutation createNewShop (\n  $shopName: String!\n  $aboutShop: String!\n  $coverImageUrl: String!\n  $profileImageUrl: String!\n  $location: String!\n  $phoneNumber: String!\n) {\n  createShop(\n    shop: {\n      name: $shopName\n      aboutShop: $aboutShop\n      coverImageUrl: $coverImageUrl\n      profileImageUrl: $profileImageUrl\n      location: $location\n      phoneNumber: $phoneNumber\n    }\n  ) {\n    id\n  }\n}\n": typeof types.CreateNewShopDocument,
    "\n  query GetPublicItems{\n    getPublicItems {\n      nodes {\n        name\n      }\n    }\n  }\n": typeof types.GetPublicItemsDocument,
    "\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      name\n    }\n  }\n}\n": typeof types.GetPublicItemsByIdDocument,
    "query productQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}": typeof types.ProductQueriesDocument,
};
const documents: Documents = {
    "\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  ": types.CreateNewProductDocument,
    "mutation createNewShop (\n  $shopName: String!\n  $aboutShop: String!\n  $coverImageUrl: String!\n  $profileImageUrl: String!\n  $location: String!\n  $phoneNumber: String!\n) {\n  createShop(\n    shop: {\n      name: $shopName\n      aboutShop: $aboutShop\n      coverImageUrl: $coverImageUrl\n      profileImageUrl: $profileImageUrl\n      location: $location\n      phoneNumber: $phoneNumber\n    }\n  ) {\n    id\n  }\n}\n": types.CreateNewShopDocument,
    "\n  query GetPublicItems{\n    getPublicItems {\n      nodes {\n        name\n      }\n    }\n  }\n": types.GetPublicItemsDocument,
    "\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      name\n    }\n  }\n}\n": types.GetPublicItemsByIdDocument,
    "query productQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}": types.ProductQueriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  "): (typeof documents)["\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createNewShop (\n  $shopName: String!\n  $aboutShop: String!\n  $coverImageUrl: String!\n  $profileImageUrl: String!\n  $location: String!\n  $phoneNumber: String!\n) {\n  createShop(\n    shop: {\n      name: $shopName\n      aboutShop: $aboutShop\n      coverImageUrl: $coverImageUrl\n      profileImageUrl: $profileImageUrl\n      location: $location\n      phoneNumber: $phoneNumber\n    }\n  ) {\n    id\n  }\n}\n"): (typeof documents)["mutation createNewShop (\n  $shopName: String!\n  $aboutShop: String!\n  $coverImageUrl: String!\n  $profileImageUrl: String!\n  $location: String!\n  $phoneNumber: String!\n) {\n  createShop(\n    shop: {\n      name: $shopName\n      aboutShop: $aboutShop\n      coverImageUrl: $coverImageUrl\n      profileImageUrl: $profileImageUrl\n      location: $location\n      phoneNumber: $phoneNumber\n    }\n  ) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPublicItems{\n    getPublicItems {\n      nodes {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPublicItems{\n    getPublicItems {\n      nodes {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query productQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}"): (typeof documents)["query productQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;