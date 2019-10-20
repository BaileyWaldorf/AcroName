console.log("IM IN");

function replaceText(node, text, replacementNodeTemplate) {
    if (node.nodeType == 3) {
        while (node) {
            var textIndex = node.data.indexOf(text), currentNode = node;
            if (textIndex == -1) {
                node = null;
            } else {
                // Split the text node after the text
                var splitIndex = textIndex + text.length;
                var replacementNode = replacementNodeTemplate.cloneNode(true);
                if (splitIndex < node.length) {
                    node = node.splitText(textIndex + text.length);
                    node.parentNode.insertBefore(replacementNode, node);
                } else {
                    node.parentNode.appendChild(replacementNode);
                    node = null;
                }
                currentNode.deleteData(textIndex, text.length);
            }
        }
    } else {
        var child = node.firstChild, nextChild;
        while (child) {
            nextChild = child.nextSibling;
            replaceText(child, text, replacementNodeTemplate);
            child = nextChild;
        }
    }
}

function replaceTextWithHtml(node, text, html) {
    var div = document.createElement("div");
    div.innerHTML = html;
    var templateNode = document.createDocumentFragment();
    while (div.firstChild) {
        templateNode.appendChild(div.firstChild);
    }
    replaceText(node, text, templateNode);
}


chrome.runtime.onMessage.addListener(
    function (acros, sender, sendResponse) {
        console.log(acros);
        
        var i;
        for(i=0; i < acros.length; i++)
        {
            console.log(acros[i].acronym + "test");
            var str = acros[i].acronym;

            replaceTextWithHtml(document.body, str, `<span style = "color:red; text-decoration:underline green;" data-tooltip="${acros[i].phrases[0].phrase}">${str}</span>`);
        }



        sendResponse({
            farewell: "goodbye"
        });
    });