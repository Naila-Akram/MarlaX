import {ColorValue} from "react-native";
import {Visibility} from ".";

export type User = {
  avatar: string | null;
  country: string | null;
  country_id: number | null;
  city: string | null;
  city_id: number | null;
  created_at: Date;
  dob: Date | null;
  email: string;
  email_verified_at: Date;
  firebase_device_token: string | null;
  gender: string | null;
  gender_id: number | null;
  id: number;
  is_active: boolean;
  languages: string | null;
  name: string;
  phone: string | null;
  provider_id: string | null;
  provider_name: string | null;
  registered_via: string | null;
  summary: string | null;
  token: string;
  token_expires_at: string;
  rememberMe?: boolean;
  updated_at: Date;
  facebook_link: string | null;
  instagram_link: string | null;
  snapchat_link: string | null;
  thumbnail: string | null;
  thumbnail_path: string | null;
  profile_picture: string | null;
  next_mood_assessment_at?: Date;
  user_profile_picture_path: string | null;
  user_profile_picture: string | null;
  tryon_image_side: string;
  tryon_image_front: string;
  register?: boolean;
  weight?: string;
  height?: string;
  visibility?: string;
  userName?: string;
  tutorial: boolean;
};
export interface EventsData {
  id: number;
  title: string;
  description: string;
  created_at: string; // Use Date if you prefer
  updated_at: string;
  // Add any other properties you expect
}

export type UserChatData = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  user_profile_picture_path: string | null;
  user_profile_picture: string | null;
};

export type UpdatedUser = User & {
  city_id: number | null;
  dob: Date | null;
  email: string;
  facebook_link: string | null;
  gender_id: number | null;
  id: number;
  instagram_link: string | null;
  name: string;
  phone: string | null;
  snapchat_link: string | null;
};
export type UpdatedProfile = User & {
  // city_id: number | null;
  // dob: Date | null;
  // email: string;
  // facebook_link: string | null;
  // gender_id: number | null;
  // id: number;
  // instagram_link: string | null;
  // name: string;
  // phone: string | null;
  // snapchat_link: string | null;
  userName: string | null;
  frontImage: string | null;
  sideImage: string | null;
  userWeight: number | null;
  userheight: number | null;
};

export type ProductImage = {
  featured: boolean;
  id: number;
  image_url: string;
  name: string;
};

export type Product = {
  brand_id: number;
  category_id: number;
  created_at: Date;
  description: string | null;
  id: number;
  name: string;
  price: number;
  website_url: string | null;
  images: ProductImage[];
  store_id: number;
  status_id: string;
  type_id: string;
  thumbnail_path: string;
  updated_at: Date;
};

export type ProductDetail = Product & {
  reviews: {
    created_at: Date;
    id: number;
    product_id: number;
    review: string;
    star_rating: number;
    title: string;
    updated_at: Date;
    user_avatar: string | null;
    user_id: number;
    user_name: string;
  }[];
  sizes: {
    created_at: Date;
    description: string;
    id: number;
    name: string;
    updated_at: Date;
  }[];
  colors: {
    created_at: Date;
    description: string;
    id: number;
    name: string;
    updated_at: Date;
    value: ColorValue;
  }[];
};

export type Type = {
  created_at: Date;
  description: string;
  id: number;
  name: string;
  thumbnail: string | null;
  thumbnail_path: string | null;
  updated_at: Date;
};

export type Brand = {
  created_at: Date;
  description: string | null;
  id: number;
  name: string;
  thumbnail: string | null;
  thumbnail_path: string;
  updated_at: Date;
};

export type ScanModalData = {
  created_at: Date;
  file_name: string;
  id: number;
};

export type IndividualClosetItem = {
  id: number;
  closet_id: number;
  image_path: string;
  created_at: Date;
  updated_at: Date;
  product_id: number | null;
  latitude: string;
  longitude: string;
  user_upload_product_id: number | null;
  visibility: Visibility;
};

export type ClosetItem = {
  category_id: number | null;
  closet_id: number;
  id: number;
  image_name: string | null;
  image_path: string;
  visibility: string;
  is_purchased: boolean | null;
  latitude: string;
  longitude: string;
  product: {
    brand_id: number;
    category_id: number;
    created_at: Date;
    description: string | null;
    id: number;
    user_id: number;
    name: string;
    image_url: string | null;
    price: number;
    status_id: string;
    store_id: number;
    type_id: number;
    updated_at: Date;
    website_url: string | null;
  };
  product_id: string;
  type_id: number | null;
};

export type Closet = {
  category_id: number;
  type_id: number;
  image_path: string;

  visibility: string;
  closet_item: ClosetItem[];
  created_at: Date;
  id: number;
  name: string;
  updated_at: Date;
};

export type ClosetItemType = {
  category: number;
  images: ClosetItem[];
  created_at: Date;
  id: number;
  name: string;
  type: number;
  updated_at: Date;
};

export type CreatedCloset = {
  category_id: number | null;
  created_at: Date;
  id: number;
  name: string;
  type_id: number | null;
  updated_at: Date;
  user_id: number;
};

export type Friend = {
  id: number;
  user_id: number;
  friend_user_id: number;
  created_at: Date;
  blocked_user: {
    avatar: string;
    name: string;
  };
  email: string;
  friend: {
    id: number;
    name: string;
    user_profile_picture: string | undefined;
  };
};

export type BlockedUser = {
  id: number;
  status_id: number;
  created_at: Date;
  email: string;
  blocked_user: {
    id: number;
    name: string;
    avatar: string | undefined | null;
  };
};

export type Post = {
  content_url: string | null;
  created_at: Date;
  description: string | null;
  thumbnail_url: string | null;
  id: number;
  status: Visibility;
  title: string | null;
  type: "post";
  updated_at: Date;
  user_id: number;
};

export type Story = {
  content_url: string;
  created_at: Date;
  description: string | null;
  id: number;
  status: Visibility;
  thumbnail_url: string | null;
  title: string | null;
  type: "stories";
  updated_at: Date;
  user_id: number;
};

export type Category = {
  created_at: Date;
  id: number;
  is_active: boolean;
  name: string;
  parent_id: number | null;
  slug: string | null;
  type: string | null;
  updated_at: Date;
};

export type Country = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
};

export type Gender = {
  id: number;
  name: string;
  slug: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type Tickets = {
  id: number;
  user_id: number;
  subject: string;
  description: string;
  category_id: number;
  assigned_user_id: number;
  resolved_by: number;
  resolution_message: string;
  internal_memo: number;
  created_at: string;
  updated_at: string;
  status: string;
  priority: string;
};

export type Friends_Chat = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export type Notification = {
  id: string;
  user: {
    avatar: string;
    name: string;
  };
  action: string;
  description?: string;
  timestamp: string;
  dateGroup: string;
  image?: string;
  buttons?: {label: string; type: "primary" | "secondary"}[];
  data: {
    friend_request_id?: number;
    message: string;
    post_id: number;
    subject: string;
    type: string;
    user_id: number;
    user_name: string;
    post_url?: string;
    profile_picture?: string | null;
  };
  request_status?: string;
  read_at?: string | Date;
};
