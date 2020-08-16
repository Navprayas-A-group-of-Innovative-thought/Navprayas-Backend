var mongoose = require('mongoose');
var Schema =mongoose.Schema;

// userInfo Schema
var userInfoSchema = new Schema ({
/*    userId:{
        type:String,
        required:true
    },
*/
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
            type:Number,
            required:true
        }
    },
    address:{                             //address object
        houseNumber:{
            type:String,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        addressLine1:{
            type:String,
            required:true
        },
        addressLine2:{
            type:String,
            required:true
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
            required:true
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

//-------------------------------------------------------------------------------------------

//userInfoWithEducation Schema
var userInfoWithEducationSchema = new Schema ({
/*    userId:{
        type:String,
        required:true
    },
*/
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    dob:{                                 // YYYY-MM-DD format
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
            type:Number,
            required:true
        }
    },
    address:{                             //address object
        houseNumber:{
            type:String,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        addressLine1:{
            type:String,
            required:true
        },
        addressLine2:{
            type:String,
            required:true
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
            required:true
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
    },
    education:{                           //education object
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

// MTSE Form Schema
var mtseFormSchema = new Schema ({
    user:{
        type:userInfoWithEducationSchema,
        required:true
    },
    referenceNumber:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true,
        trim:true
    },
    transactionDate:{
        type:Date,
        required:true,
        trim:true
    },
    eventId:{
        type:String,
        required:true
    },
    questionPaperLang:{
        type:String,
        required:true
    },
    admitCardNumber:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

//-------------------------------------------------------------------------------

// Puzzle Race Form Schema
var puzzleRaceFormSchema = new Schema({
    user:{
        type:userInfoWithEducationSchema,
        required:true
    },
    referenceNumber:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true,
        trim:true
    },
    transactionDate:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    eventId:{
        type:String,
        required:true
    },
    admitCardNumber:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
});

//----------------------------------------------------------------------------------

// Free Hand Sketching Form Schema
var fhsFormSchema = new Schema({
    user:{
        type:userInfoSchema,
        required:true
    },
    referenceNumber:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true,
        trim:true
    },
    transactionDate:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    eventId:{
        type:String,
        required:true
    },
    admitCardNumber:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
});

//--------------------------------------------------------------------------------------

// Chess Form Schema
var chessFormSchema = new Schema({
    user:{
        type:userInfoSchema,
        required:true
    },
    referenceNumber:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true,
        trim:true
    },
    transactionDate:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    eventId:{
        type:String,
        required:true
    },
    haveChessBoard:{
        type:Boolean,
        required:true
    },
    admitCardNumber:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
});

//-------------------------------------------------------------------------------------

// Career Counselling Form Schema
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
            type:Number,
            required:true
        }
    },
    referenceNumber:{
        type:String,
        required:true
    },
    registrationDate:{
        type:Date,
        required:true,
        trim:true
    },
    eventId:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
});

//------------------------------------------------------------------------------------

//Rangotsav Form Schema
var rangotsavFormSchema = new Schema({
    user:{
        type:[userInfoSchema],
        required:true
    },
    referenceNumber:{
        type:String,
        required:true
    },
    registrationDate:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    eventId:{
        type:String,
        required:true
    },
    admitCardNumber:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
});

//---------------------------------------------------------------------------------

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