'use strict'
// const myJestHelper = require("../src/uglyjesthelper");
const myJestHelper = require("../src/myjesthelper");

describe("Unit tests for data manipulation", () => {
    const Catalog = require("../src/purefunctions/catalog");
    const catalogTestData = {
        authorsById: {
            "alan-moore": {
                name: "Alan Moore"
            },
            "dave-gibbons": {
                name: "Dave Gibbons"
            }
        }
    }

    {
        const testDataExist = {
            data: catalogTestData,
            subtests: [
                {input: ["alan-moore"], expected: ["Alan Moore"]},
                {input: [], expected: []},
                {input: ["alan-moore", "dave-gibbons"], expected: ["Alan Moore", "Dave Gibbons"]},
                {input: ["alan-moore", "albert-einstein"], expected: ["Alan Moore", undefined]},
                {input: ["albert-einstein"], expected: [undefined]}
            ],
            testDescription: "If data present",
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }

        const testDataEmpty = {
            data: {},
            subtests: [
                {input: ["alan-moore"], expected: [undefined]},
                {input: [], expected: []}
            ],
            testDescription: "If data empty",
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }

        const sut_func = Catalog.authorNames

        myJestHelper.runSuite('Catalog.authorNames')([testDataExist, testDataEmpty])
    }

    {
        const book = {
            isbn: "978-1779501127",
            title: "Watchmen",
            publicationYear: 1987,
            authorIds: ["alan-moore", "dave-gibbons"]
        };

        const expectedResult = {
            authorNames: ["Alan Moore", "Dave Gibbons"],
            isbn: "978-1779501127",
            title: "Watchmen",
        };

        const testData = {
            data: catalogTestData,
            subtests: [
                {input: book, expected: expectedResult}
            ],
            testDescription: "(catalogTestData, book) ==> expectedResult",
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }

        const sut_func = Catalog.bookInfo

        describe("Catalog.bookInfo", () => {
            myJestHelper.runTest(testData)
        })
    }
})




