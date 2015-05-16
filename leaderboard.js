PlayerList = new Mongo.Collection('players');

if (Meteor.isClient) {

  Template.leaderboard.helpers({
    
    'player': function() {
      return PlayerList.find();
    },
    
    'playerCount': function() {
      return PlayerList.find().count();
    }

  });

  Template.leaderboard.events({
    
    'click .player': function () {
      console.log("You clicked an li element");
    }

  });

}

if (Meteor.isServer) {

}