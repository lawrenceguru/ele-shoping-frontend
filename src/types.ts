// Flash Messages and Validation Message

export type FlashMessageVariables = {
  notice?: string | null;
  error?: string | null;
};

export type FlashMessage = {
  type: string;
  text: string;
};

export type FlashMessageData = {
  message: FlashMessage;
};

export type ValidationMessage = {
  __typename: 'ValidationMessage';
  field: string;
  message: string;
};


// Location Details

export type LocationDetailsVariables = {
  postalCode: string;
};

export type LocationDetailsData = {
  locationDetails: {
    postalCode: string;
    placeName: string;
    stateCode: string;
    latitude: string;
    longitude: string;
  }
}

// User Authentication

export type UserForEditingFragment = {
  __typename: 'User';
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  gravatarMd5: string;
  email: string;
  postalCode: string;
  primaryPhone: string;
  insertedAt: string;
};

export type User = {
  __typename: 'User';
  id: string;
  firstName: string;
  lastName: string;
  gravatarMd5: string;
  userName: string;
  email: string;
};

export type UserVariables = {
  id: string;
};

export type UserDetails = {
  userDetails : {
  __typename: 'userDetails';
  id: string;
  gravatarMd5: string;
  userName: string;
  firstName: string;
  insertedAt: string;
  lastName: string;
  email: string;
  }
}

export type RevokeTokenData = {
  revokeToken: {
    errors: any;
  };
};

export type SignInVariables = {
  email: string;
  // password: string;
};

