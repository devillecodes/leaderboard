PlayerList = new Mongo.Collection('players');

if (Meteor.isClient) {

  Template.leaderboard.helpers({
    
    'player': function() {
      return PlayerList.find({}, {sort: {score: -1, name: 1}});
    },
    
    'playerCount': function() {
      return PlayerList.find().count();
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
      PlayerList.update(selectedPlayer, {$inc: {score: 5}});
    },

    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(selectedPlayer, {$inc: {score: -5}});
    }

  });

}

if (Meteor.isServer) {

}