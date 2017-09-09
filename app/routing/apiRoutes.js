// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");
function calcTotalDifference(friend1Answers, friend2Answers){
  var totalDifference = 0;
  // $.each(friend2Answers, function(index, value){
  //   totalDifference += Math.abs(value - friend1Answers[index]);
  // })
  for(var i = 0; i < friend2Answers.length; i++){
    totalDifference += Math.abs(friend2Answers[i] - friend1Answers[i]);

  }
  return totalDifference;
  console.log("total diff: " + totalDifference)
};
function findMatchFunction(newFriend){
  var matchIndex = -1;
  var minDiff = 10000000;

  
  for(var i = 0; i < friendsData.length; i++){
    var curDiff = calcTotalDifference(friendsData[i].scores, newFriend.scores);
    if (minDiff > curDiff){
      minDiff = curDiff;
      matchIndex = i;
    }
  }
  return matchIndex;


};
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
      // console.log(req.body);
      //find match, then
      
      //res.json(friendsDat)

      
      res.json(friendsData[findMatchFunction(req.body)]);
      friendsData.push(req.body);
    
  });


 
};
