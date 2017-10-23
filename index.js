var jsonfile = require('jsonfile');
var argv = require( 'argv' );
var file = './tmp/data.json';
var config = require('./config')
var InstagramPosts, streamOfPosts;
InstagramPosts = require('instagram-screen-scrape').InstagramPosts;

var data = {
	comments: [],
};

streamOfPosts = new InstagramPosts({
	username: config.instagramUser
});

streamOfPosts.on('data', (post) => {
	data.comments.push({
		id: post.id,
		text: post.text,
		media: post.media,
	});
	console.log(data.comments.length);
});

streamOfPosts.on('end', () => {
	jsonfile.writeFileSync(file, data);
	console.log('done');
	console.log(data);
});
