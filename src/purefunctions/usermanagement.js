'use strict'
const _ = require("lodash");

class UserManagement {
    static isLibrarian(userManagementData, email) {
        return _.has(_.get(userManagementData, "librariansByEmail"), email);
    }

    static isVIPMember(userManagementData, email) {
        return _.get(userManagementData,
            ["membersByEmail", email, "isVIP"]) == true;
    }

    isSuperMember(userManagementData, email) {
        return _.get(userManagementData,
            ["membersByEmail", email, "isSuper"]) == true;
    }
}

UserManagement.addMember = function (userManagement, member) {
    const email = _.get(member, "email");
    const infoPath = ["membersByEmail", email];
    if(_.has(userManagement, infoPath)) {
        throw "Member already exists."
    }
    var nextUserManagement = _.set(userManagement,
        infoPath,
        member);
    return nextUserManagement;
}

module.exports = UserManagement