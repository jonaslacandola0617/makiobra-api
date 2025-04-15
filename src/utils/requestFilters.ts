import { ParsedQs } from 'qs';

class RequestFilters {
  query: Record<string, any>;
  requestQuery: ParsedQs;

  constructor(query: Record<string, any>, requestQuery: ParsedQs) {
    this.query = query;
    this.requestQuery = requestQuery;
  }

  filter() {
    // FILTER
    const filter = { ...this.requestQuery };
    const excludedQueries = ['sort', 'page', 'limit', 'fields'];

    excludedQueries.forEach((el) => delete filter[el]);

    Object.keys(filter).forEach((field) => {
      const value = filter[field];

      // CHECK IF THE VALUE IS A STRING AND IS NOT A NUMBER (NAN)
      if (typeof value === 'string') {
        // IF IT'S A STRING, MUTATE TO AN ACCEPTABLE PRISMA QUERY
        // THIS WILL BE MOSTLY USED FOR SEARCH FUNCTIONS
        if (Number.isNaN(Number(value)))
          filter[field] = { contains: value, mode: 'insensitive' };
        else (filter as Record<string, any>)[field] = Number(value);
      } else if (typeof value === 'object') {
        Object.keys(value).forEach((key) => {
          const nestedValue = (value as ParsedQs)[key];
          (value as Record<string, any>)[key] = Number(nestedValue);
        });
      }
    });

    if (Object.keys(filter).length)
      this.query = { ...this.query, where: filter };

    return this;
  }

  sort() {
    //  SORT
    if (this.requestQuery.sort) {
      const { sort } = this.requestQuery;
      const entries = [[Object.values(sort)[0], Object.keys(sort)[0]]];

      this.query = { ...this.query, orderBy: Object.fromEntries(entries) };
    }

    return this;
  }

  limitFields() {
    //  SELECT FIELDS
    if (this.requestQuery.fields) {
      const { fields } = this.requestQuery;

      if (typeof fields === 'string') {
        const selectedFields = fields
          .split(',')
          .map((field) => [field.trim(), true]);

        this.query = {
          ...this.query,
          select: Object.fromEntries(selectedFields),
        };
      }
    }

    return this;
  }

  paginate() {
    //  PAGINATE AND LIMIT
    const page = Number(this.requestQuery.page) || 1;
    const limit = Number(this.requestQuery.limit) || 10;

    this.query = {
      ...this.query,
      skip: (page - 1) * limit,
      take: limit,
    };

    return this;
  }
}

export default RequestFilters;
