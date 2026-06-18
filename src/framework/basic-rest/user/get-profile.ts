import {API_ENDPOINT} from "@framework/endpoints";
import http from "@framework/http";
import {useQuery} from "@tanstack/react-query";

async function getProfile(id?: number) {
  const {data} = await http.get(`${API_ENDPOINT.USER.GET_PROFILE}?id=${id}`);
  return data;
}

export const useGetProfileQuery = (id?: number) => {
  return useQuery({
    queryKey: [API_ENDPOINT.USER.GET_PROFILE],
    queryFn: () => getProfile(id),
  });
};
