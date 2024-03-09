document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-form");
  const tableBody = document.getElementById("table-body");
  let serialNumber = localStorage.getItem("serialNumber") || 1;

  loadFromLocalStorage();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user details from the form
    const id = document.getElementById("id").value;
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const designation = document.getElementById("designation").value;
    const gender = document.getElementById("gender").value;
    const course = document.getElementById("course").value;
    const createDate = document.getElementById("create-date").value;

    // Save user details to local storage
    saveToLocalStorage({
      id,
      image,
      name,
      email,
      mobile,
      designation,
      gender,
      course,

      createDate,
    });

    // Create a new row for the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
              <td>${serialNumber}</td>
              <td>${id}</td>
              <td><img src="${image}" alt="User Image" width="50"></td>
              <td>${name}</td>
              <td>${email}</td>
              <td>${mobile}</td>
              <td>${designation}</td>
              <td>${gender}</td>
              <td>${course}</td>
              <td>${createDate}</td>
          `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Increment serial number for the next entry and update local storage
    serialNumber++;
    localStorage.setItem("serialNumber", serialNumber);

    // Update employee details in employee.html
    updateEmployeeDetails(
      id,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      createDate
    );

    // Reset form fields
    // form.reset();
  });
});

function updateEmployeeDetails(
  id,
  name,
  email,
  mobile,
  designation,
  gender,
  course,
  createDate
) {
  // Create a new employee detail div
  const employeeDetailDiv = document.createElement("div");
  employeeDetailDiv.innerHTML = `
          <p><strong>ID:</strong> ${id}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Designation:</strong> ${designation}</p>
          <p><strong>Gender:</strong> ${gender}</p>
          <p><strong>Course:</strong> ${course}</p>
          <p><strong>Create Date:</strong> ${createDate}</p>
      `;

  // Append the employee detail div to the employee-details container
  document.getElementById("employee-details").appendChild(employeeDetailDiv);
}

function saveToLocalStorage(data) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(data);
  localStorage.setItem("users", JSON.stringify(users));
}

function loadFromLocalStorage() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
              <td>${user.serialNumber}</td>
              <td>${user.id}</td>
              <td><img src="${user.image}" alt="User Image" width="50"></td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.mobile}</td>
              <td>${user.designation}</td>
              <td>${user.gender}</td>
              <td>${user.course}</td>
              <td>${user.createDate}</td>
          `;
    document.getElementById("table-body").appendChild(newRow);
    updateEmployeeDetails(
      user.id,
      user.name,
      user.email,
      user.mobile,
      user.designation,
      user.gender,
      user.course,
      user.createDate
    );
  });
}
