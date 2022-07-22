const url = "http://localhost:3000/comments"
const url2 = "http://localhost:3000/currentUser"


export async function postInfo(){
    try {
        const response = await fetch(url)
        const data = response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function currentUser(){
    try {
        const response = await fetch(url2)
        const data = response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function submitComment(comment){
    try {
        await fetch(url,{
            method: "POST",
            body:JSON.stringify(comment),
            headers:{
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function borrar(id){
    try {
        await fetch(`${url}/${id}`,{
            method:"DELETE"
        })
    } catch (error) {
        console.log(error)
    }
}

export async function edit(obj){
    try {
        await fetch(`${url}/${obj.id}`,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}