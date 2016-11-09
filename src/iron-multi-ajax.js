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
      headers: String,
      loading: {
        type: Boolean,
        value: false,
        notify: true,
      },
      handleAs: {
        type: String,
        value: 'json',
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

    const promises = this.urls.map((url) => {
      const ironRequest = document.createElement('iron-request');
      Polymer.dom(this.root).appendChild(ironRequest);
      ironRequest.completes.then(() => Polymer.dom(this.root).removeChild(ironRequest));
      const params = { url, method: this.method, headers: this.headers, handleAs: this.handleAs };
      return ironRequest.send(params);
    });

    return Promise.all(promises).then((responses) => {
      const responsesData = responses.map(response => response.response);
      this.loading = false;
      this.fire('response', { response: responsesData });
    }).catch((error) => {
      this.loading = false;
      this.fire('error', { error });
    });
  }

  _requestOptionsChanged() {
    if (this.auto) {
      this.generateRequest();
    }
  }
}

Polymer(IronMultiAjax);
