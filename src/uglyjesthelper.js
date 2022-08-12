const runSubtest = (testData) => (subtest) => test(JSON.stringify(subtest), () => {
    testData.toMatch(testData.data, subtest.input, subtest.expected)
})

const runTest = (testData) => {
    for (let subtest in testData.subtests) {
        describe(testData.testDescription, () => {
            test(JSON.stringify(subtest), () =>
                testData.toMatch(testData.data, subtest.input, subtest.expected)
            )
        })
    }

    //    WHAT IS THE DIFFERENCE? CODE BELOW WORKS RIGHT

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

module.exports = {
    runSubtest, runTest, runSuite
}