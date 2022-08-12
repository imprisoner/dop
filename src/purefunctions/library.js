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



Library.addMember = function(library, member) {
    const currentUserManagement = _.get(library, "userManagement");
    const nextUserManagement = UserManagement.addMember(
        currentUserManagement,
        member);
    return _.set(library,
        "userManagement",
        nextUserManagement);
};

module.exports = Library