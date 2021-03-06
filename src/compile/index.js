var utils = require('../utils');
var Helper = require('../helper/index');

function Velocity(asts, config) {
  this.asts = asts;
  this.config = utils.mixin(
    {
      /**
       * if escapeHtml variable, is set true
       * $foo value will handle by escapeHtml
       */
      escape: false,
      // whiteList which no need escapeHtml
      unescape: {},
      valueMapper(value) {
        return value;
      },
      invalidReferenceHandler(ast, options) {
        if (options.isVal) {
          return options.isSilent ? '' : Helper.getRefText(ast)
        }
  
        return undefined;
      },
    },
    config
  );
  this._state = { stop: false, break: false };
  this.init();
}

Velocity.Helper = Helper;
Velocity.prototype = {
  constructor: Velocity
};

require('./blocks')(Velocity, utils);
require('./literal')(Velocity, utils);
require('./references')(Velocity, utils);
require('./set')(Velocity, utils);
require('./expression')(Velocity, utils);
require('./compile')(Velocity, utils);
module.exports = Velocity;
