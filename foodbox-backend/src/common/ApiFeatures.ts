import type { Query } from "mongoose";

export class ApiFeatures<T, Q extends object> {
  public query: Query<T[], T>;
  public queryString: Q;

  constructor(query: Query<T[], T>, queryString: Q) {
    this.query = query;
    this.queryString = queryString;
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
    const queryObj = this.queryString as Record<string, unknown>;

    const page =
      typeof queryObj.page === "number"
        ? queryObj.page
        : Number(queryObj.page) || 1;

    const limit =
      typeof queryObj.limit === "number"
        ? queryObj.limit
        : Number(queryObj.limit) || 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}