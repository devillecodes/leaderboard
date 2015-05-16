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

}

if (Meteor.isServer) {

}