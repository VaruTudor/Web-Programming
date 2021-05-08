// function to populate the document
const body = document.querySelector("body");
(() => {
    body.innerHTML =
        `
        <a href="http://www.google.com">1.http://www.google.com</a>
        <a href="http://www.google.com">2.http://www.google.com</a>
        <a href="http://www.scs.ubbcluj.ro">3.http://www.scs.ubbcluj.ro</a>
        <a href="http://www.google.com">4.http://www.google.com</a>
        <a href="http://www.scs.ubbcluj.ro/webmail">5.http://www.scs.ubbcluj.ro/webmail</a>
        <a href="http://www.google.com">6.http://www.google.com</a>
        <a href="NOT http://www.scs.ubbcluj.ro">7.NOT http://www.scs.ubbcluj.ro</a>
        `
})()

const shouldNotStartWith = "http://www.scs.ubbcluj.ro";
// function to remove the anchor elements starting with shouldNotStartWith
function remove(){
    body.querySelectorAll("a").forEach(
        (aTag) => {
            if (aTag.getAttribute("href").startsWith(shouldNotStartWith)){
                body.removeChild(aTag);
            }
        }
    )
}

body.addEventListener("keydown",(event)=> {
    if(event.code === "KeyR"){
        remove();
    }
});