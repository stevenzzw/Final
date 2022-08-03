let url = "http://localhost:3000/todos"

const getData = (url) => {
    return fetch(url).then(res => res.json())
}

let data = {

    "title": "Buy a car",
    "completed": false
}


// http://localhost:3000/todos
const createData = (url, data) => {
    const { id, title, completed } = data;

    fetch(url, {
        method: "POST",
        body: JSON.stringify({

            title: title,
            completed: completed
        }),
        headers: {
            "Content-Type": "application/json", charset: "utf8"
        }
    })

}


//http://localhost:3000/todos/{id}
const updateData = (url, data) => {
    const { title, completed } = data

    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            title: title,
            completed: completed

        }),
        headers: {
            "Content-Type": "application/json", charset: "utf8"
        }
    })

}
const patchData = (url, data) => {
    const { title, completed } = data
    console.log(newUrl)
    fetch(url, {
        method: "PATCH",
        body: JSON.stringify({

            completed: completed

        }),
        headers: {
            "Content-Type": "application/json", charset: "utf8"
        }
    })

}


//http://localhost:3000/todos/{id}
const deleteData = (url) => {
    fetch(url, {
        method: "DELETE",
    })
}

const btn = document.querySelector('button')

btn.onclick = () => {
    let title = document.getElementById("title").value
    const newTodo = { title: title, completed: false }
    createData("http://localhost:3000/todos", newTodo)

    title = ''
}

const todos = document.querySelector(".content-item");

const generateData = () => {
    getData("http://localhost:3000/todos").then(json => {
        const item = json.map(item => {
            if (!item.completed) {
                const{id,completed,title}=item
                console.log(id,completed,title)
                return `
                <div class="item item-uncompleted">
                <h1 id=h1num${item.id}  onclick="handleCompleted(${id},${completed},${title})">${item.title}</h1>
                <input type="text" id=inputNum${item.id}  class="inputunseen"/>
                <div class="btn-group">
                <button class="btn btn-editItem" onclick="editItem(${item.id},${item.completed})"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                <button class="btn btn-delItem" onclick="delItem(${item.id})"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button>
                </div>
                </div>
                
            `}
            else {
                
                return `
                <div class="item">
                <h1 id=h1num${item.id} class="item-completed"  onclick="handleCompleted(${item.id},${item.completed})">${item.title}</h1>
                <input type="text" id=inputNum${item.id}  class="inputunseen"/>
                <div class="btn-group">
                <button class="btn btn-editItem" onclick="editItem(${item.id},${item.completed})"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                <button class="btn btn-delItem" onclick="delItem(${item.id})"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button>
                </div>
                </div>
                
            
        `

            }
        }).join("");

        todos.innerHTML = item;
    })
}




generateData()

function delItem(id) {
    let newUrl = [url, id].join("/")
    deleteData(newUrl)

}

function editItem(id, completed) {
    let h1Id = ["h1num", id].join("")
    let inputId = ["inputNum", id].join("")

    let display = document.getElementById(h1Id).style.display

    console.log(completed)


    if (display == "none") {
        document.getElementById(h1Id).style.display = "block";
        document.getElementById(inputId).style.display = "none"
        let updateItem = document.getElementById(inputId).value
        let newUrl = [url, id].join("/")
        let newDate = {
            id: id,
            title: updateItem,
            completed: completed
        }

        updateData(newUrl, newDate)

    }
    else {
        document.getElementById(h1Id).style.display = "none"
        document.getElementById(inputId).style.display = "block"


    }
}

function handleCompleted(id, c, d) {
    //     let inputId = ["h1Num", id].join("")
    //     let updateItem = document.getElementById(inputId)
    //    console.log(updateItem)
    //     let newUrl = [url, id].join("/")

    //     let newDate = {
    //         id: id,
    //         title: title,
    //         completed: !completed
    //     }
    //     console.log(title, completed)
    //     //updateData(newUrl, newDate)

    console.log(id, c, d)
}
