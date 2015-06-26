
/**
 * Dependencies
 */

var jsonp = require('jsonp')

/**
 * Find a GitHub user by email or username
 *
 * @param {string} str
 * @param {function} cb
 */

module.exports = function (str, cb) {
  (str.match(/[^@]+@[\w.-]+/)? getByEmail : getByUser)(str, cb)
}

/**
 * GitHub user by email
 * @api private
 */

function getByEmail (email, cb) {
  var url = 'https://api.github.com/search/users?q='+email+' in:email'
  jsonp(url, function (err, res) {
    if (err) return cb(err)
    if (res && res.data && res.data.total_count) return getByUser(res.data.items[0].login, cb)
    cb(new Error('no user with email '+email))
  })
}

/**
 * GitHub user profile
 * @api private
 */

function getByUser (name, cb) {
  var url = 'https://api.github.com/users/'+name
  jsonp(url, function (err, res) {
    if (err) return cb(err)
    if (res && res.data) return cb(null, res.data)
    cb(new Error('no user with login '+name))
  })
}
