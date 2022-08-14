
const jessie = {
    email: "jessie@gmail.com",
    password: "my-secret"
}

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
}

{
    const {System, SystemState} = require("../src/system");

    describe('System.addMember', () => {

        test("(systemState libraryStateBefore, jessie) ==> no output (stateful)", () => {

            const systemState = new SystemState();
            console.log(10, systemState.get())

            systemState.commit(null, libraryStateBefore)
            console.log(15, libraryStateBefore)
            console.log(20, systemState.get())

            System.addMember(systemState, jessie)
            console.log(30, systemState.get())

            expect(systemState.get()).toEqual(libraryStateBefore) // (libraryStateAfter)
            console.log(40, libraryStateBefore)
            console.log(50, libraryStateAfter)

        });

        // const testData = {
        //     data: libraryStateBefore,
        //     subtests: [
        //         {input: jessie, expected: libraryStateAfter}
        //     ],
        //     testDescription: "(systemState libraryStateBefore, jessie) ==> no output (stateful)",
        //     toMatch: (data, input, expected) => expect(sut_func(data, input)).toEqual(expected)
        // }

        // sut_func = systemState.commit

        // test("---", () => {
        //     System.addMember(systemState, jessie);
        //     _.isEqual(systemState.get(),
        //         libraryStateAfter);
        //
        //     console.log(" ===> " + systemState.get())
        //
        //     systemState.commit(null, libraryStateBefore);
        //     expect(systemState.get()).toEqual(libraryStateAfter)
        // })
    })

}
