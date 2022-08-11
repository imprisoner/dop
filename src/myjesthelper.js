const runSubtest = (testData) => (subtest) => test(testData.descr(subtest), () => {
    testData.toMatch(testData.data, subtest.input, subtest.output)
})
const runTest = (testData, suiteDescription) => {
    testData.subtests.forEach((item, index) => runSubtest(testData)(item))
}
const runSuite = (suiteDescription) => (testDataArray) => describe(suiteDescription, () => {
    testDataArray.forEach((item, index) => runTest(item, suiteDescription))
})


module.exports = {
    runSubtest, runTest, runSuite
}