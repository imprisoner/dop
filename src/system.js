let fp = require("lodash/fp");
const Library = require("./purefunctions/library");

_ = fp.convert({
    "cap": false,
    "curry": false,
    "fixed": false,
    "immutable": true,
    "rearg": false
});


class System {
    static addMember = (systemState, member) => {
        var previous = systemState.get();
        var next = Library.addMember(previous, member);
        systemState.commit(previous, next);
    }
}

//
// class SystemState {
//     systemData;
//     previousSystemData;
//
//     get() {
//         return this.systemState
//     }
//
//     commit(previous, next) {
//         var systemDataBeforeUpdate = this.systemData;
//         if (!Consistency.validate(previous, next)) {
//             throw "The system data to be committed is not valid!";
//         }
//         this.systemData = next;
//         this.previousSystemData = systemDataBeforeUpdate;
//     }
//
//     undoLastMutation() {
//         this.systemData = this.previousSystemData;
//     }
// }


    class
    SystemState {
    systemData;

    get() {
        return this.systemData;
    }

    set(_systemData) {
        this.systemData = _systemData;
    }

    commit(previous, next) {
        const nextSystemData = SystemConsistency.reconcile(
            this.systemData,
            previous,
            next);
        if (!SystemValidity.validate(previous, nextSystemData)) {
            throw "The system data to be committed is not valid!";
        }
        this.systemData = nextSystemData;
    }
}

class SystemValidity {

    static validate(previous, nextSystemData) {
        return true;
    }
}


class SystemConsistency {
    static threeWayMerge(current, previous, next) {
        var previousToCurrent = diff(previous, current);
        var previousToNext = diff(previous, next);
        if (havePathInCommon(previousToCurrent, previousToNext)) {
            return _.merge(current, previousToNext);
        }
        throw "Conflicting concurrent mutations.";
    }

    static reconcile(current, previous, next) {
        if (current == previous) {
            return next;
        }
        return SystemConsistency.threeWayMerge(current,
            previous,
            next);
    }
}

function diffObjects(data1, data2) {
    var emptyObject = _.isArray(data1) ? [] : {};
    if (data1 === data2) {
        return emptyObject;
    }
    var keys = _.union(_.keys(data1), _.keys(data2));
    return _.reduce(keys,
        function (acc, k) {
            var res = diff(
                _.get(data1, k),
                _.get(data2, k));
            if ((_.isObject(res) && _.isEmpty(res)) ||
                (res === "no-diff")) {
                return acc;
            }
            return _.set(acc, [k], res);
        },
        emptyObject);
}

function diff(data1, data2) {
    if (_.isObject(data1) && _.isObject(data2)) {
        return diffObjects(data1, data2);
    }
    if (data1 !== data2) {
        return data2;
    }
    return "no-diff";
}

function informationPaths(obj, path = []) {
    return _.reduce(obj,
        function (acc, v, k) {
            if (_.isObject(v)) {
                return _.concat(acc,
                    informationPaths(v,
                        _.concat(path, k)));
            }
            return _.concat(acc, [_.concat(path, k)]);
        },
        []);
}

function havePathInCommon(diff1, diff2) {
    return !_.isEmpty(
        _.intersection(informationPaths(diff1), informationPaths(diff2)));
}

module.exports = {
    System, SystemState
}

// var library = {
//     "catalog": {
//         "booksByIsbn": {
//             "978-1779501127": {
//                 "isbn": "978-1779501127",
//                 "title": "Watchmen",
//                 "publicationYear": 1987,
//                 "authorIds": ["alan-moore", "dave-gibbons"]
//             }
//         },
//         "authorsById": {
//             "alan-moore": {
//                 "name": "Alan Moore",
//                 "bookIsbns": ["978-1779501127"]
//             },
//             "dave-gibbons": {
//                 "name": "Dave Gibbons",
//                 "bookIsbns": ["978-1779501127"]
//             }
//         }
//     }
// };

// var prev = library
// var next = _.set(
//     library,
//     ["catalog", "booksByIsbn", "978-1779501127", "publicationYear"],
//     1986)
//
// var libraryWithUpdatedTitle = _.set(
//     library,
//     ["catalog", "booksByIsbn", "978-1779501127", "title"],
//     "The Watchmen");
// var current = _.set(
//     libraryWithUpdatedTitle,
//     ["catalog", "authorsById", "dave-gibbons", "name"],
//     "David Chester Gibbons");
//
//
// console.log(prev.catalog)
// console.log(next.catalog)
//
// let res1 = diff(prev, next);
// console.log(JSON.stringify(res1))
// console.log(informationPaths(res1))
//
//
// let res2 = diff(prev, current);
// console.log(JSON.stringify(res2))
// console.log(informationPaths(res2))
//
// let res3 = _.merge(current, (diff(prev, next)));
// console.log(JSON.stringify(res3))