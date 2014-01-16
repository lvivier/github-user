
/**
 * Dependencies
 */
var jsonp = require('jsonp')

exports.email = email
exports.profile = profile

/**
 * GitHub user by email
 */
function email (email, cb) {
  var url = 'https://api.github.com/search/users?q='+email+' in:email'
  jsonp(url, function (err, res) {
    if (err) return cb(err)
    if (res && res.data && res.data.total_count) return profile(res.data.items[0].login, cb)
    cb(new Error('no user with email '+email))
  })
}

/**
 * GitHub user profile
 */
function profile (name, cb) {
  var url = 'https://api.github.com/users/'+name
  jsonp(url, function (err, res) {
    if (err) return cb(err)
    if (res && res.data) return cb(null, res.data)
    cb(new Error('no user with login '+name))
  })
}
