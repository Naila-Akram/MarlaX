// export const BASE_URL = "https://cubby.byibex.com/api/";
export const BASE_URL = "https://studio.cubby.online/api/";
export const Stoarge_URL = "https://cubby.byibex.com/storage/";
export const webClientId =
  "450216423626-st5ae21igktng360cg5vh0qu5q21m4g5.apps.googleusercontent.com";

// export const TRY_ON_BASE_URL = "https://tryon.cubby.online/";
export const TRY_ON_BASE_URL = "https://ppj35jz1gin4ka-80.proxy.runpod.net/";

export const API_ENDPOINT = {
  AUTH: {
    LOGIN: "login",
    FCM_REGISTER: "user/notification-tokens",

    REFRESH_TOKEN: "refresh-token",

    GOOGLE_LOGIN: "auth/sso/google/callback",

    LOGIN_FACEBOOK: "auth/sso/facebook/callback?code=",

    LOGIN_APPLE: "auth/sso/apple/callback?code=",

    LOGIN_VERIFY_OTP: "login-verify-otp",
    REGISTER: "register",
    REGISTER_VERIFY_OTP: "register-verify-otp",
    FORGET_PASSWORD: "forgot-password/request",
    FORGET_PASSWORD_OTP_VERIFY: "otp-verify",
    SEND_OTP: "otp-regenerate",
    RESET_PASSWORD: "forgot-password/reset",
    ADD_TEMP_FILES: "user/temp-files",
    LOGIN_FINGERPRINT: "/auth/fingerprint",
    ADD_FINGERPRINT: "user/authentication-methods/fingerprint",
    REMOVE_FINGERPRINT: "user/authentication-methods?identifier=",
    VERIFY_PASSWORD: "verify-password",
  },
  PRODUCTS: {
    SEARCH_PRODUCT: "products/search",
    GET_PRODUCTS: "get-products",
    GET_RECOMMENDED_PRODUCTS: "user/recommendations/products",
    CREATE_PRODUCT: "user/uploadedproduct/create",
    SEARCH_PRODUCT_BY_BRAND: "products/searchbybrand",
    SEARCH_PRODUCT_BY_TYPE: "products/searchbytype",
  },
  CATEGORIES: {
    GET_CATEGORIES: "get-categories",
  },
  TYPES: {
    GET_TYPES: "get-types",
    GET_SUB_TYPES: "get-sub-type",
  },
  BRANDS: {
    GET_BRANDS: "get-brands",
  },
  GET_ALL_BY_INPUT: "create-product",
  CLOSETS: {
    SEARCH_CLOSET: "closet",
    GET_CLOSETS: "closet",
    CREATE_CLOSET: "closet/create",
    ADD_ITEM: "closets/add/items",
    GET_CLOSET_ITEMS: "closets/items",
    GET_TRYON_CLOSET_ITEMS: "closets/items",
    DELETE_CLOSET_ITEMS: "closets/items/delete",
    Dete_Closet: "closet/deleteIds",
    SCAN_APPAREL: "scan-apparel",
  },
  FRIENDS: {
    GET_FRIENDS: "user/friends/list",
    GET_FRIEND_REQUESTS: "user/friend-requests/list",
    GET_BLOCKED_USERS: "user/blocked-users/list",
    SENT_FRIEND_REQUEST: "user/friend-requests/add",
    ACCEPT_FRIEND_REQUEST: "user/friend-requests",
    DENY_FRIEND_REQUEST: "user/friend-requests/deny",
    CANCEL_FRIEND_REQUEST: "user/friend-requests",
    BLOCK_USER: "user/blocked-users/block",
    UNBLOCK_USER: "user/blocked-users",
    UNFRIEND: "user/friends",
    FOLLOWUSER: "user/followed/users",
  },
  USER: {
    GET_PROFILE: "user/profile/show",
    UPDATE_PROFILE: "user/profile/update",
    UPDATE_AVATAR: "user/profile/store/avatar",
    USER_PREFERENCES: "user/preferences",
    UPDATE_PASSWORD: "user/update/password",
    SEARCH_USER: "user/profile/search",
    DELETE_ACCOUNT: "user/delete",
    UPDATE_PREFERENCES: "user/preferences",
  },
  POSTS: {
    GET_POSTS: "user/post",
    CREATE_POST: "user/post/create",
    GET_STORIES: "user/story",
    LIKE_UNLIKE_POSTS: "liked-post",
    DELETE_POSTS: "user",
    MULTI_DELETE_POSTS: "post/multidelete",
    POST_DETAILS: "user/post",
    DELETE_POST_STORY: "user/",
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: "user/notifications",
    READ_NOTIFICATIONS: "user/notifications",
  },
  NEWSFEED: {
    GET_NEWS_FEED: "user/feed",
  },
  CHATS: {
    CHAT_SEEN: "user/chat/private",
    CHAT_LISTING: "user/chat",
    CHAT_DETAIL: "user/chat/friend",
    SENT_CHAT_MESSAGE: "user/chat",
    DELETE_CHAT: "user/chat",
  },
  TICKETS: {
    CREATE_TICKET: "ticket/store",
    TICKET_LISTING: "ticket/index",
    TICKET_CONVERSATION: "user/support-tickets",
    SEND_TICKET_MESSAGE: "user/support-tickets/",
  },
  SUPPORT: {
    BOT_SUPPORT: "support",
    CONTACT_US: "support/contact-us",
    REPORT_QUESTIONS: "support/complaints/categories",
    REPORT_USER: "/support/complaints",
  },

  STORIES: {
    GET_MY_STORIES: "user/story",
    GET_STORIES: "get-stories",
    SEEN_STORY: "view-story",
  },
  MISCELLANEOUS: {
    COUNTRIES: "country/list",
    CITIES: "city/list/",
    GENDERS: "get-genders",
  },
  USER_MODAL: {
    POST_IMAGES: "user/temp-files",
  },
  Calender: {
    GET_EVENTS: "schedule",
    CREATE_SCHEDULE: "schedule-create",
    GET_SCHEDULE_BY_ID: "schedule/",
    UPDATE_EVENT: "schedule/",
    DELETE_IMAGE: "schedules/",
    SHARE: "schedule-share",
  },
  MOOD_ASSESSMENT: {
    GET_MOOD_ASSESSMENT: "mood-assessment",
    ADD_MOOD_ASSESSMENT: "mood-assessment/response",
  },
  Reviews: {
    ADD_REVIEW: "product/review",
  },
  AVATAR: {
    CREATE_AVATAR: "create-avatar",
  },
  TRYON: {
    TRY_ON: "tryon",
    TRY_ON_TASK: "tryon/task",
  },
};
