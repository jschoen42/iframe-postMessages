const child_domain  = "http://tutorial.test";
const parent_domain = "http://vendor.test";

const iframe = document.getElementById('iframe');

// Send message to iframe

function sendMessageToChild( message ) {
  const myMessage = {
    message: message,
    timestamp: new Date().toISOString()
  }

  iframe.contentWindow.postMessage(myMessage, child_domain);
  // console.log("send message to child", myMessage);
}

// Receive message from iframe

window.addEventListener('message', function(event) {
  if ( new URL(event.origin).host != new URL(child_domain).host ) {
    return;
  }

  console.log("from child -> event.data", event.data )
  this.alert( event.data.message )
}, false);
