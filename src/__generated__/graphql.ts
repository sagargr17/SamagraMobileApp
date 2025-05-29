/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: any; output: any; }
};

export type AdViewModel = {
  __typename?: 'AdViewModel';
  isPaid: Scalars['Boolean']['output'];
  item?: Maybe<ItemViewModel>;
  itemId?: Maybe<Scalars['String']['output']>;
};

export type BasketItem = {
  __typename?: 'BasketItem';
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  item?: Maybe<ItemViewModel>;
  itemId?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type BasketItemFilterInput = {
  and?: InputMaybe<Array<BasketItemFilterInput>>;
  id?: InputMaybe<StringOperationFilterInput>;
  isPublic?: InputMaybe<BooleanOperationFilterInput>;
  itemId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BasketItemFilterInput>>;
  sub?: InputMaybe<StringOperationFilterInput>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isProduct: Scalars['Boolean']['output'];
  itemNames?: Maybe<Array<Maybe<ItemName>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  displayName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  imageUrl?: InputMaybe<StringOperationFilterInput>;
  isProduct?: InputMaybe<BooleanOperationFilterInput>;
  itemNames?: InputMaybe<ListFilterInputTypeOfItemNameFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
};

export type CategorySortInput = {
  description?: InputMaybe<SortEnumType>;
  displayName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageUrl?: InputMaybe<SortEnumType>;
  isProduct?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type Comment = {
  __typename?: 'Comment';
  commentString?: Maybe<Scalars['String']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  response?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type CommentSortInput = {
  commentString?: InputMaybe<SortEnumType>;
  entityId?: InputMaybe<SortEnumType>;
  entityName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  response?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
};

export type CreateProductRequestInput = {
  categoryId: Scalars['String']['input'];
  condition: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrls: Array<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  shopId: Scalars['String']['input'];
  stockQuantity: Scalars['Int']['input'];
  unit: Scalars['String']['input'];
};

export type CreateServiceRequestInput = {
  categoryId: Scalars['String']['input'];
  condition: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrls: Array<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  shopId: Scalars['String']['input'];
  stockQuantity: Scalars['Int']['input'];
  unit: Scalars['String']['input'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type Delivery = {
  __typename?: 'Delivery';
  entityId: Scalars['String']['output'];
  entityName: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  sub?: Maybe<Scalars['String']['output']>;
};

export type DeliveryPaymentDto = {
  __typename?: 'DeliveryPaymentDto';
  deliveryId: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  paymentMethod: Scalars['String']['output'];
  sub?: Maybe<Scalars['String']['output']>;
  transactionId: Scalars['String']['output'];
};

export type DeliveryPaymentDtoFilterInput = {
  and?: InputMaybe<Array<DeliveryPaymentDtoFilterInput>>;
  deliveryId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  isPublic?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DeliveryPaymentDtoFilterInput>>;
  paymentMethod?: InputMaybe<StringOperationFilterInput>;
  sub?: InputMaybe<StringOperationFilterInput>;
  transactionId?: InputMaybe<StringOperationFilterInput>;
};

/** A connection to a list of items. */
export type GetAdsConnection = {
  __typename?: 'GetAdsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetAdsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<AdViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetAdsEdge = {
  __typename?: 'GetAdsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<AdViewModel>;
};

/** A connection to a list of items. */
export type GetBasketItemsConnection = {
  __typename?: 'GetBasketItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetBasketItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<BasketItem>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetBasketItemsEdge = {
  __typename?: 'GetBasketItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<BasketItem>;
};

/** A connection to a list of items. */
export type GetDeliveryPaymentsConnection = {
  __typename?: 'GetDeliveryPaymentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetDeliveryPaymentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<DeliveryPaymentDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetDeliveryPaymentsEdge = {
  __typename?: 'GetDeliveryPaymentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<DeliveryPaymentDto>;
};

/** A connection to a list of items. */
export type GetItemNamesConnection = {
  __typename?: 'GetItemNamesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetItemNamesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ItemName>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetItemNamesEdge = {
  __typename?: 'GetItemNamesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ItemName>;
};

/** A connection to a list of items. */
export type GetItemsConnection = {
  __typename?: 'GetItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ItemViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetItemsEdge = {
  __typename?: 'GetItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ItemViewModel>;
};

/** A connection to a list of items. */
export type GetOrdersConnection = {
  __typename?: 'GetOrdersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetOrdersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Order>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetOrdersEdge = {
  __typename?: 'GetOrdersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Order>;
};

/** A connection to a list of items. */
export type GetProductCategoriesConnection = {
  __typename?: 'GetProductCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetProductCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetProductCategoriesEdge = {
  __typename?: 'GetProductCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Category>;
};

/** A connection to a list of items. */
export type GetPublicItemCommentsConnection = {
  __typename?: 'GetPublicItemCommentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetPublicItemCommentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ItemCommentViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetPublicItemCommentsEdge = {
  __typename?: 'GetPublicItemCommentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ItemCommentViewModel>;
};

/** A connection to a list of items. */
export type GetPublicItemsConnection = {
  __typename?: 'GetPublicItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetPublicItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ItemViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetPublicItemsEdge = {
  __typename?: 'GetPublicItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ItemViewModel>;
};

/** A connection to a list of items. */
export type GetPublicReelCommentsConnection = {
  __typename?: 'GetPublicReelCommentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetPublicReelCommentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ReelCommentViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetPublicReelCommentsEdge = {
  __typename?: 'GetPublicReelCommentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ReelCommentViewModel>;
};

/** A connection to a list of items. */
export type GetPublicReelsConnection = {
  __typename?: 'GetPublicReelsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetPublicReelsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ReelViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetPublicReelsEdge = {
  __typename?: 'GetPublicReelsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ReelViewModel>;
};

/** A connection to a list of items. */
export type GetPublicShopsConnection = {
  __typename?: 'GetPublicShopsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetPublicShopsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ShopViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetPublicShopsEdge = {
  __typename?: 'GetPublicShopsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ShopViewModel>;
};

/** A connection to a list of items. */
export type GetReelsConnection = {
  __typename?: 'GetReelsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetReelsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ReelViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetReelsEdge = {
  __typename?: 'GetReelsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ReelViewModel>;
};

/** A connection to a list of items. */
export type GetServiceCategoriesConnection = {
  __typename?: 'GetServiceCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetServiceCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetServiceCategoriesEdge = {
  __typename?: 'GetServiceCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Category>;
};

/** A connection to a list of items. */
export type GetShopItemOrdersConnection = {
  __typename?: 'GetShopItemOrdersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetShopItemOrdersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ItemOrdersViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetShopItemOrdersEdge = {
  __typename?: 'GetShopItemOrdersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ItemOrdersViewModel>;
};

/** A connection to a list of items. */
export type GetShopOrdersConnection = {
  __typename?: 'GetShopOrdersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetShopOrdersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Order>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetShopOrdersEdge = {
  __typename?: 'GetShopOrdersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Order>;
};

/** A connection to a list of items. */
export type GetShopsConnection = {
  __typename?: 'GetShopsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GetShopsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ShopViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetShopsEdge = {
  __typename?: 'GetShopsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ShopViewModel>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type Ipinfo = {
  __typename?: 'Ipinfo';
  country?: Maybe<Scalars['String']['output']>;
  ip?: Maybe<Scalars['String']['output']>;
  loc?: Maybe<Scalars['String']['output']>;
};

export type Item = {
  __typename?: 'Item';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  dateTime: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price: Scalars['Decimal']['output'];
  shop?: Maybe<Shop>;
  shopId?: Maybe<Scalars['String']['output']>;
  stockQuantity: Scalars['Int']['output'];
  sub?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type ItemCommentViewModel = {
  __typename?: 'ItemCommentViewModel';
  commentString?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  response?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};

export type ItemName = {
  __typename?: 'ItemName';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ItemNameFilterInput = {
  and?: InputMaybe<Array<ItemNameFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  displayName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  imageUrl?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ItemNameFilterInput>>;
};

export type ItemOrdersViewModel = {
  __typename?: 'ItemOrdersViewModel';
  itemId: Scalars['String']['output'];
  orders: Array<OrderViewModel>;
};

export type ItemSortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  dateTime?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  location?: InputMaybe<LocationSortInput>;
  locationId?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  shop?: InputMaybe<ShopSortInput>;
  shopId?: InputMaybe<SortEnumType>;
  stockQuantity?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  unit?: InputMaybe<SortEnumType>;
};

export type ItemViewModel = {
  __typename?: 'ItemViewModel';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<ItemCommentViewModel>>>;
  currency?: Maybe<Scalars['String']['output']>;
  dateTime: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isBiddable: Scalars['Boolean']['output'];
  isProduct: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isTradable: Scalars['Boolean']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferredItems?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  price: Scalars['Decimal']['output'];
  shop?: Maybe<ShopViewModel>;
  shopId?: Maybe<Scalars['String']['output']>;
  starRating: Scalars['Decimal']['output'];
  stars?: Maybe<Array<Maybe<StarViewModel>>>;
  stockQuantity: Scalars['Int']['output'];
  sub?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};


export type ItemViewModelCommentsArgs = {
  order?: InputMaybe<Array<CommentSortInput>>;
};

export type ItemViewModelSortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  dateTime?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isBiddable?: InputMaybe<SortEnumType>;
  isProduct?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  isTradable?: InputMaybe<SortEnumType>;
  itemId?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  shop?: InputMaybe<ShopViewModelSortInput>;
  shopId?: InputMaybe<SortEnumType>;
  starRating?: InputMaybe<SortEnumType>;
  stockQuantity?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  unit?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserViewModelSortInput>;
};

export type ListFilterInputTypeOfItemNameFilterInput = {
  all?: InputMaybe<ItemNameFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ItemNameFilterInput>;
  some?: InputMaybe<ItemNameFilterInput>;
};

export type ListTypeOfItemTypeFilterInput = {
  and?: InputMaybe<Array<ListTypeOfItemTypeFilterInput>>;
  or?: InputMaybe<Array<ListTypeOfItemTypeFilterInput>>;
};

export type Location = {
  __typename?: 'Location';
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  latitude: Scalars['Decimal']['output'];
  longitude: Scalars['Decimal']['output'];
  sub?: Maybe<Scalars['String']['output']>;
};

export type LocationSortInput = {
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
};

export type Order = {
  __typename?: 'Order';
  address: Scalars['String']['output'];
  completionDateTime: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  dateTime: Scalars['DateTime']['output'];
  fullName: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  isCompleted: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  itemId: Scalars['String']['output'];
  itemName: Scalars['String']['output'];
  message: Scalars['String']['output'];
  payment?: Maybe<Payment>;
  phoneNumber: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  quantity: Scalars['Int']['output'];
  sub?: Maybe<Scalars['String']['output']>;
};

export type OrderFilterInput = {
  address?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<OrderFilterInput>>;
  completionDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  dateTime?: InputMaybe<DateTimeOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  isCompleted?: InputMaybe<BooleanOperationFilterInput>;
  isPublic?: InputMaybe<BooleanOperationFilterInput>;
  itemId?: InputMaybe<StringOperationFilterInput>;
  itemName?: InputMaybe<StringOperationFilterInput>;
  message?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<OrderFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  price?: InputMaybe<DecimalOperationFilterInput>;
  quantity?: InputMaybe<IntOperationFilterInput>;
  sub?: InputMaybe<StringOperationFilterInput>;
};

export type OrderViewModel = {
  __typename?: 'OrderViewModel';
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Decimal']['output'];
  entityId: Scalars['String']['output'];
  entityName: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  paymentMethod: Scalars['String']['output'];
  sub?: Maybe<Scalars['String']['output']>;
  transactionId: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  isUsed: Scalars['Boolean']['output'];
  item?: Maybe<Item>;
  itemId?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type ReelCommentViewModel = {
  __typename?: 'ReelCommentViewModel';
  commentString?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  reelId?: Maybe<Scalars['String']['output']>;
  response?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};

export type ReelCommentViewModelSortInput = {
  commentString?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  reelId?: InputMaybe<SortEnumType>;
  response?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserViewModelSortInput>;
};

export type ReelSortInput = {
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  item?: InputMaybe<ItemSortInput>;
  itemId?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
};

export type ReelViewModel = {
  __typename?: 'ReelViewModel';
  comments?: Maybe<Array<Maybe<ReelCommentViewModel>>>;
  id?: Maybe<Scalars['String']['output']>;
  isLiked: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  itemViewModel?: Maybe<ItemViewModel>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addDelivery?: Maybe<Delivery>;
  addItemToBasket?: Maybe<Scalars['String']['output']>;
  clearNotifications?: Maybe<Scalars['Int']['output']>;
  commentItem?: Maybe<ItemCommentViewModel>;
  commentReel?: Maybe<Scalars['String']['output']>;
  completeOrder?: Maybe<Scalars['String']['output']>;
  createAdvertisement?: Maybe<Scalars['String']['output']>;
  createOneSignalPlayerId?: Maybe<Scalars['String']['output']>;
  createProduct?: Maybe<Product>;
  createReel?: Maybe<ReelViewModel>;
  createService?: Maybe<Service>;
  createShop?: Maybe<Shop>;
  likeReel?: Maybe<Scalars['String']['output']>;
  orderItem?: Maybe<Scalars['String']['output']>;
  removeBasketItem?: Maybe<BasketItem>;
  removeItem?: Maybe<Item>;
  removeReel?: Maybe<Scalars['String']['output']>;
  removeShop?: Maybe<Shop>;
  replyComment?: Maybe<Comment>;
  replyReelComment?: Maybe<Scalars['String']['output']>;
  selectStars?: Maybe<Star>;
  setNotificationIsSeen?: Maybe<Scalars['String']['output']>;
  setStockQuantity?: Maybe<Scalars['String']['output']>;
  unlikeReel?: Maybe<Scalars['String']['output']>;
  updateShop?: Maybe<ShopInputDto>;
};


export type RootMutationAddDeliveryArgs = {
  orderId: Scalars['String']['input'];
};


export type RootMutationAddItemToBasketArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationCommentItemArgs = {
  commentString: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
};


export type RootMutationCommentReelArgs = {
  commentString: Scalars['String']['input'];
  reelId: Scalars['String']['input'];
};


export type RootMutationCompleteOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type RootMutationCreateAdvertisementArgs = {
  itemId?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationCreateOneSignalPlayerIdArgs = {
  playerId: Scalars['String']['input'];
};


export type RootMutationCreateProductArgs = {
  product?: InputMaybe<CreateProductRequestInput>;
};


export type RootMutationCreateReelArgs = {
  itemId: Scalars['String']['input'];
  mediaUrl: Scalars['String']['input'];
};


export type RootMutationCreateServiceArgs = {
  service?: InputMaybe<CreateServiceRequestInput>;
};


export type RootMutationCreateShopArgs = {
  shop?: InputMaybe<ShopInputDtoInput>;
};


export type RootMutationLikeReelArgs = {
  reelId: Scalars['String']['input'];
};


export type RootMutationOrderItemArgs = {
  address: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
  message: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};


export type RootMutationRemoveBasketItemArgs = {
  itemId?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationRemoveItemArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationRemoveReelArgs = {
  reelId: Scalars['String']['input'];
};


export type RootMutationRemoveShopArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationReplyCommentArgs = {
  commentId: Scalars['String']['input'];
  commentString: Scalars['String']['input'];
};


export type RootMutationReplyReelCommentArgs = {
  commentId: Scalars['String']['input'];
  commentString: Scalars['String']['input'];
};


export type RootMutationSelectStarsArgs = {
  itemId: Scalars['String']['input'];
  stars: Scalars['Int']['input'];
};


export type RootMutationSetNotificationIsSeenArgs = {
  notificationId: Scalars['String']['input'];
};


export type RootMutationSetStockQuantityArgs = {
  itemId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMutationUnlikeReelArgs = {
  reelId: Scalars['String']['input'];
};


export type RootMutationUpdateShopArgs = {
  shop: ShopInputDtoInput;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  getAds?: Maybe<GetAdsConnection>;
  getBasketItems?: Maybe<GetBasketItemsConnection>;
  getBasketItemsCount?: Maybe<Scalars['Int']['output']>;
  getDeliveryPayments?: Maybe<GetDeliveryPaymentsConnection>;
  getItemNames?: Maybe<GetItemNamesConnection>;
  getItems?: Maybe<GetItemsConnection>;
  getOrders?: Maybe<GetOrdersConnection>;
  getProductCategories?: Maybe<GetProductCategoriesConnection>;
  getPublicItemComments?: Maybe<GetPublicItemCommentsConnection>;
  getPublicItems?: Maybe<GetPublicItemsConnection>;
  getPublicReelComments?: Maybe<GetPublicReelCommentsConnection>;
  getPublicReels?: Maybe<GetPublicReelsConnection>;
  getPublicShops?: Maybe<GetPublicShopsConnection>;
  getReels?: Maybe<GetReelsConnection>;
  getSellerProfile?: Maybe<SellerProfile>;
  getServiceCategories?: Maybe<GetServiceCategoriesConnection>;
  getShopItemOrders?: Maybe<GetShopItemOrdersConnection>;
  getShopOrders?: Maybe<GetShopOrdersConnection>;
  getShops?: Maybe<GetShopsConnection>;
  getUser?: Maybe<UserViewModel>;
  getUserLocale?: Maybe<Ipinfo>;
  isReelLiked?: Maybe<Scalars['Boolean']['output']>;
  searchPublicItems?: Maybe<SearchPublicItemsConnection>;
  searchPublicShops?: Maybe<SearchPublicShopsConnection>;
  searchShops?: Maybe<SearchShopsConnection>;
};


export type RootQueryGetAdsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetBasketItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BasketItemFilterInput>;
};


export type RootQueryGetDeliveryPaymentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DeliveryPaymentDtoFilterInput>;
};


export type RootQueryGetItemNamesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isTradable?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shopId?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderFilterInput>;
};


export type RootQueryGetProductCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryFilterInput>;
};


export type RootQueryGetPublicItemCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ReelCommentViewModelSortInput>>;
};


export type RootQueryGetPublicItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isTradable?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ItemViewModelSortInput>>;
  shopId?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetPublicReelCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ReelCommentViewModelSortInput>>;
  reelId?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetPublicReelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ReelSortInput>>;
};


export type RootQueryGetPublicShopsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetReelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetServiceCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetShopItemOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  shopId?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetShopOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  shopId?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OrderFilterInput>;
};


export type RootQueryGetShopsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryIsReelLikedArgs = {
  reelId?: InputMaybe<Scalars['String']['input']>;
};


export type RootQuerySearchPublicItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isBiddable?: InputMaybe<Scalars['Boolean']['input']>;
  isTradable?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  searchString?: InputMaybe<Scalars['String']['input']>;
  shopId?: InputMaybe<Scalars['String']['input']>;
};


export type RootQuerySearchPublicShopsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  searchString?: InputMaybe<Scalars['String']['input']>;
};


