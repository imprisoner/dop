const myJestHelper = require("../src/uglyjesthelper");

describe("Unit tests for queries", () => {
    {
        const Library = require("../src/purefunctions/library")

        const libraryTestData = {
            catalog: {
                booksByIsbn: {
                    "978-1779501127": {
                        isbn: "978-1779501127",
                        title: "Watchmen",
                        publicationYear: 1987,
                        authorIds: ["alan-moore",
                            "dave-gibbons"]
                    }
                },
                authorsById: {
                    "alan-moore": {
                        name: "Alan Moore",
                        bookIsbns: ["978-1779501127"]
                    },
                    "dave-gibbons": {
                        name: "Dave Gibbons",
                        bookIsbns: ["978-1779501127"]
                    }
                }
            }
        }

        const bookInfo = {
            isbn: "978-1779501127",
            title: "Watchmen",
            authorNames: ["Alan Moore",
                "Dave Gibbons"]
        }

        const present = "Watchmen"
        const missing = "Batman"

        const testData = {
            data: libraryTestData,
            toMatch: (data, input, expected) => expect(JSON.parse(sut_func(data, input))).toEqual(expected)
        }

        const sut_func = Library.searchBooksByTitleJSON

        describe('Library.searchBooksByTitleJSON', () => {
            myJestHelper.runSubtest(testData)({input: present, expected: [bookInfo]})
            myJestHelper.runSubtest(testData)({input: missing, expected: []})
        })
    }

    {
        const Catalog = require("../src/purefunctions/catalog")

        const catalogTestData = {
            booksByIsbn: {
                "978-1779501127": {
                    isbn: "978-1779501127",
                    title: "Watchmen",
                    publicationYear: 1987,
                    authorIds: ["alan-moore", "dave-gibbons"]
                }
            },
            authorsById: {
                "alan-moore": {
                    name: "Alan Moore",
                    bookIsbns: ["978-1779501127"]
                },
                "dave-gibbons": {
                    name: "Dave Gibbons",
                    bookIsbns: ["978-1779501127"]
                }
            }
        }

        const present = "Watchmen"
        const missing = "Batman"
        const presentLowerCased = "watchmen"

        const bookInfo = {
            isbn: "978-1779501127",
            title: "Watchmen",
            authorNames: ["Alan Moore", "Dave Gibbons"]
        }

        const testData = {
            data: catalogTestData,
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }

        const sut_func = Catalog.searchBooksByTitle

        describe('Catalog.searchBooksByTitle', () => {
            myJestHelper.runSubtest(testData)({input: present, expected: [bookInfo]})
            myJestHelper.runSubtest(testData)({input: missing, expected: []})
            myJestHelper.runSubtest(testData)({input: presentLowerCased, expected: [bookInfo]})
        })
    }
})