export type SignInData = {
  signIn: {
    // __typename: 'SessionPayload';
    // result: {
    //   __typename: 'Session';
    //   token: string;
    //   profileCompleted: boolean;
    // } | null;
    __typename: 'UserPayload';
    user: UserForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CancelAccountData = {
  cancelAccount: {
    errors: any;
  };
};

export type ChangePasswordVariables = {
  password: string;
  passwordConfirmation: string;
  currentPassword: string;
};

export type ChangePasswordData = {
  changePassword: {
    __typename: 'UserPayload';
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CurrentUserData = {
  currentUser: User | null;
};

export type SignUpVariables = {
  firstName: string;
  lastName: string;
  email: string;
  // password: string;
  // passwordConfirmation: string;
};

export type SignUpData = {
  signUp: {
    __typename: 'UserPayload';
    user: UserForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type UpdateUserVariables = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};

export type UpdateUserData = {
  updateUser: {
    __typename: 'UserPayload';
    user: UserForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type ConfirmAccountVariables = {
  email: string;
  code: string;
};

export type ConfirmAccountData = {
  confirmAccount: {
    __typename: 'SessionPayload';
    result: {
      __typename: 'Session';
      token: string;
      profileCompleted: boolean;
    } | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type ResendConfirmationVariables = {
  email: string;
};

export type ResendConfirmationData = {
  resendConfirmation: {
    __typename: 'BooleanPayload';
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type GetUserForEditingData = {
  // Fetch the current user
  currentUser: UserForEditingFragment | null;
};

// Comments

export type CreateCommentVariables = {
  recipeId: string;
  receiverId: string;
  body: string;
};

export type CreateCommentData = {
  createComment: {
    __typename: 'CommentPayload';
    newComment: CommentFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CommentFragment = {
  __typename: 'Comment';
  id: string;
  body: string;
  insertedAt: string;
  sender: UserForEditingFragment | null;
  receiver: UserForEditingFragment | null;
  recipe: RecipeFragment |null;
};


// Messages

export type ContactVariables = {
  senderId: string | null;
  limit?: number | null;
  offset?: number | null;
};

export type ContactsData = {
  userContacts: Array<ContactFragment> | null;
};

export type ContactFragment = {
  __typename: 'Contact';
  id: string;
  insertedAt: string;
  senderId: string;
  sender: UserForEditingFragment | null;
  receiverId: string;
  receiver: UserForEditingFragment | null;
  listingId: string;
  listing: ListingPreviewFragment;
}

export type MessagesVariables = {
  senderId: string | null;
  receiverId: string | null;
  listingId: string | null;
  limit?: number | null;
  offset?: number | null;
};

export type MessagesData = {
  userMessages: Array<MessageFragment> | null;
};

export type MessageFragment = {
  __typename: 'Message';
  id: string;
  insertedAt: string;
  body: string;
  sender: UserForEditingFragment | null;
  receiver: UserForEditingFragment | null;
  listing: ListingPreviewFragment | null;
}

export type CreateMessageVariables = {
  receiverId: string;
  listingId: string;
  body: string;
};

export type CreateMessageData = {
  createMessage: {
    __typename: 'MessagePayload';
    newMessage: MessageFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};


// Favorites

export type IsFavoriteVariables = {
  userId: string | null;
  listingId: string | null;
}

export type IsFavoriteData = {
  isFavorite: FavoriteFragment | null;
}


export type FavoritesVariables = {
  userId: string | null;
  limit?: number | null;
  offset?: number | null;
};

export type FavoritesData = {
  userFavorites: Array<FavoriteFragment> | null;
};

export type FavoriteFragment = {
  __typename: 'Favorite';
  id: string;
  status: string;
  insertedAt: string;
  listingId: string;
  userId: string;
  listing: ListingPreviewFragment;
}

export type CreateFavoriteVariables = {
  listingId: string;
};

export type CreateFavoriteData = {
  createFavorite: {
    __typename: 'FavoritePayload';
    newFavorite: FavoriteFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type RemoveFavoriteVariables = {
  favoriteId: string;
};

export type RemoveFavoriteData = {
  removeFavorite: {
    __typename: 'FavoritePayload';
    favorite: {
      __typename: 'Favorite';
      id: string;
    };
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type FavoritePreviewFragment = {
  __typename: 'Favorite';
  id: string;
  listingId: string;
  status: string;
  userId: string;
  user: UserForEditingFragment | null;
  listing: ListingPreviewFragment;
};

// Recipes

export type CreateRecipeVariables = {
  title: string;
  content: string;
  totalTime: string;
  level: string;
  budget: string;
  image?: string;
};

export type CreateRecipeData = {
  createRecipe: {
    __typename: 'RecipePayload';
    newRecipe: RecipeForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type DeleteRecipeVariables = {
  id: string;
};

export type DeleteRecipeData = {
  deleteRecipe: {
    __typename: 'RecipePayload';
    recipe: {
      __typename: 'Recipe';
      id: string;
    };
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type RecipeForEditingVariables = {
  id: string;
};

export type RecipeForEditingData = {
  recipe: RecipeForEditingFragment | null;
};

export type RecipeOptionsData = {
  totalTimeOptions: Array<{
    __typename: 'Option';
    label: string;
    value: string;
  }> | null;
  levelOptions: Array<{
    __typename: 'Option';
    label: string;
    value: string;
  }> | null;
  budgetOptions: Array<{
    __typename: 'Option';
    label: string;
    value: string;
  }> | null;
};

export type RecipeVariables = {
  id: string;
};

export type RecipeData = {
  recipe: RecipeFragment | null;
};

export type RecipeWithDefaultValueData = {
  recipeWithDefaultValue: {
    __typename: 'Recipe';
    totalTime: string;
    level: string;
    budget: string;
  } | null;
};

export type RecipesVariables = {
  offset?: number | null;
  keywords?: string | null;
};

export type RecipesData = {
  recipesCount: number;
  recipes: Array<RecipePreviewFragment> | null;
};

export type UpdateRecipeVariables = {
  id: string;
  title?: string | null;
  content?: string | null;
  totalTime?: string | null;
  level?: string | null;
  budget?: string | null;
  removeImage?: boolean | null;
  image?: string[] | null;
};

export type UpdateRecipeData = {
  updateRecipe: {
    __typename: 'RecipePayload';
    recipe: RecipeForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type RecipeForEditingFragment = {
  __typename: 'Recipe';
  id: string;
  title: string;
  content: string;
  description: string;
  totalTime: string;
  level: string;
  budget: string;
  image_url: string | null;
};

export type RecipeFragment = {
  __typename: 'Recipe';
  id: string;
  title: string;
  content: string;
  description: string;
  totalTime: string;
  level: string;
  budget: string;
  image_url: string;
  insertedAt: string;
  author: UserForEditingFragment | null;
  comments: Array<CommentFragment>;
};

export type RecipePreviewFragment = {
  __typename: 'Recipe';
  id: string;
  title: string;
  description: string;
  totalTime: string;
  level: string;
  budget: string;
  image_url?: string | null;
  author: UserForEditingFragment | null;
};

export type ReviewsVariables = {
  userId: string | null;
  limit?: number | null;
  offset?: number | null;
};

export type ReviewsData = {
  userReviewStats: ReviewStatsFragment | null;
  userReviews: Array<ReviewFragment> | null;
};

export type ReviewStatsFragment = {
  _typename: 'UserReviewStats';
  totalReviews: number;
  averageReview: number;
}

export type ReviewFragment = {
  __typename: 'Review';
  id: string;
  body: string;
  rating: number;
  insertedAt: string;
  author: UserForEditingFragment | null;
};


// Listings 

export type CreateListingVariables = {
  title: string;
  description: string;
  pricePerUnit: string;
  noOfUnits: string;
  condition: string;
  category: string;
  location: string;
  image?: string;
};

export type CreateListingData = {
  createListing: {
    __typename: 'ListingPayload';
    newListing: ListingForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};


export type DeleteListingVariables = {
  id: string;
};

export type DeleteListingData = {
  deleteListing: {
    __typename: 'ListingPayload';
    listing: {
      __typename: 'Listing';
      id: string;
    };
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type ListingForEditingVariables = {
  id: string;
};

export type ListingForEditingData = {
  listing: ListingForEditingFragment | null;
};

export type ListingOptionsData = {
  categoryOptions: Array<{
    __typename: 'Option';
    label: string;
    group: string;
    value: string;
    children: string;
  }> | null;
  conditionOptions: Array<{
    __typename: 'Option';
    label: string;
    value: string;
  }> | null;
};

export type ListingVariables = {
  id: string;
};

export type ListingData = {
  listing: ListingFragment | null;
};

export type ListingWithDefaultValueData = {
  listingWithDefaultValue: {
    __typename: 'Listing';
    category: string;
    condition: string;
  } | null;
};

export type ListingsData = {
  listings: Array<ListingPreviewFragment> | null;
};

export type ListingsVariables = {
  limit?: number | null;
  offset?: number | null;
  keywords?: string | null;
};

export type SearchListingsData = {
  searchListings: Array<ListingPreviewFragment> | null;
};

export type SearchListingsVariables = {
  limit?: number | null;
  offset?: number | null;
  category?: string | null;
  condition?: string | null;
  location?: string | null;
  radius?: string | null;
  price_from?: number | null;
  price_to?: number | null;
};

export type RelatedListingVariables = {
  listingId: string | null;
  category: string | null;
  location: string | null;
};

export type RelatedListingsData = {
  relatedListings: Array<ListingPreviewFragment> | null;
};

export type UserListingVariables = {
  limit?: number | null;
  offset?: number | null;
  userId: string | null;
};

export type UserListingsData = {
  userListings: Array<ListingPreviewFragment> | null;
};

export type UpdateListingVariables = {
  id: string;
  title?: string | null;
  description?: string | null;
  pricePerUnit?: string | null;
  noOfUnits?: string | null;
  firmOnPrice?: string | null;
  location?: string | null;
  removeImage?: boolean | null;
  image?: string | null;
};

export type UpdateListingData = {
  updateListing: {
    __typename: 'ListingPayload';
    listing: ListingForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};


export type ListingForEditingFragment = {
  __typename: 'Listing';
  id: string;
  title: string;
  description: string;
  pricePerUnit: string;
  noOfUnits: string;
  location: string;
  condition: string;
  category: string;
  photoUrls: Array<string> | null;
};

export type ChangeListingVariables = {
  id: string;
  status: string;
};

export type ChangeListingData = {
    changeListing: {
    __typename: 'ListingPayload';
    listing: ListingForChangeFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type ListingForChangeFragment = {
  __typename: 'Listing';
  id: string;
  title: string;
  description: string;
  pricePerUnit: string;
  noOfUnits: string;
  location: string;
  condition: string;
  category: string;
  photoUrls: Array<string> | null;
  status: string;
};


export type ListingFragment = {
  __typename: 'Listing';
  id: string;
  title: string;
  description: string;
  pricePerUnit: string;
  noOfUnits: string;
  condition: string;
  conditionDescription: string;
  location: string;
  locationDetails: LocationDetailsFragment;
  category: string;
  categoryDescription: string;
  insertedAt: string;  
  status: string;
  photoUrls: Array<string>;
  owner: UserForEditingFragment | null;
};

export type ListingPreviewFragment = {
  __typename: 'Listing';
  id: string;
  title: string;
  description: string;
  pricePerUnit: number;
  noOfUnits: string;
  condition: string;
  category: string;
  location: string;
  locationDetails: LocationDetailsFragment;
  insertedAt: string;
  photoUrls: Array<string>;
  status: string;
  ownerId: string;
};

export type LocationDetailsFragment = {
  _typename: "LocationDetails";
  placeName: string;
  stateCode: string;
  latitude: number;
  longitude: number;
}