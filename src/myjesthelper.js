
// exports.runSuite = (suiteDescription) => (testDataArray) => describe(suiteDescription, () => {
//     testDataArray.forEach((item, index) => runTest(item, suiteDescription))
// })
//
// exports.runTest = (testData, suiteDescription) => {
//     testData.subtests.forEach((item, index) => runSubtest(testData)(item))
// }
//
// exports.runSubtest = (testData) => (subtest) => test(testData.descr(subtest), () => {
//     testData.toMatch(testData.data, subtest.input, subtest.output)
// })

module.exports = {
    runSuite : (suiteDescription) => (testDataArray) => describe(suiteDescription, () => {
        testDataArray.forEach((item, index) => runTest(item, suiteDescription))
    }),

    runTest : (testData, suiteDescription) => {
        testData.subtests.forEach((item, index) => runSubtest(testData)(item))
    },

    runSubtest : (testData) => (subtest) => test(testData.descr(subtest), () => {
        testData.toMatch(testData.data, subtest.input, subtest.output)
    })
}