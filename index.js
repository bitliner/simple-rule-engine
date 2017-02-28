'use strict';
let fs = require('fs');
let Logger = require('logb').getLogger(module.filename);
let peg = require("pegjs");



class SimpleRuleEngine {
  constructor() {
    this.parser = peg.generate(fs.readFileSync(require('path').resolve(__dirname, './peg.txt'), {
      encoding: 'utf8'
    }));
    this.rules = [];
  }
  build(rules) {
    this.rules = rules;
  }
  add(rule) {
    Logger.debug('Adding a rule:', '"' + rule + '"');
    this.rules.push(rule);
  }
  run(text) {
    return this.rules
      .map((rule) => {
        let regex;
        let matches;

        Logger.debug('Applying the rule', '"' + rule + '"', 'on text', '"' + text + '"');

        regex = this.parser.parse(rule);
        regex = new RegExp(regex, 'gi');
        matches = regex.exec(text);
        matches = matches.slice(1);
        return matches;
      });
  }
}

module.exports = SimpleRuleEngine;