const parentDomain = "http://test-parent.com";
const childDomain  = "http://test-child.com";

// Send message to parent

function sendMessageToParent( message ) {
  const myMessage = {
    message: message,
    timestamp: new Date().toISOString()
  }

  parent.postMessage(myMessage, parentDomain);
  // console.log("send message to parent2, event.data");
}

// Receive message from parent

window.addEventListener('message', function(event) {
  if ( new URL(event.origin).host != new URL(parentDomain).host ) {
    return;
  }

  console.log("from parent -> event.data", event.data)
  alert( event.data.message )
}, false);
