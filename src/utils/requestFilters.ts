import { ParsedQs } from 'qs';

class RequestFilters {
  query: Record<string, any>;
  request: ParsedQs;

  constructor(query: Record<string, any>, request: ParsedQs) {
    this.query = query;
    this.request = request;
  }

  filter() {
    // FILTER
    const filter = { ...this.request };
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
    if (this.request.sort) {
      const { sort } = this.request;
      const entries = [[Object.values(sort)[0], Object.keys(sort)[0]]];

      this.query = { ...this.query, orderBy: Object.fromEntries(entries) };
    }

    return this;
  }

  fields() {
    //  SELECT FIELDS
    if (this.request.fields) {
      const { fields } = this.request;

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
    const page = Number(this.request.page) || 1;
    const limit = Number(this.request.limit) || 10;

    this.query = {
      ...this.query,
      skip: (page - 1) * limit,
      take: limit,
    };

    return this;
  }
}

export default RequestFilters;
