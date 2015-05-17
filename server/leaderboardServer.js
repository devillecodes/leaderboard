Meteor.publish('thePlayers', function() {
  var currentUserId = this.userId;

  return PlayerList.find({createdBy: currentUserId});
  });

  Meteor.methods({

  'insertPlayerData': function(playerName, playerScore) {
    var currentUserId = Meteor.userId();

    PlayerList.insert({
      name: playerName,
      score: playerScore,
      createdBy: currentUserId
    });
  },

  'removePlayerData': function(selectedPlayer) {
    PlayerList.remove(selectedPlayer);
  },

  'incrementPlayerScore': function(selectedPlayer, incrVal) {
    PlayerList.update(selectedPlayer, {$inc: {score: incrVal}});
  }

});