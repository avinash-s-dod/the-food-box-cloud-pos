import type { Query } from "mongoose";

export class ApiFeatures<T, Q extends object> {
  public query: Query<T[], T>;
  public queryString: Q;

  private page: number;
  private limit: number;

  constructor(query: Query<T[], T>, queryString: Q) {
    this.query = query;
    this.queryString = queryString;

    const queryObj = queryString as Record<string, unknown>;

    this.page =
      typeof queryObj.page === "number"
        ? queryObj.page
        : Number(queryObj.page) || 1;

    this.limit =
      typeof queryObj.limit === "number"
        ? queryObj.limit
        : Number(queryObj.limit) || 10;
  }

  filter() {
    const queryObj = { ...this.queryString } as Record<string, unknown>;

    delete queryObj.search;
    delete queryObj.page;
    delete queryObj.limit;
    delete queryObj.sort;

    this.query = this.query.find(queryObj);

    return this;
  }

  search(searchFields: string[]) {
    const queryObj = this.queryString as Record<string, unknown>;
    const searchTerm = queryObj.search;

    if (typeof searchTerm === "string" && searchTerm.trim()) {
      const regex = new RegExp(searchTerm.trim(), "i");

      const searchConditions = searchFields.map((field) => ({
        [field]: regex,
      }));

      this.query = this.query.find({
        $or: searchConditions,
      });
    }

    return this;
  }

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

  paginate() {
    const skip = (this.page - 1) * this.limit;

    this.query = this.query.skip(skip).limit(this.limit);

    return this;
  }

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