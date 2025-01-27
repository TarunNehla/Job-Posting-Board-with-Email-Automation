const  mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    image : {
        type : String
    }
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.__v
    }
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
