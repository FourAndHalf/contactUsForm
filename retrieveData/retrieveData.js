import * as firebase from 'https://jspm.dev/@firebase/app';
import { getDatabase, ref, child, get } from 'https://jspm.dev/@firebase/database';
    
const firebaseConfig = {
apiKey: "AIzaSyDdgyl9NlKEd6Dc2aLpyxCMNDF8VHS_UbM",
authDomain: "contactform-9d6c7.firebaseapp.com",
databaseURL: "https://contactform-9d6c7-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "contactform-9d6c7",
storageBucket: "contactform-9d6c7.appspot.com",
messagingSenderId: "596520366968",
appId: "1:596520366968:web:b75b24257e66097978ce8d"
};

const app = firebase.initializeApp(firebaseConfig);
let stdNo = 0;

function AddItemToTable(firstName, lastName, emailId, phone, address, jobTitle, yearsOfExperience, workExperience, education, fieldOfStudy, skills, salaryExpectations, resume) {
    let tbody = document.getElementById('tbody1');

    let trow = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    let td9 = document.createElement("td");
    let td10 = document.createElement("td");
    let td11 = document.createElement("td");
    let td12 = document.createElement("td");
    let td13 = document.createElement("td");
    let td14 = document.createElement("td");

    td1.innerHTML = ++stdNo;
    td2.innerHTML = firstName;
    td3.innerHTML = lastName;
    td4.innerHTML = emailId;
    td5.innerHTML = phone;
    td6.innerHTML = address;
    td7.innerHTML = jobTitle;
    td8.innerHTML = yearsOfExperience;
    td9.innerHTML = workExperience;
    td10.innerHTML = education;
    td11.innerHTML = fieldOfStudy;
    td12.innerHTML = skills;
    td13.innerHTML = salaryExpectations;
    td14.innerHTML = resume;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);
    trow.appendChild(td10);
    trow.appendChild(td11);
    trow.appendChild(td12);
    trow.appendChild(td13);
    trow.appendChild(td14);

    tbody.appendChild(trow);
}

function AddAllItemsToTable(People) {
    People.forEach(element => {
    AddItemToTable(element.firstName, element.lastName, element.emailId, element.phone, element.address, element.jobTitle, element.yearsOfExperience, element.workExperiences, element.education, element.fieldOfStudy, element.skills, element.salaryExpectations, element.resume);
    });
}

const db = getDatabase(app);

function GetAllDataOnce() {
    const dbRef = ref(db); 
    console.log("here");

    get(child(dbRef, "contactForm"))
    .then((snapshot) => {
        let persons =[];

        snapshot.forEach(childSnapshot => {
        persons.push(childSnapshot.val());
        });

        console.log("here3");
        
        AddAllItemsToTable(persons);
    });   
} 

window.onload = GetAllDataOnce;