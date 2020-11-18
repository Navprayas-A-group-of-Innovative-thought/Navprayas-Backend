var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var util = require('util');

//userInfoBase custom Schema constructor
var userInfoBase = function (paths) {   
    var commonInfoSchema = new Schema({                              
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        dob:{
            type:Date,
            required:true,
            trim:true
        },
        gender:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        contact:{                             //contact object
            primary:{
                type:Number,
                required:true
            },
            other:{
                type:Number
            }
        },
        address:{                             //address object
            houseNumber:{
                type:String
            },
            landmark:{
                type:String
            },
            addressLine1:{
                type:String,
                required:true
            },
            addressLine2:{
                type:String
            },
            district:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            country:{
                type:String,
                required:true,
                default:'India'
            },
            pincode:{
                type:Number,
                required:true
            }
        },
        fatherName:{
            type:String,
            required:true
        },
        motherName:{
            type:String,
            required:true
        }
    });
    
    commonInfoSchema.add(paths);
    return commonInfoSchema;
    
};

//-------------------------------------------------------------------------
//userInfoSchema here
var userInfoSchema = new userInfoBase({});

//-------------------------------------------------------------------------
//userInfoWithEducationSchema here
var userInfoWithEducationSchema = new userInfoBase ({
    education:{                                                             //education object
        class:{
            type:Number,
            required:true
        },
        school:{
            type:String,
            required:true
        },
        board:{
            type:String,
            required:true
        }
    }
});

//--------------------------------------------------------------------------------------
// base custom schema contructor for common fields in all forms
var base = function (paths) {      
    var commonSchema = new Schema({
        registrationDate:{
            type:Date,
            trim:true
        },
        eventId:{
            type:String,
            required:true
        },
        admitCardNumber:{
            type:String,
        },
        year:{
            type:Number,
        },
        formVerified:{
            type:Boolean,
            required:true,
            default:false
        },
        formSubmitted:{
            type:Boolean,
            required:true,
            default:false
        }
    });

    commonSchema.add(paths);
    return commonSchema;
};

//------------------------------------------------------------------------------------
// MTSE Form Schema STARTS here
var mtseFormSchema = new base ({
    user:{
        type:userInfoWithEducationSchema
    },
    transactionId:{
        type:String,
        trim:true
    },
    transactionDate:{
        type:Date,
        trim:true
    },
    orderId:{
        type:String,
    },
    paymentStatus:{
        type:String,
        default:'PENDING'
    },
    questionPaperLang:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
// MTSE Form Schema ends here
//-------------------------------------------------------------------------------
// Puzzle Race Form Schema STARTS here
var puzzleRaceFormSchema = new base({
    user:{
        type:[userInfoWithEducationSchema],
        validate: [arrayLimit, '{PATH} exceeds the limit of 3']
    },
    transactionId:{
        type:String,
        trim:true
    },
    transactionDate:{
        type:Date,
        trim:true
    },
    orderId:{
        type:String,
    },
    paymentStatus:{
        type:String,
        default:'PENDING'
    },
    category:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
// Puzzle Race Form Schema ENDS here
//----------------------------------------------------------------------------------
// Free Hand Sketching Form Schema STARTS here
var fhsFormSchema = new base({
    user:{
        type:userInfoSchema
    },
    transactionId:{
        type:String,
        trim:true
    },
    transactionDate:{
        type:Date,
        trim:true
    },
    orderId:{
        type:String,
    },
    paymentStatus:{
        type:String,
        default:'PENDING'
    },
    category:{
        type:String,
        required:true
    },
},{
    timestamps:true
});
// Free Hand Sketching Form Schema ENDS here
//--------------------------------------------------------------------------------------
// Chess Form Schema STARTS here
var chessFormSchema = new base({
    user:{
        type:userInfoSchema
    },
    transactionId:{
        type:String,
        trim:true
    },
    transactionDate:{
        type:Date,
        trim:true
    },
    orderId:{
        type:String,
    },
    paymentStatus:{
        type:String,
        default:'PENDING'
    },
    category:{
        type:String,
        required:true
    },
    haveChessBoard:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
});
// Chess Form Schema ENDS here
//------------------------------------------------------------------------------------
//Rangotsav Form Schema STARTS here
var rangotsavFormSchema = new base({
    user:{
        type:[userInfoSchema]
    },
    category:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
//Rangotsav Form Schema ENDS here
//-------------------------------------------------------------------------------------
// Career Counselling Form Schema STARTS here
var careerCounFormSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{                             //contact object
        primary:{
            type:Number,
            required:true
        },
        other:{
            type:Number
        }
    },
    address:{                             //address object
        houseNumber:{
            type:String
        },
        landmark:{
            type:String
        },
        addressLine1:{
            type:String,
            required:true
        },
        addressLine2:{
            type:String
        },
        district:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true,
            default:'India'
        },
        pincode:{
            type:Number,
            required:true
        }
    },
    registrationDate:{
        type:Date
    },
    eventId:{
        type:String
    },
    year:{
        type:Number
    },
    formVerified:{
        type:Boolean,
        required:true,
        default:false
    },
    formSubmitted:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
});
// Career Counselling Form Schema ENDS here
//---------------------------------------------------------------------------------

// arrayLimit function to set the team size to 3
function arrayLimit(val) {
    return val.length <= 3;
  }

// Export Form Models
var mtseUsers = mongoose.model('mtseUsers',mtseFormSchema);                            //MTSE model
var puzzleRaceUsers = mongoose.model('puzzleRaceUsers',puzzleRaceFormSchema);          //Puzzle Race model
var fhsUsers = mongoose.model('fhsUsers',fhsFormSchema);                               //Free Hand Sketching model
var chessUsers = mongoose.model('chessUsers',chessFormSchema);                         //Chess Form Model
var careerCounUsers = mongoose.model('careerCounUsers',careerCounFormSchema);          //career counselling form model
var rangotsavUsers = mongoose.model('rangotsavUsers',rangotsavFormSchema);             //rangotsav form model

module.exports ={
    mtseUsers:mtseUsers,
    puzzleRaceUsers:puzzleRaceUsers,
    fhsUsers:fhsUsers,
    chessUsers:chessUsers,
    careerCounUsers:careerCounUsers,
    rangotsavUsers:rangotsavUsers
};