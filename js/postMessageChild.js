const child_domain  = "http://tutorial.test";
const parent_domain = "http://vendor.test";

// Send message to parent

function sendMessageToParent( message ) {
  const myMessage = {
    message: message,
    timestamp: new Date().toISOString()
  }

  parent.postMessage(myMessage, parent_domain);
  // console.log("send message to parent2, event.data");
}

// Receive message from parent

window.addEventListener('message', function(event) {
  if ( new URL(event.origin).host != new URL(parent_domain).host ) {
    return;
  }

  console.log("from parent -> event.data", event.data)
  alert( event.data.message )
}, false);
