import {z} from "zod";
import {loginSchema} from "@utils/types";
import http from "@framework/http";
import {API_ENDPOINT} from "@framework/endpoints";
import {useMutation} from "@tanstack/react-query";

type ResponseType = {
  data: any;
  message: string;
  success: boolean;
};
async function login(
  input: z.infer<typeof loginSchema>,
): Promise<ResponseType> {
  const {data} = await http.post(API_ENDPOINT.AUTH.LOGIN, input);
  return data;
}
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
