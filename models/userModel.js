const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dbFilePath = "./userDB.db";

class UserDAO {
    constructor() {

        this.db = new Datastore({
            filename: "./userDB.db",
            autoload: true
        });

    }
    init() {
        return this;
    }
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function (hash) {
            var entry = {
                user: username,
                password: hash,
            };
            that.db.insert(entry, function (err) {
                if (err) {
                    console.log("Can't insert user: ", username);
                }
            });
        });
    }
    lookup(user, cb) {
        this.db.find({ 'user': user }, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'user': username }, function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                    console.log('getUserByUsername returns: ', user);
                }
            })
        })
    }
}
const dao = new UserDAO();
dao.init();

module.exports = dao;