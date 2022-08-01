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
            if (!item.completed)
                return `
                <div class="item item-completed">
                <h1 id=h1num${item.id}  onclick="handleCompleted(${item.id},${item.completed})">${item.title}</h1>
                <input type="text" id=inputNum${item.id}  class="inputunseen"/>
                <div>
                <button class="editItem" onclick="editItem(${item.id},${item.completed})">Edit</button>
                <button class="delItem" onclick="delItem(${item.id})">Delete</button>
                </div>
                </div>
                
            `
            else {
                return `
                <div class="item item-uncompleted">
                <h1 id=h1num${item.id}  onclick="handleCompleted(${item.id},${item.completed})">${item.title}</h1>
                <input type="text" id=inputNum${item.id}  class="inputunseen"/>
                <div>
                <button class="editItem" onclick="editItem(${item.id},${item.completed})">Edit</button>
                <button class="delItem" onclick="delItem(${item.id})">Delete</button>
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

 function handleCompleted(id,completed) {
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

console.log("Can not complete this function")
 }
