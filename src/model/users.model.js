import mongoose from 'mongoose'
import crypto from 'crypto'
import 'mongoose-type-email'

//Schema for User
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true,
            trim: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true,
            default: Date.now,
            trim: true
        },
        gender: {
            type: String,
            required: true
        },
        //profile object from here ---------------------------------------
        profile: {
            // education object from here --------------------
            education: {
                schoolOrUniv: {
                    type: String,
                },
                grade: {
                    type: Number,
                },
                year: {
                    type: Number,
                },
                instituteName: {
                    type: String,
                },
                board: {
                    type: String
                }
            },
            // education object ends here ---------------

            // address object from here -----------------
            address: {
                houseNumber: {
                    type: String,
                },
                landmark: {
                    type: String
                },
                addressLine1:{
                    type: String
                },
                addressLine2:{
                    type: String
                },
                district:{
                    type: String
                },
                city:{
                    type: String
                },
                pincode:{
                    type: Number,
                    validate: {
                        validator: function (value) {
                            return /^[0-9]{6}$/.test(value)
                        },
                        message: props => `${props.value} is not a valid Pincode.`
                    }
                },
                country: {
                    type: String,
                    default: 'India'
                }
            },
            // address object ends here -------------

            //socialInfo object starts here ------------------
            socialInfo: {
                facebookLink: {
                    type: String,
                },
                githubLink: {
                    type: String,
                },
                linkedinLink: {
                    type: String,
                }
            },
            // socialInfo ends here -----------------

            fatherName: {
                type: String
            },
            motherName: {
                type: String
            },
            contact: {
                type: Number,
                validate: {
                    validator: function (value) {
                        return /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/.test(value)
                    },
                    message: props => `${props.value} is a not valid phone number.`
                }
            }
        },
        //profile ends here -----------------------------------------

        //otherDetails starts here ----------------------------------
        otherDetails: {
            isAdmin: {
                type: Boolean,
                default: false
            },
            isMember: {
                type: Boolean,
                default: false
            },
            emailVerified: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            blocked: {
                type: Boolean,
                default: false
            }
        },
        // otherDetails ends here ----------------------------
        salt: String,
        resetPasswordLink: {
            data: String,
            default: ''
        }
    }
)

// virtual password
userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  });

// methods
userSchema.methods = {

    //compare password from user and hashed_password
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

    //encrypt password
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },

  //generate salt
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  }
};

module.exports = mongoose.model('User', userSchema);
