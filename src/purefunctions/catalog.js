const _ = require("lodash");

class Catalog {
    static getBookLendings(catalogData, memberId) {
        // will be implemented later <3>
    }

    // static authorNames(catalogData, book) {
    //     const authorIds = _.get(book, "authorIds");
    //     return _.map(authorIds, function (authorId) {
    //         return _.get(catalogData, ["authorsById", authorId, "name"]);
    //     });
    // }

    static authorNames(catalogData, authorIds) {
        return _.map(authorIds, function(authorId) {
            return _.get(catalogData, ["authorsById", authorId, "name"]);
        });
    }

    static bookInfo(catalogData, book) {
        return {
            "title": _.get(book, "title"),
            "isbn": _.get(book, "isbn"),
            "authorNames": Catalog.authorNames(catalogData, _.get(book, "authorIds"))
        };
    }

    static searchBooksByTitle(catalogData, query) {
        // const allBooks = _.values(_.get(catalogData, "booksByIsbn"));
        const allBooks = _.get(catalogData, "booksByIsbn");
        const queryLowerCased = query.toLowerCase();

        const matchingBooks = _.filter(allBooks, function (book) {
            return _.get(book, "title")
                .toLowerCase()
                .includes(queryLowerCased);
        });
        return _.map(matchingBooks, function (book) {
            return Catalog.bookInfo(catalogData, book);
        });
    }
}


module.exports = Catalog