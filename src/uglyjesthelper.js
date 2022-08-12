const runSubtest = (testData) => (subtest) => test(JSON.stringify(subtest), () => {
    testData.toMatch(testData.data, subtest.input, subtest.expected)
})

const output = (descrSet) => {
    [data, input, expected] = descrSet.map(obj => Object.keys(obj)[0])

    return `(${data}, ${input}) ==> ${expected}`
}

const runTest = (testData) => {
    for (let {input, expected} of testData.subtests) {
        describe(testData.testDescription, () => {
            test(output([testData.data, input, expected]), () =>
                testData.toMatch(testData.data, input, expected)
            )
        })
    }

    //    WHAT IS THE DIFFERENCE? CODE BELOW WORKS RIGHT
    
    //      ========== ANSWER: the difference is 
    //      << for key in object >> - objects loop
    //      << for value of array >> - array loop
    
    // testData.subtests.forEach(
    //     (subtest, index) => describe(testData.testDescription, () => {
    //                 test(JSON.stringify(subtest), () =>
    //                     testData.toMatch(testData.data, subtest.input, subtest.expected)
    //                 )
    //             }
    //         )
    //     )
}

const runSuite = (suiteDescription) => (testDataArray) => describe(suiteDescription, () => {
    testDataArray.forEach((testData, index) => runTest(testData)) //, suiteDescription))
})

// 



module.exports = {
    runSubtest, runTest, runSuite, output
}