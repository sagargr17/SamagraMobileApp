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
    "\n mutation createOrderMutation(\n  $fullName: String!\n  $address: String!\n  $itemId: String!\n  $phoneNumber: String!\n  $quantity: Int!\n  $message: String!\n) {\n  orderItem(\n    fullName: $fullName\n    address: $address\n    itemId: $itemId\n    phoneNumber: $phoneNumber\n    quantity: $quantity\n    message: $message\n  )\n}\n  ": typeof types.CreateOrderMutationDocument,
    "\nmutation addItemToBasketeMutation ($itemID: String!) {\n  addItemToBasket(id: $itemID) {\n    id\n  }\n}\n": typeof types.AddItemToBasketeMutationDocument,
    "\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  ": typeof types.CreateNewProductDocument,
    "mutation CreateItemRequestMutation($itemName: String!, $categoryID: String!) {\n  createItemRequest(name: $itemName, categoryId: $categoryID) {\n    id\n  }\n}\n": typeof types.CreateItemRequestMutationDocument,
    "\nmutation createItemRequestOfferMutation($requestId: String!, $itemId:String!) {\n  createItemRequestOffer(itemRequestId: $requestId, itemId: $itemId) {\n    id\n  }\n}\n": typeof types.CreateItemRequestOfferMutationDocument,
    "mutation createNewStore(\n  $shopName: String!\n  $aboutShop: String!\n  $latitude: Decimal!\n  $longitude: Decimal!\n  $phoneNumber: String!\n  $totalItemsCount: Int!\n) {\n  createStore(\n    store: {\n      name: $shopName\n      aboutShop: $aboutShop\n      longitude: $longitude\n      latitude: $latitude\n      phoneNumber: $phoneNumber\n      totalItemsCount: $totalItemsCount\n    }\n  ) {\n    id\n  }\n}\n": typeof types.CreateNewStoreDocument,
    "query GetBasketItemsQuery {\n  getBasketItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      item {\n        id\n        name\n        imageUrls\n        price\n        starRating\n      }\n    }\n  }\n}": typeof types.GetBasketItemsQueryDocument,
    "\nquery GetPublicItems {\n  getPublicItems {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      starRating\n    }\n  }\n}\n": typeof types.GetPublicItemsDocument,
    "\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      description\n      stockQuantity\n      description\n      starRating\n      shop {\n        id\n        aboutShop\n        stars {\n          stars\n        }\n         name\n        user {\n          username\n        }\n        phoneNumber\n      }\n      comments {\n        commentString\n        user {\n          username\n          profileImageUrl\n        }\n      }\n    }\n  }\n}\n\n": typeof types.GetPublicItemsByIdDocument,
    "query productCategoryQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}": typeof types.ProductCategoryQueriesDocument,
    "\nquery GetPersonalItems {\n  getItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n      imageUrls\n    }\n  }\n}\n": typeof types.GetPersonalItemsDocument,
    "\n  query GetPaginatedPersonalItems($after: String) {\n  getItems (after: $after) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      name\n      price\n      starRating\n    }\n  }\n}\n": typeof types.GetPaginatedPersonalItemsDocument,
    "\n  query GetPersonalItemsByShopId($shopId: String!) {\n  getItems(shopId: $shopId) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n    }\n  }\n}\n  ": typeof types.GetPersonalItemsByShopIdDocument,
    "\nquery GetMySHops {\n  getShops {\n    nodes {\n      id\n      name\n      aboutShop\n      stars {\n        stars\n      }\n      location\n      phoneNumber\n      profileImageUrl\n    }\n  }\n}\n": typeof types.GetMySHopsDocument,
    "\n  query GetLoginUser {\n  getUser {\n    username\n    profileImageUrl\n  }\n}\n": typeof types.GetLoginUserDocument,
    "\n  subscription GetData {\n  events {\n    id\n    eventName\n   \n    data {\n      itemRequestReceived {\n        id\n        name\n        categoryId\n      }\n      itemRequestOfferReceived {\n        id\n        itemId\n        itemRequestId\n      }\n      orderReceived {\n        fullName\n        completionDateTime\n        isCompleted\n        address\n        message\n        phoneNumber\n        price\n        quantity\n        currency\n      }\n    }\n  }\n}\n\n": typeof types.GetDataDocument,
};
const documents: Documents = {
    "\n mutation createOrderMutation(\n  $fullName: String!\n  $address: String!\n  $itemId: String!\n  $phoneNumber: String!\n  $quantity: Int!\n  $message: String!\n) {\n  orderItem(\n    fullName: $fullName\n    address: $address\n    itemId: $itemId\n    phoneNumber: $phoneNumber\n    quantity: $quantity\n    message: $message\n  )\n}\n  ": types.CreateOrderMutationDocument,
    "\nmutation addItemToBasketeMutation ($itemID: String!) {\n  addItemToBasket(id: $itemID) {\n    id\n  }\n}\n": types.AddItemToBasketeMutationDocument,
    "\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  ": types.CreateNewProductDocument,
    "mutation CreateItemRequestMutation($itemName: String!, $categoryID: String!) {\n  createItemRequest(name: $itemName, categoryId: $categoryID) {\n    id\n  }\n}\n": types.CreateItemRequestMutationDocument,
    "\nmutation createItemRequestOfferMutation($requestId: String!, $itemId:String!) {\n  createItemRequestOffer(itemRequestId: $requestId, itemId: $itemId) {\n    id\n  }\n}\n": types.CreateItemRequestOfferMutationDocument,
    "mutation createNewStore(\n  $shopName: String!\n  $aboutShop: String!\n  $latitude: Decimal!\n  $longitude: Decimal!\n  $phoneNumber: String!\n  $totalItemsCount: Int!\n) {\n  createStore(\n    store: {\n      name: $shopName\n      aboutShop: $aboutShop\n      longitude: $longitude\n      latitude: $latitude\n      phoneNumber: $phoneNumber\n      totalItemsCount: $totalItemsCount\n    }\n  ) {\n    id\n  }\n}\n": types.CreateNewStoreDocument,
    "query GetBasketItemsQuery {\n  getBasketItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      item {\n        id\n        name\n        imageUrls\n        price\n        starRating\n      }\n    }\n  }\n}": types.GetBasketItemsQueryDocument,
    "\nquery GetPublicItems {\n  getPublicItems {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      starRating\n    }\n  }\n}\n": types.GetPublicItemsDocument,
    "\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      description\n      stockQuantity\n      description\n      starRating\n      shop {\n        id\n        aboutShop\n        stars {\n          stars\n        }\n         name\n        user {\n          username\n        }\n        phoneNumber\n      }\n      comments {\n        commentString\n        user {\n          username\n          profileImageUrl\n        }\n      }\n    }\n  }\n}\n\n": types.GetPublicItemsByIdDocument,
    "query productCategoryQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}": types.ProductCategoryQueriesDocument,
    "\nquery GetPersonalItems {\n  getItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n      imageUrls\n    }\n  }\n}\n": types.GetPersonalItemsDocument,
    "\n  query GetPaginatedPersonalItems($after: String) {\n  getItems (after: $after) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      name\n      price\n      starRating\n    }\n  }\n}\n": types.GetPaginatedPersonalItemsDocument,
    "\n  query GetPersonalItemsByShopId($shopId: String!) {\n  getItems(shopId: $shopId) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n    }\n  }\n}\n  ": types.GetPersonalItemsByShopIdDocument,
    "\nquery GetMySHops {\n  getShops {\n    nodes {\n      id\n      name\n      aboutShop\n      stars {\n        stars\n      }\n      location\n      phoneNumber\n      profileImageUrl\n    }\n  }\n}\n": types.GetMySHopsDocument,
    "\n  query GetLoginUser {\n  getUser {\n    username\n    profileImageUrl\n  }\n}\n": types.GetLoginUserDocument,
    "\n  subscription GetData {\n  events {\n    id\n    eventName\n   \n    data {\n      itemRequestReceived {\n        id\n        name\n        categoryId\n      }\n      itemRequestOfferReceived {\n        id\n        itemId\n        itemRequestId\n      }\n      orderReceived {\n        fullName\n        completionDateTime\n        isCompleted\n        address\n        message\n        phoneNumber\n        price\n        quantity\n        currency\n      }\n    }\n  }\n}\n\n": types.GetDataDocument,
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
export function gql(source: "\n mutation createOrderMutation(\n  $fullName: String!\n  $address: String!\n  $itemId: String!\n  $phoneNumber: String!\n  $quantity: Int!\n  $message: String!\n) {\n  orderItem(\n    fullName: $fullName\n    address: $address\n    itemId: $itemId\n    phoneNumber: $phoneNumber\n    quantity: $quantity\n    message: $message\n  )\n}\n  "): (typeof documents)["\n mutation createOrderMutation(\n  $fullName: String!\n  $address: String!\n  $itemId: String!\n  $phoneNumber: String!\n  $quantity: Int!\n  $message: String!\n) {\n  orderItem(\n    fullName: $fullName\n    address: $address\n    itemId: $itemId\n    phoneNumber: $phoneNumber\n    quantity: $quantity\n    message: $message\n  )\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation addItemToBasketeMutation ($itemID: String!) {\n  addItemToBasket(id: $itemID) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation addItemToBasketeMutation ($itemID: String!) {\n  addItemToBasket(id: $itemID) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  "): (typeof documents)["\n mutation createNewProduct(\n  $name: String!\n  $price: Decimal!\n  $description: String!\n  $shopId: String!\n  $categoryId: String!\n  $stockQuantity: Int!\n  $imageUrls: [String!]!\n  $unit: String!\n  $location: String!\n) {\n  createProduct(\n    product: {\n      name: $name\n      price: $price\n      description: $description\n      shopId: $shopId\n      categoryId: $categoryId\n      stockQuantity: $stockQuantity\n      imageUrls: $imageUrls\n      currency: \"रु\"\n      location: $location\n      unit: $unit\n      condition: \"new\"\n    }\n  ) {\n    id\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateItemRequestMutation($itemName: String!, $categoryID: String!) {\n  createItemRequest(name: $itemName, categoryId: $categoryID) {\n    id\n  }\n}\n"): (typeof documents)["mutation CreateItemRequestMutation($itemName: String!, $categoryID: String!) {\n  createItemRequest(name: $itemName, categoryId: $categoryID) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation createItemRequestOfferMutation($requestId: String!, $itemId:String!) {\n  createItemRequestOffer(itemRequestId: $requestId, itemId: $itemId) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation createItemRequestOfferMutation($requestId: String!, $itemId:String!) {\n  createItemRequestOffer(itemRequestId: $requestId, itemId: $itemId) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createNewStore(\n  $shopName: String!\n  $aboutShop: String!\n  $latitude: Decimal!\n  $longitude: Decimal!\n  $phoneNumber: String!\n  $totalItemsCount: Int!\n) {\n  createStore(\n    store: {\n      name: $shopName\n      aboutShop: $aboutShop\n      longitude: $longitude\n      latitude: $latitude\n      phoneNumber: $phoneNumber\n      totalItemsCount: $totalItemsCount\n    }\n  ) {\n    id\n  }\n}\n"): (typeof documents)["mutation createNewStore(\n  $shopName: String!\n  $aboutShop: String!\n  $latitude: Decimal!\n  $longitude: Decimal!\n  $phoneNumber: String!\n  $totalItemsCount: Int!\n) {\n  createStore(\n    store: {\n      name: $shopName\n      aboutShop: $aboutShop\n      longitude: $longitude\n      latitude: $latitude\n      phoneNumber: $phoneNumber\n      totalItemsCount: $totalItemsCount\n    }\n  ) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetBasketItemsQuery {\n  getBasketItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      item {\n        id\n        name\n        imageUrls\n        price\n        starRating\n      }\n    }\n  }\n}"): (typeof documents)["query GetBasketItemsQuery {\n  getBasketItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      item {\n        id\n        name\n        imageUrls\n        price\n        starRating\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetPublicItems {\n  getPublicItems {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      starRating\n    }\n  }\n}\n"): (typeof documents)["\nquery GetPublicItems {\n  getPublicItems {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      starRating\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      description\n      stockQuantity\n      description\n      starRating\n      shop {\n        id\n        aboutShop\n        stars {\n          stars\n        }\n         name\n        user {\n          username\n        }\n        phoneNumber\n      }\n      comments {\n        commentString\n        user {\n          username\n          profileImageUrl\n        }\n      }\n    }\n  }\n}\n\n"): (typeof documents)["\nquery GetPublicItemsById($id: String!) {\n  getPublicItems(id: $id) {\n    nodes {\n      id\n      name\n      imageUrls\n      price\n      description\n      stockQuantity\n      description\n      starRating\n      shop {\n        id\n        aboutShop\n        stars {\n          stars\n        }\n         name\n        user {\n          username\n        }\n        phoneNumber\n      }\n      comments {\n        commentString\n        user {\n          username\n          profileImageUrl\n        }\n      }\n    }\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query productCategoryQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}"): (typeof documents)["query productCategoryQueries {\n  getProductCategories {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n\n    nodes {\n      id\n      isProduct\n      name\n      imageUrl\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetPersonalItems {\n  getItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n      imageUrls\n    }\n  }\n}\n"): (typeof documents)["\nquery GetPersonalItems {\n  getItems {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n      imageUrls\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPaginatedPersonalItems($after: String) {\n  getItems (after: $after) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      name\n      price\n      starRating\n    }\n  }\n}\n"): (typeof documents)["\n  query GetPaginatedPersonalItems($after: String) {\n  getItems (after: $after) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      name\n      price\n      starRating\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPersonalItemsByShopId($shopId: String!) {\n  getItems(shopId: $shopId) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n    }\n  }\n}\n  "): (typeof documents)["\n  query GetPersonalItemsByShopId($shopId: String!) {\n  getItems(shopId: $shopId) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    nodes {\n      id\n      name\n      price\n      starRating\n      stockQuantity\n      shop {\n        id\n        name\n      }\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetMySHops {\n  getShops {\n    nodes {\n      id\n      name\n      aboutShop\n      stars {\n        stars\n      }\n      location\n      phoneNumber\n      profileImageUrl\n    }\n  }\n}\n"): (typeof documents)["\nquery GetMySHops {\n  getShops {\n    nodes {\n      id\n      name\n      aboutShop\n      stars {\n        stars\n      }\n      location\n      phoneNumber\n      profileImageUrl\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLoginUser {\n  getUser {\n    username\n    profileImageUrl\n  }\n}\n"): (typeof documents)["\n  query GetLoginUser {\n  getUser {\n    username\n    profileImageUrl\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription GetData {\n  events {\n    id\n    eventName\n   \n    data {\n      itemRequestReceived {\n        id\n        name\n        categoryId\n      }\n      itemRequestOfferReceived {\n        id\n        itemId\n        itemRequestId\n      }\n      orderReceived {\n        fullName\n        completionDateTime\n        isCompleted\n        address\n        message\n        phoneNumber\n        price\n        quantity\n        currency\n      }\n    }\n  }\n}\n\n"): (typeof documents)["\n  subscription GetData {\n  events {\n    id\n    eventName\n   \n    data {\n      itemRequestReceived {\n        id\n        name\n        categoryId\n      }\n      itemRequestOfferReceived {\n        id\n        itemId\n        itemRequestId\n      }\n      orderReceived {\n        fullName\n        completionDateTime\n        isCompleted\n        address\n        message\n        phoneNumber\n        price\n        quantity\n        currency\n      }\n    }\n  }\n}\n\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;