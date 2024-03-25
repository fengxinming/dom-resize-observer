# dom-resize-observer

> DOM elements resize observer.

## Install

```bash
$ npm install --save-dev dom-resize-observer
```

## Usage

```js
import DOMResizeObserver from 'dom-resize-observer';

const resizeObserver = new DOMResizeObserver(entries => {
  for (let entry of entries) {
    console.log('DOMResizeObserver', entry);
  }
});
resizeObserver.observe(document.getElementById('div'));
```