//this array will store all the links save in the chrome extension
let saveLink = [];

//create all the variables needed in order to store the DOM values
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const saveBtn = document.getElementById("save-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");

//we have to use local storage in order to refresh and save everything
//parse converts the string from JSON into an array that we can use
const linkFromLocalStorage = JSON.parse(localStorage.getItem("saveLink"))

if(linkFromLocalStorage) {
    saveLink = linkFromLocalStorage;
    render(saveLink);
}

// render function
function render(links_array) {
    //save all the links inside of saveLink and render them into a list
    let listItems = "";

    for(let i = 0; i < links_array.length; i++) {
        listItems +=   `
                    <li> 
                        <a target='_blank' href='${links_array[i]}'> 
                            ${links_array[i]} 
                        </a> 
                    </li>
                `
    }

    //pass all the list links using the DOM
    ulEl.innerHTML = listItems;
}

//make the save input button work
saveBtn.addEventListener("click", function() {
    // // we have to store the input into local memory
    // // we also have to use JSON  in order to convert the array into a string
    // localStorage.setItem("saveLink", JSON.stringify(saveLink));
    // render(saveLink); //render the extension in order to display

    saveLink.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("saveLink", JSON.stringify(saveLink) )
    render(saveLink)
})

//make the delete all button work
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    saveLink = "";
    render(saveLink);
})

//make the save tab button work
tabBtn.addEventListener("click", function() {
    brave.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})