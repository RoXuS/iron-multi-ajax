'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IronMultiAjax = function () {
  function IronMultiAjax() {
    _classCallCheck(this, IronMultiAjax);
  }

  _createClass(IronMultiAjax, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'iron-multi-ajax';
      this.properties = {
        urls: Array,
        auto: {
          type: Boolean,
          value: false
        },
        method: String,
        headers: String,
        loading: {
          type: Boolean,
          value: false
        },
        handleAs: {
          type: String,
          value: 'json'
        }
      };

      this.observers = ['_requestOptionsChanged(urls, method, headers, auto, handleAs)'];
    }
  }, {
    key: 'generateRequest',
    value: function generateRequest() {
      var _this = this;

      this.loading = true;

      var promises = this.urls.map(function (url) {
        var ironRequest = document.createElement('iron-request');
        Polymer.dom(_this.root).appendChild(ironRequest);
        ironRequest.completes.then(function () {
          return Polymer.dom(_this.root).removeChild(ironRequest);
        });
        var params = { url: url, method: _this.method, headers: _this.headers, handleAs: _this.handleAs };
        return ironRequest.send(params);
      });

      return Promise.all(promises).then(function (responses) {
        var responsesData = responses.map(function (response) {
          return response.response;
        });
        _this.loading = false;
        _this.fire('response', { response: responsesData });
      }).catch(function (error) {
        _this.loading = false;
        _this.fire('error', { error: error });
      });
    }
  }, {
    key: '_requestOptionsChanged',
    value: function _requestOptionsChanged() {
      if (this.auto) {
        this.generateRequest();
      }
    }
  }, {
    key: 'behaviors',
    get: function get() {
      return [];
    }
  }]);

  return IronMultiAjax;
}();

Polymer(IronMultiAjax);