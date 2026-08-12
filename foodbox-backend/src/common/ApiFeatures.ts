import type { Query } from "mongoose";

// Class: ApiFeatures
// Description: Utilities to handle database query building, including pagination, filtering, sorting, and field searches
export class ApiFeatures<T, Q extends object> {
  public query: Query<T[], T>;
  public queryString: Q;

  private page: number;
  private limit: number;

  constructor(query: Query<T[], T>, queryString: Q) {
    this.query = query;
    this.queryString = queryString;

    const queryObj = queryString as Record<string, unknown>;

    // Set page number with a default of 1
    this.page =
      typeof queryObj.page === "number"
        ? queryObj.page
        : Number(queryObj.page) || 1;

    // Set limit with a default of 10
    this.limit =
      typeof queryObj.limit === "number"
        ? queryObj.limit
        : Number(queryObj.limit) || 10;
  }

  // Filters out operational parameters (page, sort, search, limit) and builds mongoose query filters
  filter() {
    const queryObj = { ...this.queryString } as Record<string, unknown>;

    delete queryObj.search;
    delete queryObj.page;
    delete queryObj.limit;
    delete queryObj.sort;

    this.query = this.query.find(queryObj);

    return this;
  }

  // Applies regex-based searches across multiple schema fields
  search(searchFields: string[]) {
    const queryObj = this.queryString as Record<string, unknown>;
    const searchTerm = queryObj.search;

    if (typeof searchTerm === "string" && searchTerm.trim()) {
      const regex = new RegExp(searchTerm.trim(), "i"); // Case-insensitive matching regex

      const searchConditions = searchFields.map((field) => ({
        [field]: regex,
      }));

      this.query = this.query.find({
        $or: searchConditions,
      });
    }

    return this;
  }

  // Resolves sort direction parameters; defaults to newest first (-createdAt)
  sort() {
    const queryObj = this.queryString as Record<string, unknown>;
    const sortValue = queryObj.sort;

    if (typeof sortValue === "string") {
      const sortBy = sortValue.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // Applies offset pagination skip/limit boundary to query
  paginate() {
    const skip = (this.page - 1) * this.limit;

    this.query = this.query.skip(skip).limit(this.limit);

    return this;
  }

  // Resolves total results and paginations counts meta statistics
  async getPaginationMeta() {
    const total = await this.query.clone().countDocuments();

    return {
      page: this.page,
      limit: this.limit,
      total,
      totalPages: Math.ceil(total / this.limit),
    };
  }
}