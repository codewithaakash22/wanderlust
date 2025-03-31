const User = require("../models/user.js");


module.exports.renderSignUpForm = (req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signup = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({
            username: username,
            email: email,
        });
    
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
            }
            req.flash("success", "Welcome to wanderlust!");
            res.redirect("/listings");

        });
       
        // console.log(registeredUser);
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
    
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login = async (req,res)=>{
    req.flash("success", "Welcome back to wanrderlust!");
     let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "Logout Successfully!");
        res.redirect("/listings");
    });
}