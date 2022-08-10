const _ = require("lodash");
const UserManagement = require("./usermanagement");

class Library {
}

Library.addMember = function (library, member) {
    const currentUserManagement = _.get(library, "userManagement");
    const nextUserManagement = UserManagement.addMember(
        currentUserManagement,
        member);
    return _.set(library,
        "userManagement",
        nextUserManagement);
};

module.exports = Library