PlayerList = new Mongo.Collection('players');

if (Meteor.isClient) {

  Meteor.subscribe('thePlayers');

  Template.leaderboard.helpers({
    
    'player': function() {
      return PlayerList.find({}, {sort: {score: -1, name: 1}});
    },
    
    'playerCount': function() {
      return PlayerList.find({}).count();
    },

    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected";
      }
    },

    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
     
      return PlayerList.findOne(selectedPlayer);
    }

  });

  Template.leaderboard.events({
    
    'click .player': function () {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },

    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('incrementPlayerScore', selectedPlayer, 5);
    },

    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('incrementPlayerScore', selectedPlayer, -5);
    },

    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    }

  });

  Template.addPlayerForm.events({
    
    'submit form': function(event) {
      event.preventDefault();

      var playerName = event.target.playerName.value;
      var playerScore = parseInt(event.target.playerScore.value);

      var promptResult = confirm("Are you sure you want to add player '" + playerName + "'?");

      if (promptResult) {  
        Meteor.call('insertPlayerData', playerName, playerScore);

        event.target.playerName.value = "";
        event.target.playerScore.value = "";
      }      
    }

  });

}

if (Meteor.isServer) {
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
}