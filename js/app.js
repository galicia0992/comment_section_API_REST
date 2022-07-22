import { currentUser, postInfo, submitComment, borrar, edit } from "./API.js";
const contenedor = document.querySelector(".container")
const input = document.querySelector("#comment")
const send = document.querySelector("#send")



send.addEventListener("click", sendComment)

const posteos = async() =>{
    const posteosInfo = await postInfo()
    const usuario = await currentUser()
    posteosInfo.forEach(item =>{
        const {id, content, createdAt, score, user, replies} = item
        if(user.username == usuario.username){
            contenedor.innerHTML += `
        <div class="post" id="${id}" data-user=${user.username}>
    <div class="counter">
      <p>+</p>
      <p>${score}</p>
      <p>-</p>
    </div>
    <div class="postInfo">
      <div class="headInfo">
        <div class="avatarInfo">
          <img src="${user.image.png}" alt="" srcset="">
          <p>${user.username}</p>
          <p>${createdAt}</p>
        </div>
        <div class="reply">
        <p class="delete" id ="${id}">Delete</p>
          <img src="./images/icon-edit.svg" alt="" class="rep">
          <p class="edit" id="${id}">Edit</p>
        </div>
      </div>
      <h4>
        ${content}
      </h4>
    </div>
  </div>`
        }
        else{
            contenedor.innerHTML += `
        <div class="post" id="${id}" data-user=${user.username}>
    <div class="counter">
      <p>+</p>
      <p>${score}</p>
      <p>-</p>
    </div>
    <div class="postInfo">
      <div class="headInfo">
        <div class="avatarInfo">
          <img src="${user.image.png}" alt="" srcset="">
          <p>${user.username}</p>
          <p>${createdAt}</p>
        </div>
        <div class="reply">
          <img src="./images/icon-reply.svg" alt="" class="rep">
          <p id="${id}">reply</p>
        </div>
      </div>
      <h4>
        ${content}
      </h4>
    </div>
  </div>`
        }
        
  const todo = document.querySelectorAll(".container .post")

  todo.forEach(item3 =>{
    const idPost = document.getElementById(`${item3.id}`)
    replies.forEach(item2 =>{
        const {id, content, createdAt, score, user} = item2
        if(item2.replyingTo == item3.dataset.user){
            idPost.insertAdjacentHTML("afterend", 
            `<div class="post replyes" id="${id}" data-user=${user.username}>
            <div class="counter">
              <p>+</p>
              <p>${score}</p>
              <p>-</p>
            </div>
            <div class="postInfo">
              <div class="headInfo">
                <div class="avatarInfo">
                  <img src="${user.image.png}" alt="" srcset="">
                  <p>${user.username}</p>
                  <p>${createdAt}</p>
                </div>
                <div class="reply">
                  <img src="./images/icon-reply.svg" alt="" class="rep">
                  <p id="${id}">reply</p>
                </div>
              </div>
              <h4>
                @${item.user.username} ${content}
              </h4>
            </div>
          </div>`
          ) 
        }
      })
    })
    const todo2 = document.querySelectorAll(".container .replyes")
        todo2.forEach(item4 =>{
            const idPost = document.getElementById(`${item4.id}`)
        replies.forEach(item2 =>{
            const {id, content, createdAt, score, user} = item2
            if(item2.replyingTo == item4.dataset.user){
                idPost.insertAdjacentHTML("afterend", 
                `<div class="post replyes" id="${id}" data-user=${user.username}>
                <div class="counter">
                  <p>+</p>
                  <p>${score}</p>
                  <p>-</p>
                </div>
                <div class="postInfo">
                  <div class="headInfo">
                    <div class="avatarInfo">
                      <img src="${user.image.png}" alt="" srcset="">
                      <p>${user.username}</p>
                      <p>${createdAt}</p>
                    </div>
                    <div class="reply">
                      <img src="./images/icon-reply.svg" alt="" class="rep">
                      <p id="${id}">reply</p>
                    </div>
                  </div>
                  <h4>
                    @${item.user.username} ${content}
                  </h4>
                </div>
              </div>`) 
            }
          })
        })
    })
    const del = document.querySelectorAll(".delete")
    del.forEach(item =>{
        item.addEventListener("click", eliminar)
    })
    const ed = document.querySelectorAll(".edit")
    ed.forEach(item =>{
        item.addEventListener("click", editar)
    })
    const reply = document.querySelectorAll(".reply p")
    reply.forEach(item =>{
      item.addEventListener("click", replica)
    })
    
}
posteos()
function sendComment(){
    const comment = {
        content: input.value,
      createdAt: "a moment ago",
      score: 0,
      user: {
        image: { 
          png: "./images/avatars/image-juliusomo.png",
        },
        username: "juliusomo"
      },
      replies: []
    }

    submitComment(comment)
}

function eliminar(e){
    const borr = parseInt(e.target.id)
    borrar(borr)
}
async function replica(e){
  e.preventDefault()
    const posteosEdit = await postInfo()
    posteosEdit.forEach(item =>{
      console.log(item)
        if(item.id == e.target.id){
            input.value = `@${item.user.username}`
        }
    })
}

async function editar(e){
    e.preventDefault()
    const posteosEdit = await postInfo()
    posteosEdit.forEach(item =>{
        if(item.id == e.target.id){
            input.value = item.content
            input.id = item.id
            send.id = item.id
        }
        send.removeEventListener("click", sendComment)
    })
    
    const postEdit = document.querySelector(".btn-primary")
    postEdit.addEventListener("click", postearEdit)
    
    async function postearEdit(e){
        e.preventDefault()
        const posteosEdit = await postInfo()
        posteosEdit.forEach(item =>{
            const {user} = item
            if(e.target.id == item.id){
                const obj = {
                    content: `${input.value}`,
                    createdAt: "a moment ago",
                    score: 0,
                    user: {
                        image: {
                            png: "./images/avatars/image-juliusomo.png"
                        },
                        username: `${user.username}`
                    },
                    replies: [],
                    id: e.target.id
                }
                edit(obj)
            }
        })
    }
}