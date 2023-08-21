class Features {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    // Search
    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i" // i means case insensitive
            } 
        } : {}
        
        this.query = this.query.find({...keyword});
        return this;
    }
    // Filter
    filter() {
        const queryCopy = { ...this.queryString };
        // Fields to be removed
        const fieldsToBeRemoved = ['keyword', 'page', 'limit'];

        fieldsToBeRemoved.forEach((field) => delete queryCopy[field]);

        // filter for price and ratings
        let queryCopyString = JSON.stringify(queryCopy);
        queryCopyString = queryCopyString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryCopyString));
        return this;
    }
    // Pagination
    pagination(perPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = perPage * (currentPage - 1);

        this.query = this.query.limit(perPage).skip(skip);

        return this;
    }
}

module.exports = Features;