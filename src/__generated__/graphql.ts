/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Location = {
  __typename?: 'Location';
  /** A short description about the location */
  description: Scalars['String'];
  id: Scalars['ID'];
  /** The name of the location */
  name: Scalars['String'];
  /** The calculated overall rating based on all reviews */
  overallRating?: Maybe<Scalars['Float']>;
  /** The location's main photo as a URL */
  photo: Scalars['String'];
  /** All submitted reviews about this location */
  reviewsForLocation: Array<Maybe<Review>>;
};

export type LocationReviewInput = {
  /** Written text */
  comment: Scalars['String'];
  /** Location Id */
  locationId: Scalars['String'];
  /** A number from 1 - 5 with 1 being lowest and 5 being highest */
  rating: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  submitReview?: Maybe<SubmitReviewResponse>;
};


export type MutationSubmitReviewArgs = {
  locationReview: LocationReviewInput;
};

export type Query = {
  __typename?: 'Query';
  /** The three latest reviews submitted for FlyBy's locations */
  latestReviews: Array<Review>;
  /** The details of a specific location */
  location?: Maybe<Location>;
  /** The full list of locations presented by the Interplanetary Space Tourism department */
  locations: Array<Location>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};

export type Review = {
  __typename?: 'Review';
  /** Written text */
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The location the review is about */
  location?: Maybe<Location>;
  /** A number from 1 - 5 with 1 being lowest and 5 being highest */
  rating?: Maybe<Scalars['Int']>;
};

export type SubmitReviewResponse = {
  __typename?: 'SubmitReviewResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** Newly created review */
  locationReview?: Maybe<Review>;
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
};

export type LocationQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationQueryQuery = { __typename?: 'Query', locations: Array<{ __typename?: 'Location', id: string }> };


export const LocationQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LocationQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LocationQueryQuery, LocationQueryQueryVariables>;