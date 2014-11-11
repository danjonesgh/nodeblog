var Post = require('./schema.js').Post;


// use this to determine which month/years you should show
// as a link in the archives, if there are posts from 10/2014,
// add a link in the sidebar
var getMonthlyPosts = function() {
	var monthYears = [];

	Post.find(function(err, item) {
		if(err) 
			console.log('error finding posts: ' + err);

		if(item) {
			for(var i = 0; i < item.length; i++) {
				var dateObj = {
					month: item[i].date.getMonth(),
					year: item[i].date.getFullYear()
				}
				monthYears.push(dateObj);
			}
			console.log('monthyears');
			console.log(monthYears);
		}
	});

}

function getMonth(monthNum) {
switch(expression) {
    case 1:
        return 'January';
        break;
    case 2:
    		return 'February';
        break;
    case 3:
        return 'March';
        break;
    case 4:
        return 'April';
        break;
    case 5:
        return 'May';
        break;
    case 6:
        return 'June';
        break;
    case 7:
        return 'July';
        break;
    case 8:
        return 'August';
        break;
    case 9:
        return 'September';
        break;
    case 10:
        return 'October';
        break;
    case 11:
        return 'November';
        break;
    case 12:
        return 'December';
        break;
}
}
module.exports.getMonthlyPosts = getMonthlyPosts;

