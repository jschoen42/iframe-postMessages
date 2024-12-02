const parentDomain = "http://test-parent.com";
const childDomain  = "http://test-child.com";

const iframe = document.getElementById('iframe');

// Send message to iframe

function sendMessageToChild( message ) {
  const myMessage = {
    message: message,
    timestamp: new Date().toISOString()
  }

  iframe.contentWindow.postMessage(myMessage, childDomain);
  // console.log("send message to child", myMessage);
}

// Receive message from iframe

window.addEventListener('message', function(event) {
  if ( new URL(event.origin).host != new URL(childDomain).host ) {
    return;
  }

  console.log("from child -> event.data", event.data )
  this.alert( event.data.message )
}, false);
