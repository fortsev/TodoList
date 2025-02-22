import apiClient from "@/api/apiClient";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/Films";

export default {
    searchMovie(filmName: string): Promise<AxiosResponse<ApiResponse>> {
        return apiClient.get('/movie/search', {
            params: {
                query: filmName,
            }
        });
    },
};