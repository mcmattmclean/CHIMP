// Can use this to gate an entire route
const middleware = {
	isLoggedIn: function(req, res, next){
	    if(req.isAuthenticated()){
	      return next();
	    }
	    res.redirect("/");
	}
}

module.exports = middleware;
