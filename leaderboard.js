PlayerList = new Mongo.Collection('players');

if (Meteor.isClient) {

  Template.leaderboard.helpers({
    
    'player': function() {
      return PlayerList.find();
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
    }

  });

  Template.leaderboard.events({
    
    'click .player': function () {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    }

  });

}

if (Meteor.isServer) {

}