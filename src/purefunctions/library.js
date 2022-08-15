'use strict'
const _ = require("lodash");
const Catalog = require("./catalog");
const UserManagement = require("./usermanagement");

class Library {
    // // static Usermanagement;
    //
    // static addBookItem(libraryData, userId, bookItemInfo) {
    //     if (UserManagement.isLibrarian(libraryData.userManagement, userId) ||
    //         UserManagement.isVIPMember(libraryData.userManagement, userId)) {
    //         return Catalog.addBookItem(libraryData.catalog, bookItemInfo);
    //     } else {
    //         throw "Not allowed to add a book item"; // <1>
    //     }
    // }
    //
    // static getBookLendings(libraryData, userId, memberId) {
    //     if (this.Usermanagement.isLibrarian(libraryData.userManagement, userId) ||
    //         Usermanagement.isSuperMember(libraryData.userManagement, userId)) {
    //         return Catalog.getBookLendings(libraryData.catalog, memberId);
    //     } else {
    //         throw "Not allowed to get book lendings"; // <1>
    //     }
    // }

    static searchBooksByTitleJSON(libraryData, query) {
        const catalogData = _.get(libraryData, "catalog");
        const results = Catalog.searchBooksByTitle(catalogData, query);
        return JSON.stringify(results);
    }
}

//TODO remove console.log
Library.addMember = function(library, member) {
    // console.log('library <0> ', library)

    const currentUserManagement = _.get(library, "userManagement");
    // console.log('currentUserManagement <1> ', currentUserManagement)

    const nextUserManagement = UserManagement.addMember(
        currentUserManagement,
        member);

    // console.log('nextUserManagement <2> ', nextUserManagement)

    const nextLibrary = _.set(library,
        "userManagement",
        nextUserManagement);

    // console.log('nextLibrary <3> ', JSON.stringify(nextLibrary))

    return nextLibrary;
};

module.exports = Library