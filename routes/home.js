var Post = require('./schema.js').Post;


// use this to determine which month/years you should show
// as a link in the archives, if there are posts from 10/2014,
// add a link in the sidebar
var getMonthlyPosts = function(callback) {
    var monthYears = [];
    Post.find(function(err, item) {
        if(err) 
            console.log('error finding posts: ' + err);

        if(item) {
            for(var i = 0; i < item.length; i++) {
                var dateObj = {
                    month: "",
                    monthNum: "",
                    year: ""
                };
                if(item[i].date.getMonth()) {
                    var month = getMonth(item[i].date.getMonth());
                    dateObj.month = month;
                    dateObj.monthNum = item[i].date.getMonth()+1;
                    dateObj.year = item[i].date.getFullYear();
                }
                else {
                    // do this in case date is unix timestamp
                    var month = getMonth(new Date(item[i].date).getMonth());
                    dateObj.month = month;
                    dateObj.monthNum = new Date(item[i].date).getMonth()+1;
                    dateObj.year = new Date(item[i].date).getFullYear();
                }
                if(!inArray(monthYears, dateObj))
                    monthYears.push(dateObj);
            }
            //console.log('monthyears');
            //console.log(monthYears);
            callback(monthYears);
        }
    });
}

function inArray(array, needle) {
    var found = false;
    if(array.length == 0)
        return found;

    for(var i = 0; i < array.length; i++) {
        if(array[i].month == needle.month 
            && array[i].year == needle.year) {
            found = true;
        }
    }
    return found;
}

function getMonth(monthNum) {
// add one, months go 0-11
switch(monthNum+1) {
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

