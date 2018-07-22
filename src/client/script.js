fetch('/login', {method:'POST', credentials:'same-origin'})
.then(()=>{
    let ws = io();

    ws.on('first_visit', ()=>{
        console.log("First time coming to this page")
    })

    ws.on('return_visit', ()=>{
        console.log("Returning to the place")
    })
})
.catch((err)=>{console.log(err.message)})

