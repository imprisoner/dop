const runSubtest = (testData) => (subtest) => test(JSON.stringify(subtest), () => {
    testData.toMatch(testData.data, subtest.input, subtest.expected)
})

const runTest = (testData) => {
    for (let subtest of testData.subtests) {
        describe(testData.testDescription, () => runSubtest(testData)(subtest))
    }
}

const runSuite = (suiteDescription) => (testDataArray) => describe(suiteDescription, () => {
    testDataArray.forEach((testData, index) => runTest(testData)) //, suiteDescription))
})

module.exports = {
    runSubtest, runTest, runSuite
}