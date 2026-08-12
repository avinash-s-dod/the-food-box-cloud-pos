// Standardized schema properties for API listings query parameters
export interface BaseQueryParams {
  search?: string;      // search query term
  page?: number;        // page index number (1-based)
  limit?: number;       // total items returning per page
  sort?: string;        // sort field expressions (prefixed with - for descending)
}
