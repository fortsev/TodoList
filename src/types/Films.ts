interface Film {
    id: number,
    name: string,
    year: string,
    description: string | null,
    viewed: boolean,
}

interface ApiResponse {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export { Film, ApiResponse }
