### Communication html (parent) <-> iframe (child) in CORS environment

add to host file

```bash
C:\Windows\System32\drivers\etc\hosts

127.0.0.1 test-parent.com
127.0.0.1 test-child.com
```

url for the test app
```bash
http://test-parent.com/ ... /main.html
http://test-child.com/ ... /iframe.html
```

check the url of the iframe-tag
```javascript
  <main class="iframe-container">
    <iframe id="iframe" class="iframe" src="http://test-child.com/JavaScript/redirect/iframe.html" allow="autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; clipboard-read; clipboard-write" allowfullscreen></iframe>
  </main>
```

test the app -> alerts
```bash
"Click me" (footer): parent to child
"Click me message": child to parent
```
