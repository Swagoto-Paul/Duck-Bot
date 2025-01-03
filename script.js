const user=document.querySelector(".input textarea");
const btn=document.querySelector(".input button");
const chatbox=document.querySelector(".chatbox");
const key="AIzaSyB3ddAtxDvke49b-8JQVUkJhDMrNXh_MAo";

function chatlist(msg,cl){
    const li=document.createElement("li");
    li.classList.add("chat",cl);
    let content=cl==="outgoing"?`<p></p>`:`<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    li.innerHTML=content;
    li.querySelector("p").textContent=msg;
    return li;
}

function response(ans){
    const api=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const msg_incoming=ans.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            contents: [{ 
            role: "user", 
            parts: [{ text: text }] 
            }] 
        }),
    };

    fetch(api,requestOptions).then(res=> res.json()).then(data =>{
        msg_incoming.textContent = data.candidates[0].content.parts[0].text;
    }).catch((error)=>{
        msg_incoming.textContent ="Oops !!! Something went wrong please try again."
    }).finally(() => chatbox.scrollTo(0,chatbox.scrollHeight));
}

function input(){
    text=user.value.trim();
    // console.log(text);
    if(!text)
        return;
    user.value="";
    chatbox.appendChild(chatlist(text,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);

    setTimeout(()=>{
        ans=chatlist("Thinking....","incoming");
        chatbox.appendChild(ans);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        response(ans);
    },200);
}

btn.addEventListener("click",input);