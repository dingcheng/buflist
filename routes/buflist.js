var mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	User = mongoose.model('User');

//Home page
exports.home=function(req,res){
	res.render('home', {title: 'Buf\'s List'});
};

//Searching handler
exports.search_postreq=function(req,res){
	if('post' in req.body)
		res.redirect('/newpost');
	res.send({result:'to be implemented.'});
}

exports.newpost=function(req,res){
	res.render('newpost',{title:'发布信息'});
}

exports.newpost_postreq=function(req,res){
	if (req.body.submit=='取消') {
		res.redirect('/');
	};
	var post = req.body;
	new Post({
		title: post.title,
		content: post.content,
		email: post.email,
		address: post.address,
		zip: post.zipcode,
		tags: post.tags.split('#'),
		cellnum: post.cellnum,
	}).save(function(err, result){
		if(err)
			res.render('err',{title: "500 - Internal Server Error", errmsg:'Cannot save data to db.', showFullNav: false, status: 404, url: req.url });
		else
			res.send({result:'posting succeeded.'});
	})
}

exports.tagshow=function(req,res){
	var tagslist = req.params.tag.split(/\s+/);
	res.send(tagslist);
}