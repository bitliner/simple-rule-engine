let SimpleRuleEngine = require('../');

simpleRuleEngine = new SimpleRuleEngine();

simpleRuleEngine.add('the _w_ _w_ would be perfect');

console.log(simpleRuleEngine.run('the desktop app would be perfect'));