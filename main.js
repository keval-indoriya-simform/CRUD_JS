const submit_btn = document.querySelector(".submit");
const table_body = document.querySelector("tbody");

// Array of object it will store all the details of user
const userDetailsArray = [
    {
        "ID": 1,
        "first_name": "Keval",
        "last_name": "Indoriya",
        "age": 22
    }
];

// When page is loades this will display all the record of user in table
document.addEventListener("load", displayUserDetails(userDetailsArray));

// This function is use to display details of user to table in html page
function displayUserDetails(userDetailsArray) {
    table_body.innerHTML = "";
    userDetailsArray.forEach((userRow) => {
        const userData =
            `
            <tr>
            <td id="ID" value="${userRow['ID']}">${userRow['ID']}</td>
            <td>${userRow['first_name']}</td>
            <td>${userRow['last_name']}</td>
            <td>${userRow['age']}</td>
            <td><button class="tablebtn Edit" >Edit</button></td>
            <td><button class="tablebtn Delete" >Delete</button></td>
            </tr>
            `;
        table_body.innerHTML += (userData);
    });
    edit_click_event();     // This will attach onclick event to all edit buttons in table
    delete_click_event();   // This will attach onclick event to all delete buttons in table
};

// This function will validate the form (i.e. all values are given or not)
function validateForm() {
    const data_fields = document.querySelector(".userDetails");
    const fName = data_fields.elements['first_name'].value;
    const lName = data_fields.elements['last_name'].value;
    const age_of_user = data_fields.elements['age'].value;
    if (fName == "") {
        alert("enter First Name");
        return false;
    } else if (lName == "") {
        alert("enter Last Name");
        return false;
    } else if (age_of_user == "") {
        alert("enter Age");
        return false;
    } else if (allLetter(fName, lName)) {
        return true;
    };
};

// This function check and make sure that first name and last name contains onlt alphabets
function allLetter(inputtxt, inputtxt2) {
    var letters = /^[A-Za-z]+$/;
    if (!inputtxt.match(letters) & !inputtxt2.match(letters)) {
        alert('Please input alphabet characters only in First Name and Last Name');
        return false;
    } else if (!inputtxt.match(letters)) {
        alert('Please input alphabet characters only in First Name');
        return false;
    } else if (!inputtxt2.match(letters)) {
        alert('Please input alphabet characters only in Last Name');
        return false;
    } else {
        return true;
    }
}

// This function is to add user in to array and also display all the user in table
function addUser() {
    event.preventDefault();
    if (validateForm()) {
        const data_fields = document.querySelector(".userDetails");
        const fName = data_fields.elements['first_name'].value;
        const lName = data_fields.elements['last_name'].value;
        const age_of_user = data_fields.elements['age'].value;
        let id;

        if (userDetailsArray.length == 0) {
            // If user details is empty
            id = 1
        } else {
            // If user details is not empty
            let last_item = userDetailsArray.pop();
            userDetailsArray.push(last_item)
            id = last_item['ID'] + 1
        };

        // Object of user details
        const userRow = {
            "ID": id,
            "first_name": fName,
            "last_name": lName,
            "age": parseInt(age_of_user)
        };

        // This will check if user is already exsist or not
        const isFound = userDetailsArray.find(element => {
            if (element.first_name == userRow.first_name & element.last_name == userRow.last_name) {
                return element;
            } else {
                return false;
            }
        });

        // If user already exsist update user otherwise add new user
        if (isFound) {
            userRow.ID = isFound.ID;
            userDetailsArray.splice(userRow.ID - 1, 1, userRow);    // This will delete old data and add new data in array of objet
            displayUserDetails(userDetailsArray);                   // This will display all user in HTML table
            clear_data_field();                                     // This will clear all the values of input box
        } else {
            userDetailsArray.push(userRow);                         // This will add user object in 
            clear_data_field();                                     // This will clear all the values of input box
            displayUserDetails(userDetailsArray);                   // This will display all user in HTML table
        }

    }
}

// When you click on clear button it will call clear_data_field and clear all the fields
const clear_btn = document.querySelector(".clear")
clear_btn.addEventListener("click", (event) => {
    event.preventDefault();
    clear_data_field();
});

// This function is user to clear all input fields
function clear_data_field() {
    const data_fields = document.querySelectorAll(".data");
    data_fields.forEach((data) => {
        data.value = "";
    });
};

// This function will attach on click event to all edit buttons in table when it is called
function edit_click_event() {
    const edit_btn = document.querySelectorAll(".Edit");
    edit_btn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();

            // This will get the id of user from html table in which row you want to edit
            const ID = event.target.parentElement.parentElement.firstElementChild.innerHTML;

            // This will change the on click event of submit butoon so it will edit user 
            // instead of adding a new user and when you click submit button it will edit
            // those detaiils in table
            submit_btn.setAttribute("onClick", `editUser(${ID})`);

            // This function will take value of user and display to input fields so you can edit them 
            editUserDetails(ID);
        })
    });
}

// This function will take value of user and display to input fields so you can edit them 
function editUserDetails(ID) {
    let userRow = userDetailsArray.find(user => user.ID == parseInt(ID));
    const data_fields = document.querySelector(".userDetails");
    data_fields.elements['first_name'].value = userRow.first_name;
    data_fields.elements['last_name'].value = userRow.last_name;
    data_fields.elements['age'].value = userRow.age;
}

// This function will take updated details and add them to array of object
// and it will also add it on HTML table 
function editUser(ID) {
    event.preventDefault();
    if (validateForm()) {
        const data_fields = document.querySelector(".userDetails");
        const fName = data_fields.elements['first_name'].value;
        const lName = data_fields.elements['last_name'].value;
        const age_of_user = data_fields.elements['age'].value;

        // This is object of updated user details
        const newuserRow = {
            "ID": parseInt(ID),
            "first_name": fName,
            "last_name": lName,
            "age": parseInt(age_of_user)
        };

        userDetailsArray.splice(ID - 1, 1, newuserRow);     // This will delete old data and add new data in array of objet
        displayUserDetails(userDetailsArray);               // This will display all user in HTML table
        clear_data_field();                                 // This will clear all the values of input box
        // This will change onclick method of submit button of form 
        // so if you now enter new user it will add user not edit some other user
        submit_btn.setAttribute("onClick", `addUser()`);
    }
}

// This will attach onclick event to all delete buttons in table
function delete_click_event() {
    const delete_btn = document.querySelectorAll(".Delete");
    delete_btn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            const ID = event.target.parentElement.parentElement.firstElementChild.innerHTML;
            deleteUserDetails(ID)
        });
    });
}

// This function will delete perticular user details from array of object 
// and display updated array to the HTML table
function deleteUserDetails(ID) {
    let index_to_delete = userDetailsArray.findIndex(element => element.ID == parseInt(ID))
    userDetailsArray.splice(index_to_delete, 1)
    for (i=index_to_delete; i < userDetailsArray.length; i++) {
        userDetailsArray[i].ID -= 1;
    }
    displayUserDetails(userDetailsArray)
}