import {API_ENDPOINT} from "@framework/endpoints";
import http from "@framework/http";
import {useMutation} from "@tanstack/react-query";
import {registerSchema} from "@utils/types";
import axios from "axios";
import {z} from "zod";

interface apiResponse {
  data: any;
  success: Boolean;
  message: string;
}

async function register(
  payload: z.infer<typeof registerSchema>,
): Promise<apiResponse> {
  const {data} = await http.post(API_ENDPOINT.AUTH.REGISTER, payload);

  return data;
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};
