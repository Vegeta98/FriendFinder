// Import friends data
var friendsData = require("../data/friends");

// This array will store user scores based off answers to survey
var userScores = {};

module.exports = function(app) {
  // Process get request for friendsData
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // Process post request for friendsData
  app.post("/api/friends", function(req, res) {
    //console.log(req.body);
    friendsData.push(req.body);
    //console.log(friendsData);

    // Get every user score except for the last user
    for (var i = 0; i < friendsData.length-1; i++){
      var key = friendsData[i].name;
      userScores[key] = friendsData[i]['scores[]'];
    }

    // sleep time expects milliseconds
    function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
    }

    // Now get the most compatible friend after waiting 2 seconds
    sleep(2000).then(() => { 
      res.json(getMostCompatibleFriend());
    });
  });

  function getMostCompatibleFriend() {
    var mostRecentUserScore = friendsData[friendsData.length-1]['scores[]'];
    
    //console.log(mostRecentUserScore);
    //console.log(userScores);
    var difference = 0;
    for (var i = 0; i < friendsData.length; i++) {
      // Iterate through user scores
      var otherUser = friendsData[i]['scores[]'];
      // Calculate the difference relative to most recent user
      for (var j = 0; j < 10; j++) {
        if (mostRecentUserScore[j] !== otherUser[j]) {
          difference += Math.abs(parseInt(mostRecentUserScore[j]) - parseInt(otherUser[j]));
        }
      }

      // Store differences in object
      var key = friendsData[i].name 
      friendsData[i].totalDifference = difference;
      difference = 0;
    }

    // Sort friends data by ascending order
    friendsData.sort(function(a, b) {
      return parseFloat(a.totalDifference) - parseFloat(b.totalDifference);
    });
    
    console.log(friendsData);
    // Return the second element user since sort includes the most recent user
    return(friendsData[1]);
  }

}