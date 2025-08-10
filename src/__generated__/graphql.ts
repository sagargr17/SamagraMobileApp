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
  id?: Maybe<Scalars['String']['output']>;
  itemId?: Maybe<Scalars['String']['output']>;
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type BasketItemViewModel = {
  __typename?: 'BasketItemViewModel';
  id?: Maybe<Scalars['String']['output']>;
  item?: Maybe<ItemViewModel>;
  itemId?: Maybe<Scalars['String']['output']>;
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
  name?: Maybe<Scalars['String']['output']>;
};

export type CreateProductInputViewModelInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Decimal']['input'];
  shopId?: InputMaybe<Scalars['String']['input']>;
  stockQuantity: Scalars['Int']['input'];
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type CreateServiceInputViewModelInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Decimal']['input'];
  shopId?: InputMaybe<Scalars['String']['input']>;
  stockQuantity: Scalars['Int']['input'];
  unit?: InputMaybe<Scalars['String']['input']>;
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
  nodes?: Maybe<Array<Maybe<BasketItemViewModel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GetBasketItemsEdge = {
  __typename?: 'GetBasketItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<BasketItemViewModel>;
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

export type ItemCommentSortInput = {
  commentString?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  itemId?: InputMaybe<SortEnumType>;
  response?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
};

export type ItemCommentViewModel = {
  __typename?: 'ItemCommentViewModel';
  commentString?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  itemId?: Maybe<Scalars['String']['output']>;
  response?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};

export type ItemCommentViewModelSortInput = {
  commentString?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  itemId?: InputMaybe<SortEnumType>;
  response?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserViewModelSortInput>;
};

export type ItemOrdersViewModel = {
  __typename?: 'ItemOrdersViewModel';
  itemId: Scalars['String']['output'];
  orders: Array<OrderViewModel>;
};

export type ItemRequestOfferViewModel = {
  __typename?: 'ItemRequestOfferViewModel';
  id?: Maybe<Scalars['String']['output']>;
  itemId?: Maybe<Scalars['String']['output']>;
  itemRequestId?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type ItemRequestViewModel = {
  __typename?: 'ItemRequestViewModel';
  categoryId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
};

export type ItemViewModel = {
  __typename?: 'ItemViewModel';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<ItemCommentViewModel>>>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  dateTime: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isProduct: Scalars['Boolean']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferredItems?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  price: Scalars['Decimal']['output'];
  shopId?: Maybe<Scalars['String']['output']>;
  starRating: Scalars['Decimal']['output'];
  stars?: Maybe<Array<Maybe<StarViewModel>>>;
  stockQuantity: Scalars['Int']['output'];
  sub?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};


export type ItemViewModelCommentsArgs = {
  order?: InputMaybe<Array<ItemCommentSortInput>>;
};

export type ListTypeOfItemTypeFilterInput = {
  and?: InputMaybe<Array<ListTypeOfItemTypeFilterInput>>;
  or?: InputMaybe<Array<ListTypeOfItemTypeFilterInput>>;
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
  address: Scalars['String']['output'];
  completionDateTime: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  dateTime: Scalars['DateTime']['output'];
  fullName: Scalars['String']['output'];
  isCompleted: Scalars['Boolean']['output'];
  itemId: Scalars['String']['output'];
  itemName: Scalars['String']['output'];
  message: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  quantity: Scalars['Int']['output'];
  sub: Scalars['String']['output'];
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

export type ProductViewModel = {
  __typename?: 'ProductViewModel';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<ItemCommentViewModel>>>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  dateTime: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isNew: Scalars['Boolean']['output'];
  isProduct: Scalars['Boolean']['output'];
  isUsed: Scalars['Boolean']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferredItems?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  price: Scalars['Decimal']['output'];
  shopId?: Maybe<Scalars['String']['output']>;
  starRating: Scalars['Decimal']['output'];
  stars?: Maybe<Array<Maybe<StarViewModel>>>;
  stockQuantity: Scalars['Int']['output'];
  sub?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};


export type ProductViewModelCommentsArgs = {
  order?: InputMaybe<Array<ItemCommentSortInput>>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addDelivery?: Maybe<Delivery>;
  addItemToBasket?: Maybe<BasketItemViewModel>;
  clearNotifications?: Maybe<Scalars['Int']['output']>;
  commentItem?: Maybe<ItemViewModel>;
  completeOrder?: Maybe<Scalars['String']['output']>;
  createAdvertisement?: Maybe<Scalars['String']['output']>;
  createItemRequest?: Maybe<ItemRequestViewModel>;
  createItemRequestOffer?: Maybe<ItemRequestOfferViewModel>;
  createProduct?: Maybe<ProductViewModel>;
  createService?: Maybe<ServiceViewModel>;
  orderItem?: Maybe<Scalars['String']['output']>;
  removeBasketItem?: Maybe<BasketItemViewModel>;
  removeItem?: Maybe<ItemViewModel>;
  replyItemComment?: Maybe<ItemCommentViewModel>;
  setNotificationIsSeen?: Maybe<Scalars['String']['output']>;
  updateStockQuantity?: Maybe<Scalars['String']['output']>;
};


export type RootMutationAddDeliveryArgs = {
  orderId: Scalars['String']['input'];
};


export type RootMutationAddItemToBasketArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationCommentItemArgs = {
  commentString: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
};


export type RootMutationCompleteOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type RootMutationCreateAdvertisementArgs = {
  itemId: Scalars['String']['input'];
};


export type RootMutationCreateItemRequestArgs = {
  categoryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type RootMutationCreateItemRequestOfferArgs = {
  itemId: Scalars['String']['input'];
  itemRequestId: Scalars['String']['input'];
};


export type RootMutationCreateProductArgs = {
  product: CreateProductInputViewModelInput;
};


export type RootMutationCreateServiceArgs = {
  service: CreateServiceInputViewModelInput;
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
  itemId: Scalars['String']['input'];
};


export type RootMutationRemoveItemArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationReplyItemCommentArgs = {
  commentId: Scalars['String']['input'];
  commentString: Scalars['String']['input'];
};


export type RootMutationSetNotificationIsSeenArgs = {
  notificationId: Scalars['String']['input'];
};


export type RootMutationUpdateStockQuantityArgs = {
  itemId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  getAds?: Maybe<GetAdsConnection>;
  getBasketItems?: Maybe<GetBasketItemsConnection>;
  getBasketItemsCount?: Maybe<Scalars['Int']['output']>;
  getDeliveryPayments?: Maybe<GetDeliveryPaymentsConnection>;
  getItems?: Maybe<GetItemsConnection>;
  getOrders?: Maybe<GetOrdersConnection>;
  getProductCategories?: Maybe<GetProductCategoriesConnection>;
  getPublicItemComments?: Maybe<GetPublicItemCommentsConnection>;
  getPublicItems?: Maybe<GetPublicItemsConnection>;
  getServiceCategories?: Maybe<GetServiceCategoriesConnection>;
  getShopItemOrders?: Maybe<GetShopItemOrdersConnection>;
  getShopOrders?: Maybe<GetShopOrdersConnection>;
  getUser?: Maybe<UserViewModel>;
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
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetDeliveryPaymentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DeliveryPaymentDtoFilterInput>;
};


export type RootQueryGetItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
};


export type RootQueryGetPublicItemCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ItemCommentViewModelSortInput>>;
};


export type RootQueryGetPublicItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  searchString?: InputMaybe<Scalars['String']['input']>;
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

export type RootSubscription = {
  __typename?: 'RootSubscription';
  events?: Maybe<SubscriptionEventOfSubscriptionData>;
};

export type ServiceViewModel = {
  __typename?: 'ServiceViewModel';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<ItemCommentViewModel>>>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  dateTime: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isProduct: Scalars['Boolean']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferredItems?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  price: Scalars['Decimal']['output'];
  shopId?: Maybe<Scalars['String']['output']>;
  starRating: Scalars['Decimal']['output'];
  stars?: Maybe<Array<Maybe<StarViewModel>>>;
  stockQuantity: Scalars['Int']['output'];
  sub?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserViewModel>;
};


export type ServiceViewModelCommentsArgs = {
  order?: InputMaybe<Array<ItemCommentSortInput>>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

export type SubscriptionData = {
  __typename?: 'SubscriptionData';
  itemRequestOfferReceived?: Maybe<ItemRequestOfferViewModel>;
  itemRequestReceived?: Maybe<ItemRequestViewModel>;
  orderReceived?: Maybe<OrderViewModel>;
};

export type SubscriptionEventOfSubscriptionData = {
  __typename?: 'SubscriptionEventOfSubscriptionData';
  data?: Maybe<SubscriptionData>;
  dateTime: Scalars['DateTime']['output'];
  eventName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isSeen: Scalars['Boolean']['output'];
  receiverSub?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<UserViewModel>;
  senderSub?: Maybe<Scalars['String']['output']>;
};

export type UserViewModel = {
  __typename?: 'UserViewModel';
  id?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<ItemViewModel>>>;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};


export type UserViewModelItemsArgs = {
  where?: InputMaybe<ListTypeOfItemTypeFilterInput>;
};

export type UserViewModelSortInput = {
  id?: InputMaybe<SortEnumType>;
  profileImageUrl?: InputMaybe<SortEnumType>;
  sub?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

export type CreateOrderMutationMutationVariables = Exact<{
  fullName: Scalars['String']['input'];
  address: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  message: Scalars['String']['input'];
}>;


export type CreateOrderMutationMutation = { __typename?: 'RootMutation', orderItem?: string | null };

export type AddItemToBasketeMutationMutationVariables = Exact<{
  itemID: Scalars['String']['input'];
}>;


export type AddItemToBasketeMutationMutation = { __typename?: 'RootMutation', addItemToBasket?: { __typename?: 'BasketItemViewModel', id?: string | null } | null };

export type CreateNewProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  description: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  stockQuantity: Scalars['Int']['input'];
  imageUrls: Array<Scalars['String']['input']> | Scalars['String']['input'];
  unit: Scalars['String']['input'];
  location: Scalars['String']['input'];
}>;


export type CreateNewProductMutation = { __typename?: 'RootMutation', createProduct?: { __typename?: 'ProductViewModel', id?: string | null } | null };

export type UpdateStockMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  updatedQuantity: Scalars['Int']['input'];
}>;


export type UpdateStockMutation = { __typename?: 'RootMutation', updateStockQuantity?: string | null };

export type CreateItemRequestMutationMutationVariables = Exact<{
  itemName: Scalars['String']['input'];
  categoryID: Scalars['String']['input'];
}>;


export type CreateItemRequestMutationMutation = { __typename?: 'RootMutation', createItemRequest?: { __typename?: 'ItemRequestViewModel', id?: string | null } | null };

export type CreateItemRequestOfferMutationMutationVariables = Exact<{
  requestId: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
}>;


export type CreateItemRequestOfferMutationMutation = { __typename?: 'RootMutation', createItemRequestOffer?: { __typename?: 'ItemRequestOfferViewModel', id?: string | null } | null };

export type GetBasketItemsQueryQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBasketItemsQueryQuery = { __typename?: 'RootQuery', getBasketItems?: { __typename?: 'GetBasketItemsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges?: Array<{ __typename?: 'GetBasketItemsEdge', node?: { __typename?: 'BasketItemViewModel', id?: string | null, item?: { __typename?: 'ItemViewModel', id?: string | null, name?: string | null, imageUrls?: Array<string | null> | null, price: any, starRating: any, isProduct: boolean } | null } | null }> | null } | null };

export type GetPublicItemsQueryVariables = Exact<{
  endCursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPublicItemsQuery = { __typename?: 'RootQuery', getPublicItems?: { __typename?: 'GetPublicItemsConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean }, edges?: Array<{ __typename?: 'GetPublicItemsEdge', node?: { __typename?: 'ItemViewModel', id?: string | null, name?: string | null, imageUrls?: Array<string | null> | null, price: any, starRating: any } | null }> | null } | null };

export type GetPublicItemsByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPublicItemsByIdQuery = { __typename?: 'RootQuery', getPublicItems?: { __typename?: 'GetPublicItemsConnection', nodes?: Array<{ __typename?: 'ItemViewModel', id?: string | null, name?: string | null, imageUrls?: Array<string | null> | null, price: any, description?: string | null, stockQuantity: number, starRating: any, comments?: Array<{ __typename?: 'ItemCommentViewModel', commentString?: string | null, user?: { __typename?: 'UserViewModel', username?: string | null, profileImageUrl?: string | null } | null } | null> | null } | null> | null } | null };

export type ProductCategoryQueriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoryQueriesQuery = { __typename?: 'RootQuery', getProductCategories?: { __typename?: 'GetProductCategoriesConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, nodes?: Array<{ __typename?: 'Category', id?: string | null, isProduct: boolean, name?: string | null, imageUrl?: string | null } | null> | null } | null };

export type GetAllPersonalItemsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllPersonalItemsQuery = { __typename?: 'RootQuery', getItems?: { __typename?: 'GetItemsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges?: Array<{ __typename?: 'GetItemsEdge', node?: { __typename?: 'ItemViewModel', id?: string | null, name?: string | null, price: any, starRating: any, imageUrls?: Array<string | null> | null, stockQuantity: number, isProduct: boolean, unit?: string | null } | null }> | null } | null };

export type GetPublicItemsBySearchQueryVariables = Exact<{
  searchString?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPublicItemsBySearchQuery = { __typename?: 'RootQuery', getPublicItems?: { __typename?: 'GetPublicItemsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'GetPublicItemsEdge', node?: { __typename?: 'ItemViewModel', name?: string | null, id?: string | null, imageUrls?: Array<string | null> | null, price: any, isProduct: boolean, stockQuantity: number } | null }> | null } | null };

export type GetPrivateItemsBySearchQueryVariables = Exact<{
  searchString?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPrivateItemsBySearchQuery = { __typename?: 'RootQuery', getItems?: { __typename?: 'GetItemsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'GetItemsEdge', node?: { __typename?: 'ItemViewModel', name?: string | null, id?: string | null, imageUrls?: Array<string | null> | null, price: any, isProduct: boolean, stockQuantity: number } | null }> | null } | null };

export type GetLoginUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserQuery = { __typename?: 'RootQuery', getUser?: { __typename?: 'UserViewModel', username?: string | null, profileImageUrl?: string | null } | null };

export type GetDataSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetDataSubscription = { __typename?: 'RootSubscription', events?: { __typename?: 'SubscriptionEventOfSubscriptionData', id?: string | null, eventName?: string | null, sender?: { __typename?: 'UserViewModel', username?: string | null } | null, data?: { __typename?: 'SubscriptionData', itemRequestReceived?: { __typename?: 'ItemRequestViewModel', id?: string | null, name?: string | null, categoryId?: string | null } | null, itemRequestOfferReceived?: { __typename?: 'ItemRequestOfferViewModel', id?: string | null, itemId?: string | null, itemRequestId?: string | null } | null, orderReceived?: { __typename?: 'OrderViewModel', fullName: string, completionDateTime: any, isCompleted: boolean, address: string, message: string, phoneNumber: string, price: any, quantity: number, currency: string, itemName: string, dateTime: any } | null } | null } | null };


export const CreateOrderMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrderMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}]}}]} as unknown as DocumentNode<CreateOrderMutationMutation, CreateOrderMutationMutationVariables>;
export const AddItemToBasketeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addItemToBasketeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItemToBasket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddItemToBasketeMutationMutation, AddItemToBasketeMutationMutationVariables>;
export const CreateNewProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNewProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Decimal"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stockQuantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrls"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"stockQuantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stockQuantity"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageUrls"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrls"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"currencyCode"},"value":{"kind":"StringValue","value":"NPR","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"condition"},"value":{"kind":"StringValue","value":"new","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNewProductMutation, CreateNewProductMutationVariables>;
export const UpdateStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatedQuantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStockQuantity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatedQuantity"}}}]}]}}]} as unknown as DocumentNode<UpdateStockMutation, UpdateStockMutationVariables>;
export const CreateItemRequestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateItemRequestMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItemRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemName"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateItemRequestMutationMutation, CreateItemRequestMutationMutationVariables>;
export const CreateItemRequestOfferMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createItemRequestOfferMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItemRequestOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateItemRequestOfferMutationMutation, CreateItemRequestOfferMutationMutationVariables>;
export const GetBasketItemsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBasketItemsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBasketItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"isProduct"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBasketItemsQueryQuery, GetBasketItemsQueryQueryVariables>;
export const GetPublicItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endCursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicItemsQuery, GetPublicItemsQueryVariables>;
export const GetPublicItemsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicItemsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"stockQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentString"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicItemsByIdQuery, GetPublicItemsByIdQueryVariables>;
export const ProductCategoryQueriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productCategoryQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isProduct"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ProductCategoryQueriesQuery, ProductCategoryQueriesQueryVariables>;
export const GetAllPersonalItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPersonalItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"starRating"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"stockQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"isProduct"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPersonalItemsQuery, GetAllPersonalItemsQueryVariables>;
export const GetPublicItemsBySearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicItemsBySearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isProduct"}},{"kind":"Field","name":{"kind":"Name","value":"stockQuantity"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicItemsBySearchQuery, GetPublicItemsBySearchQueryVariables>;
export const GetPrivateItemsBySearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPrivateItemsBySearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isProduct"}},{"kind":"Field","name":{"kind":"Name","value":"stockQuantity"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPrivateItemsBySearchQuery, GetPrivateItemsBySearchQueryVariables>;
export const GetLoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLoginUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]} as unknown as DocumentNode<GetLoginUserQuery, GetLoginUserQueryVariables>;
export const GetDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"GetData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemRequestReceived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemRequestOfferReceived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemRequestId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderReceived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"completionDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"itemName"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDataSubscription, GetDataSubscriptionVariables>;