export type RootQuerySearchShopsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  searchString?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of items. */
export type SearchPublicItemsConnection = {
  __typename?: 'SearchPublicItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SearchPublicItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ItemViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SearchPublicItemsEdge = {
  __typename?: 'SearchPublicItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ItemViewModel>;
};

/** A connection to a list of items. */
export type SearchPublicShopsConnection = {
  __typename?: 'SearchPublicShopsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SearchPublicShopsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ShopViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SearchPublicShopsEdge = {
  __typename?: 'SearchPublicShopsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ShopViewModel>;
};

/** A connection to a list of items. */
export type SearchShopsConnection = {
  __typename?: 'SearchShopsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SearchShopsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ShopViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SearchShopsEdge = {
  __typename?: 'SearchShopsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ShopViewModel>;
};

export type SellerProfile = {
  __typename?: 'SellerProfile';
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profileImageId?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type Service = {
  __typename?: 'Service';
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  item?: Maybe<Item>;
  itemId?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type Shop = {
  __typename?: 'Shop';
  aboutShop?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  totalItemsCount: Scalars['Int']['output'];
};

export type ShopInputDto = {
  __typename?: 'ShopInputDto';
  aboutShop: Scalars['String']['output'];
  coverImageUrl: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profileImageUrl: Scalars['String']['output'];
  sub?: Maybe<Scalars['String']['output']>;
};

export type ShopInputDtoInput = {
  aboutShop: Scalars['String']['input'];
  coverImageUrl: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profileImageUrl: Scalars['String']['input'];
};

export type ShopSortInput = {
  aboutShop?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  location?: InputMaybe<LocationSortInput>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  totalItemsCount?: InputMaybe<SortEnumType>;
};

export type ShopViewModel = {
  __typename?: 'ShopViewModel';
  aboutShop?: Maybe<Scalars['String']['output']>;
  coverImageId?: Maybe<Scalars['String']['output']>;
  coverImageUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  items?: Maybe<Array<Maybe<ItemViewModel>>>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profileImageId?: Maybe<Scalars['String']['output']>;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  stars?: Maybe<Array<Maybe<Star>>>;
  sub?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};

export type ShopViewModelSortInput = {
  aboutShop?: InputMaybe<SortEnumType>;
  coverImageId?: InputMaybe<SortEnumType>;
  coverImageUrl?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  profileImageId?: InputMaybe<SortEnumType>;
  profileImageUrl?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserViewModelSortInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Star = {
  __typename?: 'Star';
  id?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  item?: Maybe<Item>;
  itemId?: Maybe<Scalars['String']['output']>;
  stars: Scalars['Int']['output'];
  sub?: Maybe<Scalars['String']['output']>;
};

export type StarViewModel = {
  __typename?: 'StarViewModel';
  id?: Maybe<Scalars['String']['output']>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UserViewModel = {
  __typename?: 'UserViewModel';
  id?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<ItemViewModel>>>;
  pofileImageUrl?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};


export type UserViewModelItemsArgs = {
  where?: InputMaybe<ListTypeOfItemTypeFilterInput>;
};

export type UserViewModelSortInput = {
  id?: InputMaybe<SortEnumType>;
  pofileImageUrl?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

export type CreateNewProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  description: Scalars['String']['input'];
  shopId: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  stockQuantity: Scalars['Int']['input'];
  imageUrls: Array<Scalars['String']['input']> | Scalars['String']['input'];
  unit: Scalars['String']['input'];
  location: Scalars['String']['input'];
}>;


export type CreateNewProductMutation = { __typename?: 'RootMutation', createProduct?: { __typename?: 'Product', id?: string | null } | null };

export type CreateNewShopMutationVariables = Exact<{
  shopName: Scalars['String']['input'];
  aboutShop: Scalars['String']['input'];
  coverImageUrl: Scalars['String']['input'];
  profileImageUrl: Scalars['String']['input'];
  location: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type CreateNewShopMutation = { __typename?: 'RootMutation', createShop?: { __typename?: 'Shop', id?: string | null } | null };

export type GetPublicItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicItemsQuery = { __typename?: 'RootQuery', getPublicItems?: { __typename?: 'GetPublicItemsConnection', nodes?: Array<{ __typename?: 'ItemViewModel', name?: string | null, imageUrls?: Array<string | null> | null, price: any, starRating: any } | null> | null } | null };

export type GetPublicItemsByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPublicItemsByIdQuery = { __typename?: 'RootQuery', getPublicItems?: { __typename?: 'GetPublicItemsConnection', nodes?: Array<{ __typename?: 'ItemViewModel', name?: string | null } | null> | null } | null };

export type ProductCategoryQueriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoryQueriesQuery = { __typename?: 'RootQuery', getProductCategories?: { __typename?: 'GetProductCategoriesConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, nodes?: Array<{ __typename?: 'Category', id?: string | null, isProduct: boolean, name?: string | null, imageUrl?: string | null } | null> | null } | null };

export type GetPersonalItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonalItemsQuery = { __typename?: 'RootQuery', getItems?: { __typename?: 'GetItemsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, nodes?: Array<{ __typename?: 'ItemViewModel', name?: string | null, price: any, starRating: any, stockQuantity: number, shop?: { __typename?: 'ShopViewModel', name?: string | null } | null } | null> | null } | null };

export type GetPaginatedPersonalItemsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPaginatedPersonalItemsQuery = { __typename?: 'RootQuery', getItems?: { __typename?: 'GetItemsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, nodes?: Array<{ __typename?: 'ItemViewModel', name?: string | null, price: any, starRating: any } | null> | null } | null };

export type GetMySHopsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMySHopsQuery = { __typename?: 'RootQuery', getShops?: { __typename?: 'GetShopsConnection', nodes?: Array<{ __typename?: 'ShopViewModel', name?: string | null, aboutShop?: string | null, location?: string | null, phoneNumber?: string | null, profileImageUrl?: string | null, stars?: Array<{ __typename?: 'Star', stars: number } | null> | null } | null> | null } | null };

export type GetLoginUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserQuery = { __typename?: 'RootQuery', getUser?: { __typename?: 'UserViewModel', username?: string | null, pofileImageUrl?: string | null } | null };


export const CreateNewProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNewProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Decimal"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stockQuantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrls"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"shopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"stockQuantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stockQuantity"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageUrls"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrls"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"currency"},"value":{"kind":"StringValue","value":"रु","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"condition"},"value":{"kind":"StringValue","value":"new","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNewProductMutation, CreateNewProductMutationVariables>;
export const CreateNewShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNewShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shopName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"aboutShop"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coverImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shop"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shopName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"aboutShop"},"value":{"kind":"Variable","name":{"kind":"Name","value":"aboutShop"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"coverImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coverImageUrl"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNewShopMutation, CreateNewShopMutationVariables>;
export const GetPublicItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicItemsQuery, GetPublicItemsQueryVariables>;
export const GetPublicItemsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicItemsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicItemsByIdQuery, GetPublicItemsByIdQueryVariables>;
export const ProductCategoryQueriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productCategoryQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isProduct"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ProductCategoryQueriesQuery, ProductCategoryQueriesQueryVariables>;
export const GetPersonalItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonalItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"stockQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"shop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonalItemsQuery, GetPersonalItemsQueryVariables>;
export const GetPaginatedPersonalItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedPersonalItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedPersonalItemsQuery, GetPaginatedPersonalItemsQueryVariables>;
export const GetMySHopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMySHops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getShops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"aboutShop"}},{"kind":"Field","name":{"kind":"Name","value":"stars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stars"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetMySHopsQuery, GetMySHopsQueryVariables>;
export const GetLoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLoginUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"pofileImageUrl"}}]}}]}}]} as unknown as DocumentNode<GetLoginUserQuery, GetLoginUserQueryVariables>;