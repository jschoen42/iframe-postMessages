### Communication html (parent) <-> iframe (child) in CORS environment

```bash
 main.html
 js/postMessagesParent.js

 iframe.html
 js/postMessageChild.js
```

 main.html:

```html
...
<main class="iframe-container">
    <iframe ... src="... /iframe.html " ... ></iframe>
</main>
...
 ```

 to simulate cors with localhost >> add to host file

```bash
C:\Windows\System32\drivers\etc\hosts
127.0.0.1 test-parent.com
127.0.0.1 test-child.com
```

now main.html and iframe.html can be located in different domains

```bash
main.html -> http://test-parent.com
frame.html -> http://test-child.com
```

modify the **src attribute** to fit your path, e.g.

```html
<main class="iframe-container">
  <iframe id="iframe" class="iframe" src="http://test-child.com/JavaScript/postMessages/iframe.html" allow="autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; clipboard-read; clipboard-write" allowfullscreen></iframe>
</main>
```

url to test the app

```bash
http://test-parent.com/ ... /main.html

```

- function calls between main and iframe is **not allowed**  -> **cors error**

- postMessage() between main and iframe is **allowed**

[more infos..](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
