var dscc = require('@google/dscc');
var threeScatter = require('./threeScatter.js');

var subscribe = function(message){
  var graph = new threeScatter(message);
  return graph;
}
dscc.subscribeToData(subscribe, {transform: dscc.tableTransform});
