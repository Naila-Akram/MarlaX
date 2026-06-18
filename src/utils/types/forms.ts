import {z} from "zod";
import {mediaType} from ".";

export const loginSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});
export const refreshTokenSchema = z.object({
  token: z.string().min(1, "reconnecting..."),
});

export const verificationSchema = z.object({
  otp: z.string().min(5, "Please enter valid OTP"),
  email: z.string().min(1, "Email is required"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Please enter your name")
      .regex(/^[a-zA-Z\s]+$/, "Please enter a valid name")
      .refine(val => val.trim().split(/\s+/).length >= 2, {
        message: "Please enter both first and last name",
      }),
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("Please enter a valid email"),
    dob: z.date().nullable().optional(),
    isAgree: z.boolean(),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    password_confirmation: z
      .string()
      .min(1, "Password Confirmation is required"),
  })
  .refine(data => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export const forgetPassowrdSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter valid email"),
});

export const newPasswordSchema = z
  .object({
    email: z.string(),
    new_password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    token: z.string().min(1, "Token Invalid"),
    new_password_confirmation: z
      .string()
      .min(1, "Password Confirmation is required"),
  })
  .refine(data => data.new_password === data.new_password_confirmation, {
    path: ["new_password_confirmation"],
    message: "Passwords do not match",
  });

export const loggedInResetPasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old Password is required"),
    new_password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    new_password_confirmation: z
      .string()
      .min(1, "Password Confirmation is required"),
  })
  .refine(data => data.new_password === data.new_password_confirmation, {
    path: ["new_password_confirmation"],
    message: "Passwords do not match",
  });

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name")
    .regex(/^[a-zA-Z\s]+$/, "Please enter valid name"),

  phone: z.string().nullable().optional(),
  gender_id: z.number().nullable().optional(),
  dob: z.union([
    z.date().optional().nullable(),
    z.string().optional().nullable(),
  ]),

  country_id: z.number().nullable().optional(),
  city_id: z.number().nullable().optional(),
  facebook_link: z
    .string()
    .nullable()
    .optional()
    .refine(
      url =>
        !url || (url.startsWith("https://") && url.includes("facebook.com")),
      {
        message: "Please enter a valid Facebook URL",
      },
    ),

  instagram_link: z
    .string()
    .nullable()
    .optional()
    .refine(
      url =>
        !url || (url.startsWith("https://") && url.includes("instagram.com")),
      {
        message: "Please enter a valid Instagram URL",
      },
    ),

  snapchat_link: z
    .string()
    .nullable()
    .optional()
    .refine(
      url =>
        !url || (url.startsWith("https://") && url.includes("snapchat.com")),
      {
        message: "Please enter a valid Snapchat URL",
      },
    ),
  frontImage: z.string().nullable().optional(),
  sideImage: z.string().nullable().optional(),
  weight: z.string().nullable().optional(),
  height: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
});

export const ProfileSchema = z.object({
  tryon_image_front: z.number().nullable(),
});

export const ContactUsSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name")
    .regex(/^[a-zA-Z\s]+$/, "Please enter valid name"),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter valid email"),
  message: z.string().min(1, "Please enter message"),
});

export const userModalSchema = z.object({
  frontImage: z.string().nullable().optional(),
  sideImage: z.string().nullable().optional(),
});

export const updateAvatarSchema = z.object({
  thumbnail: z
    .object({
      uri: z.string(),
      type: z.enum(["image/jpeg", "image/jpg", "image/png"]),
    })
    .nullable(),
});

export const ticketSchema = z.object({
  subject: z.string().min(1, "Please enter the subject"),
  description: z.string().min(1, "Please enter the description"),
  filename: z
    .array(
      z.object({
        base64: z.string().optional(),
        uri: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        originalPath: z.string().optional(),
        fileSize: z.number().optional(),
        type: z.string().optional(),
        fileName: z.string().optional(),
        duration: z.number().optional(),
        bitrate: z.number().optional(),
        timestamp: z.string().optional(),
        id: z.string().optional(),
      }),
    )
    .optional()
    .nullable(),
});

export const storySchema = z.object({
  title: z.string(),
  type: z.string(),
  status: z.literal("public"),
  file: mediaType,
  thumbnail: z.string(),
});

export const createClosetSchema = z.object({
  name: z.string().min(1, "Please enter name of the closet"),
  category_id: z.number().optional(),
  type_id: z.number().optional(),
  visibility: z.enum(["public", "private"]).optional(),
});
export const neweClosetSchema = z.object({
  name: z.string().min(1, "Please enter name of the closet"),
  icon_image_id: z.string().optional(),
  visibility: z.enum(["public", "private"]) || undefined || null,
});

export const addClosetItemSchema = z.object({
  closet_id: z.number().nullable(),
  closet_url: z.string().optional(),
  product_id: z.number().optional(),
  user_upload_product_id: z.number().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  is_purchased: z.boolean().optional(),
  visibility: z.enum(["public", "private"], {
    required_error: "Please select a visibility type",
  }),
});

export const addProductDetailsSchema = z
  .object({
    name: z.string().min(1, "Please write name of the product"),
    type_id: z.number().min(1, "Please select atleast one"),
    sub_type_id: z.number().min(1, "Please select atleast one"),
    category_id: z.number().optional(),
    description: z.string(),
    image_token: z.number().min(1, "Please upload product image"),
    brand_id: z.number().nullable().optional(),
  })
  .refine(data => data?.type_id > 0, {
    path: ["type"],
    message: "Please select atleast one",
  });
export const createPostSchema = z.object({
  email: z.string().min(1, "Please enter your email or phone"),
  password: z.string().min(1, "Please enter your password"),
});
