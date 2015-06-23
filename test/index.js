
var assert = require('assert')
var gh = require('../')

suite('github-user')

function pass (done) {
  return function (err, user) {
    assert(user.email = 'luke@vivier.ca')
    assert(user.type = 'User')
    assert(null === err)
    done()
  }
}

test('gets a user by email', function(done){
  gh('luke@vivier.ca', pass(done))
})

test('gets a user by username', function(done){
  gh('lvivier', pass(done))
})
