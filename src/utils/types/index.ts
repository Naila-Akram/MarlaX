import {z} from "zod";

export * from "./forms";
export * from "./schema";
export * from "./navigation";

export enum OTP_TYPE {
  LOGIN = "login_otp",
  REGISTER = "register_otp",
  FORGOT_PASSWORD = "forgot_password_otp",
}

export type OptionType = {
  label: string;
  value: number;
};

export const mediaType = z.object({
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
});
export type ScreenTypes =
  | "latest"
  | "recommended"
  | "types"
  | "brands"
  | "closet"
  | "tryons";

export type Visibility = "public" | "private";
