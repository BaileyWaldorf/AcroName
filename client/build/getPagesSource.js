console.log("loaded script onto page");

function DOMtoString() {
  var html = document.body.innerText;
  return html;
}

chrome.runtime.sendMessage({
  action: "getSource",
  source: DOMtoString()
});