'user strict'

const { key } = require('../keys');

var jwt = require('../node_modules/jwt-simple');
var moment = require('../node_modules/moment');
var secret = key.SECRET;

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, secret);
}