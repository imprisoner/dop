//region My Framework

const myJestHelper = require("../src/myjesthelper")


// const MyJestHelper =

//endregion

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
            subtests: [
                {input: present, output: bookInfo},
                {input: missing, output: []}
            ],
            descr: function (test_) {
                return "(libraryTestData, 'Watchmen') ==> bookInfo"
            },
            toMatch: (data, input, expected) => expect(JSON.parse(sut_func(data, input))).toEqual(expected)
        }

        const sut_func = Library.searchBooksByTitleJSON

        // runSuite('UserManagement.addMember')([testData])
        // runTest(testData, 'UserManagement.addMember')

        myJestHelper.runSubtest(testData)({input: missing, output: []})
        myJestHelper.runSubtest(testData)({input: present, output: bookInfo})

    }
    {

    }
})

describe("Unit tests for mutations", () => {
    const _ = require("lodash");

//region UserManagement tests
    const UserManagement = require("../src/purefunctions/usermanagement");

    const firstMember = {
        email: "jessie@gmail.com",
        password: "my-secret"
    }

    const franck = {
        email: "franck@gmail.com",
        password: "my-top-secret"
    };

    const userManagementStateEmpty = {}

    const UserManagementStateOneMember = {
        membersByEmail: {
            "jessie@gmail.com": {
                email: "jessie@gmail.com",
                password: "my-secret"
            }
        }
    }

    const UserManagementStateTwoMembers = {
        membersByEmail: {
            "jessie@gmail.com": {
                email: "jessie@gmail.com",
                password: "my-secret"
            },
            "franck@gmail.com": {
                email: "franck@gmail.com",
                password: "my-top-secret"
            }
        }
    }

    const emptyAddTestData = {
        data: userManagementStateEmpty,
        subtests: [
            {input: firstMember, output: UserManagementStateOneMember}
        ],
        descr: function (test_) {
            return "(userManagementStateEmpty, firstMember) ==> UserManagementStateOneMember"
        },
        toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
    }

    const addingSuccessTestData = {
        data: UserManagementStateOneMember,
        subtests: [
            {input: franck, output: UserManagementStateTwoMembers}
        ],
        descr: function (test_) {
            return "(UserManagementStateOneMember, franck) ==> UserManagementStateTwoMembers"
        },
        toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
    }


    const addingFailTestData = {
        data: UserManagementStateOneMember,
        subtests: [
            {input: firstMember, output: "Member already exists."}
        ],
        descr: function (test_) {
            return "(UserManagementStateOneMember, firstMember) ==> throws \"Member already exists.\""
        },
        toMatch: (data, input, expected) => expect(() => sut_func(data, input)).toThrow(expected)
    }


    const sut_func = UserManagement.addMember


    myJestHelper.runSuite('UserManagement.addMember')([emptyAddTestData, addingSuccessTestData, addingFailTestData])
//endregion

//region Library tests

    {
        const Library = require("../src/purefunctions/library")

        const jessie = {
            email: "jessie@gmail.com",
            password: "my-secret"
        };

        const libraryStateBefore = {
            userManagement: {
                membersByEmail: {
                    "franck@gmail.com": {
                        email: "franck@gmail.com",
                        password: "my-top-secret"
                    }
                }
            }
        };
        const LibraryStateAfter = {
            userManagement: {
                membersByEmail: {
                    "jessie@gmail.com": {
                        email: "jessie@gmail.com",
                        password: "my-secret"
                    },
                    "franck@gmail.com": {
                        email: "franck@gmail.com",
                        password: "my-top-secret"
                    }
                }
            }
        };

        const testData = {
            data: libraryStateBefore,
            subtests: [
                {input: jessie, output: LibraryStateAfter}
            ],
            descr: function (test_) {
                return "(libraryStateBefore, jessie) ==> LibraryStateAfter"
            },
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }

        const sut_func = Library.addMember

        // runTest(testData, "Library.addMember")
        myJestHelper.runSuite('Library.addMember')([testData])
        // runSubtest(testData, testData.subtests[0])

    }
//endregion

})

