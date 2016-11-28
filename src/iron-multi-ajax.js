class IronMultiAjax {

  beforeRegister() {
    this.is = 'iron-multi-ajax';
    this.properties = {
      urls: Array,
      auto: {
        type: Boolean,
        value: false,
      },
      method: String,
      headers: Object,
      loading: {
        type: Boolean,
        value: false,
        notify: true,
      },
      handleAs: {
        type: String,
        value: 'json',
      },
      contentType: String,
      bodies: Array,
      sync: {
        type: Boolean,
        value: false,
      },
    };

    this.observers = [
      '_requestOptionsChanged(urls, method, headers, auto, handleAs)',
    ];
  }

  get behaviors() {
    return [
    ];
  }

  generateRequest() {
    this.loading = true;

    const promises = this.urls.map((url, key) => {
      const ironRequest = document.createElement('iron-request');

      const params = {
        url,
        method: this.method,
        headers: this.headers,
        handleAs: this.handleAs
      };

      if (this.contentType) {
        params.headers['content-type'] = this.contentType;
      }

      if (this.bodies && this.bodies.length > 0 && this.bodies[key]) {
        params.body = this.bodies[key];
      }

      if (this.sync) {
        return { ironRequest, params, };
      } else {
        return ironRequest.send(params);
      }
    });

    if (this.sync) {
      const responses = [];
      async.eachSeries(promises, (ironRequestObject, cb) => {
        ironRequestObject.ironRequest.send(ironRequestObject.params).then(response => {
          responses.push(response.response);
          cb();
        }).catch(cb);
      }, (error) => {
        if (error) {
          this.loading = false;
          this.fire('error', { error });
        } else {
          this.loading = false;
          this.fire('response', { response: responses });
        }
      });
    } else {
      return Promise.all(promises).then((responses) => {
        const responsesData = responses.map(response => response.response);
        this.loading = false;
        this.fire('response', { response: responsesData });
      }).catch((error) => {
        this.loading = false;
        this.fire('error', { error });
      });
    }
  }

  _requestOptionsChanged() {
    if (this.auto) {
      this.generateRequest();
    }
  }
}

Polymer(IronMultiAjax);
