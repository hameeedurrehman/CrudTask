const btn = document.getElementById('btn');
const form = document.getElementById('form');
const namer = document.getElementById('namer');
const age = document.getElementById('age');
const email = document.getElementById('email');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
const msg3 = document.getElementById('msg3');
const tableData = document.getElementById('tableData');
const storedData = localStorage.getItem('data');
const emailList = [];
if (storedData?.length) {
    for (user of JSON.parse(storedData)) {
        emailList.push(user.email);
    }
}
btn.addEventListener('click', () => {
    if (form.style.display === 'block') {
        form.style.display = 'none';
        btn.innerHTML = "Add"
    } else {
        form.style.display = 'block';
        btn.innerHTML = "Cancel"
        form.reset();
    }
})
const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    var mailformat = /@/;
    if (form.style.display === 'block' &&
        namer.value !== "" &&
        age.value !== "" &&
        age.value > 0 &&
        email.value !== "" &&
        (email.value.match(mailformat))) {
        form.style.display = 'none';
        btn.innerHTML = "Add";
    } else {
        form.style.display = 'block';
    }
})


const DATA = localStorage.getItem("data");
const data = JSON.parse(DATA) || [];

let createTable = (filteredData = data) => {
    tableData.innerHTML = "";

    filteredData.forEach(entry => {
        tableData.innerHTML += `
        <tr>
        <td>${entry.namer}</td>
        <td>${entry.age}</td>
        <td>${entry.email}</td>
        <td><i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        <i onClick="editPost(this)" class="fas fa-edit"></i></td>
        </tr>`;
    });
}
createTable();
form.addEventListener("submit", (validate) => {
    validate.preventDefault();
    formValidation();
})

let acceptData = () => {
    const obj = { namer: namer.value, age: age.value, email: email.value }
    data.push({ ...obj });
    localStorage.setItem("data", JSON.stringify(data));
    createTable();
    form.reset();
}
const formValidation = () => {
    if (namer.value === "") {
        msg1.innerHTML = "Name cannot be blank";
    } else {
        msg1.innerHTML = ""
    }
    if (age.value === "" || age.value < 0) {
        msg2.innerHTML = "Age cannot be blank nor negative";
    } else {
        msg2.innerHTML = ""
    }
    if (email.value === "") {
        msg3.innerHTML = "Email cannot be blank nor same";
    } else {
        msg3.innerHTML = ""
    }
    if (emailList.includes(email.value)) {
        form.style.display = "block";
        btn.innerHTML = "Cancel"
        msg3.innerHTML = "Email cannot be same";
        return;
    }
    if (namer.value !== "" && age.value !== "" && email.value !== "" && age.value > 0) {
        acceptData();
    }
}
let deletePost = (e) => {
    const row = e.parentElement.parentElement;
    const index = Array.from(row.parentElement.children).indexOf(row);
    row.remove();
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
}
let editPost = (e) => {
    const row = e.parentElement.parentElement;
    const index = Array.from(row.parentElement.children).indexOf(row);
    row.remove();
    const { namer: nameValue, age: ageValue, email: emailValue } = data[index];
    namer.value = nameValue;
    age.value = ageValue;
    email.value = emailValue;
    form.style.display = "block";
    data.splice(index, 1);
    msg3.innerHTML = "";
    btn.innerHTML = "Cancel"
}

const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(entry => 
        entry.namer.toLowerCase().includes(searchInput) || 
        entry.age.toLowerCase().includes(searchInput) || 
        entry.email.toLowerCase().includes(searchInput));
    createTable(filteredData);
})