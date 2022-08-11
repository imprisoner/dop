//region My Framework

const myJestHelper = require("../src/myjesthelper")


//endregion

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


    const sut_func = (data, input) => UserManagement.addMember(data, input)


    myJestHelper.runSuite('UserManagement.addMember')([emptyAddTestData, addingSuccessTestData, addingFailTestData])
//endregion

//region Library tests

    {
        // const Library = require("../src/purefunctions/library")
        class Library {
        }

        Library.addMember = function (library, member) {
            const currentUserManagement = _.get(library, "userManagement");
            const nextUserManagement = UserManagement.addMember(
                currentUserManagement,
                member);
            return _.set(library,
                "userManagement",
                nextUserManagement);
        };


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

        const sut_func = (data, input) => Library.addMember(data, input)

        // runTest(testData, "Library.addMember")
        myJestHelper.runSuite('Library.addMember')([testData])
        // runSubtest(testData, testData.subtests[0])

    }
//endregion

})

