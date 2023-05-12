import * as firebase from 'https://jspm.dev/@firebase/app';
import { getDatabase, ref, push, set } from 'https://jspm.dev/@firebase/database';
import { getStorage, uploadBytesResumable, getDownloadURL } from 'https://jspm.dev/@firebase/storage';
import { ref as storageReference } from 'https://jspm.dev/@firebase/storage';

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
const db = getDatabase(app);
let contactDB = ref( db,"contactForm" );

const storage = getStorage(app);

let button = document.getElementById('contactForm');
button.addEventListener('click', submitForm);

function submitForm(e) {
	e.preventDefault();
  button.disabled = true;

	let firstName = getElementValue("firstName");
	let lastName =  getElementValue("lastName");
	let emailId = getElementValue("emailId");
	let phone = getElementValue("phone");
  let address = getElementValue("address");
  let jobTitle = getElementValue("jobTitle");
  let yearsOfExperience = getElementValue("yearsOfExperience");
  let workExperiences = getElementValue("workExperiences");
  let education = getElementValue("education");
  let fieldOfStudy = getElementValue("fieldOfStudy");
  let skills = getElementValue("skills");
  let salaryExpectations = getElementValue("salaryExpectations");

  let resume = document.querySelector('#resume');

	saveMessages( firstName, lastName, emailId, phone, address, jobTitle, yearsOfExperience, workExperiences, education, fieldOfStudy, skills, salaryExpectations, resume );

}

const saveMessages = async ( firstName, lastName, emailId, phone, address, jobTitle, yearsOfExperience, workExperiences, education, fieldOfStudy, skills, salaryExpectations, resume ) => {

    const file = resume.files[0];
    console.log(file);

    const storageRef = storageReference(storage, 'resumes/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    let downloadURL;
    try {
      await uploadTask;
      downloadURL = await getDownloadURL(storageRef);
    } catch (error) {
      console.error(error);
      return;
    }
    
    let newContactForm = push(contactDB);

    set(newContactForm,{
        firstName : firstName,
        lastName : lastName,
        emailId : emailId,
        phone : phone,
        address : address,
        jobTitle : jobTitle,
        yearsOfExperience : yearsOfExperience,
        workExperiences : workExperiences,
        education : education,
        fieldOfStudy : fieldOfStudy,
        skills : skills,
        salaryExpectations : salaryExpectations,
        resume : downloadURL,
    });
}

const getElementValue = (id) => {
	return document.getElementById(id).value;
};
