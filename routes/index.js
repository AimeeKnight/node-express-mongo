
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello World!' });
};

exports.userlist = function(db) {
  return function(req, res) {
    var collection = db.get('usercollection');
    collection.find({},{},function(err,docs){
      res.render('userlist', {
          "userlist" : docs
      });
    });
  };
};

exports.newuser = function(req, res){
	res.render('newuser', { title: 'Add New User' });
};

exports.adduser = function(db){
  return function(req, res){

    //Get form vals from name attribute
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    //Set collection
    var collection = db.get('usercollection')

    //Submit to the DB
    collection.insert({
      "username" : userName,
      "useremail" : userEmail
    }, function(err, docs){
      if(err) {
        res.send("There was a problem adding the information to the database.");
      } else {
        //set header so address bar doesn't still say /adduser
        res.location("userlist");
        //forward to success page
        res.redirect("userlist");
      }
    });
  }
}