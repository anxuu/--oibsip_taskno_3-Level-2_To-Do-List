let input_text = document.querySelector("input")
let add_btn = document.querySelector(".btn-1")
let btn_txt = add_btn.innerText
let arr = [];
let edit_id = null;
let objstr = localStorage.getItem("to-do");
console.log(objstr, "objstr")

if (objstr != null) {
    arr = JSON.parse(objstr);
    console.log(arr, "arr")
}
display()
add_btn.onclick = () => {
    let work = input_text.value;
    if (work != "") {
        if (edit_id != null) {
            arr.splice(edit_id, 1, { "to-do": work })
            edit_id = null
        } else {
            arr.push({ "to-do": work });
        }

        save(arr);
        input_text.style.borderColor = "black";
        input_text.value = "";
        display()
        add_btn.innerText = btn_txt;
    } else {
        input_text.style.borderColor = "red";
        alert("Please enter");

    }

}
function save(arr) {
    let str = JSON.stringify(arr);
    localStorage.setItem("to-do", str);
}
function display() {
    let statement = "";
    arr.forEach((value, i) => {
        console.log(value.work)
    
    statement +=`<div class="list">
    <div class="space">
        <div class="serial-no">${i + 1}</div>
        <div class="content">
        ${value["to-do"]}
        </div>
    </div>
    <div class="action-btns">
        <i class="fa fa-edit" style="font-size:25px" onclick='edit(${i})'></i><i class="fa fa-trash-o"
            style="font-size:25px;color:red" onclick='delet(${i})'></i>
    </div>
</div>`
    });
    document.querySelector(".display").innerHTML = statement;


}
function edit(id) {
    edit_id = id;
    input_text.value = arr[id]["to-do"]
    add_btn.innerText = "Save"
}
function delet(id) {
    arr.splice(id, 1)
    save(arr)
    display()
}