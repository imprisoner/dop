'use strict'
// const myJestHelper = require("../src/uglyjesthelper");
const myJestHelper = require("../src/myjesthelper");

describe("Unit tests for mutations", () => {

    {
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
                {input: firstMember, expected: UserManagementStateOneMember}
            ],
            testDescription: "(userManagementStateEmpty, firstMember) ==> UserManagementStateOneMember",
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }

        const addingSuccessTestData = {
            data: UserManagementStateOneMember,
            subtests: [
                {input: franck, expected: UserManagementStateTwoMembers}
            ],
            testDescription: "(UserManagementStateOneMember, franck) ==> UserManagementStateTwoMembers",
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }


        const addingFailTestData = {
            data: UserManagementStateOneMember,
            subtests: [
                {input: firstMember, expected: "Member already exists."}
            ],
            testDescription: "(UserManagementStateOneMember, firstMember) ==> throws \"Member already exists.\"",
            toMatch: (data, input, expected) => expect(() => sut_func(data, input)).toThrow(expected)
        }


        const sut_func = UserManagement.addMember

        // describe('UserManagement.addMember', () => {      //every testData corresponds its test
        //     myJestHelper.runTest(emptyAddTestData)
        //     myJestHelper.runTest(addingSuccessTestData)
        //     myJestHelper.runTest(addingFailTestData)
        // })

        myJestHelper.runSuite('UserManagement.addMember')([emptyAddTestData, addingSuccessTestData, addingFailTestData])
    }

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
    }

    const libraryStateAfter = {
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


    {
        const Library = require("../src/purefunctions/library")

        const testData = {
            data: libraryStateBefore,
            subtests: [
                {input: jessie, expected: libraryStateAfter}
            ],
            testDescription: "(libraryStateBefore, jessie) ==> libraryStateAfter",
            toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        }

        const sut_func = Library.addMember

        describe("Library.addMember", () => {
            myJestHelper.runTest(testData)
        })

        // myJestHelper.runSuite('Library.addMember')([testData])
    }



    {
        const {System, SystemState} = require("../src/system");

        var systemState = new SystemState();
        systemState.commit(null, libraryStateBefore);
        System.addMember(systemState, jessie);
        _.isEqual(systemState.get(),
            libraryStateAfter);
    }
})