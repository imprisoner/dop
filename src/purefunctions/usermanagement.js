const _ = require("lodash");

class UserManagement {
}

UserManagement.addMember = function (userManagement, member) {
    const email = _.get(member, "email");
    const infoPath = ["membersByEmail", email];
    if (_.has(userManagement, infoPath)) {
        throw new Error("Member already exists.")
    }
    return _.set(
        userManagement,
        infoPath,
        member
    )
}

module.exports = UserManagement