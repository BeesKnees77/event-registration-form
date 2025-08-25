const scriptURL = 'https://script.google.com/macros/s/AKfycbz62EvFnFGC15PJthosie0ohRttkk5rENoC36_7ORdOGWVfTErXLq1JQRDvWkSIdKVy5g/exec'; // Replace with your deployed Apps Script URL

function fetchByPhone() {
  const phone = document.getElementById('phone').value;
  fetch(`${scriptURL}?phone=${phone}`)
    .then(res => res.text())
    .then(data => {
      if (data === "Not found") {
        document.getElementById('lastNamePrompt').style.display = 'block';
        document.getElementById('message').innerText = "Phone not found. Please enter last name.";
      } else {
        populateForm(JSON.parse(data));
      }
    });
}

function searchByLastName() {
  const lastName = document.getElementById('lastName').value;
  fetch(`${scriptURL}?lastName=${lastName}&action=searchByLastName`)
    .then(res => res.json())
    .then(data => {
      const listDiv = document.getElementById('recordList');
      listDiv.innerHTML = "<strong>Select a record:</strong><br>";
      data.forEach(record => {
        const btn = document.createElement('button');
        btn.innerText = `${record.phone} - ${record.lastName}`;
        btn.onclick = () => {
          document.getElementById('phone').value = record.phone;
          fetchByPhone();
        };
        listDiv.appendChild(btn);
        listDiv.appendChild(document.createElement('br'));
      });
      listDiv.style.display = 'block';
      document.getElementById('newRecordBtn').style.display = 'inline';
    });
}

function createNewRecord() {
  document.getElementById('registrationForm').style.display = 'block';
  document.getElementById('message').innerText = "";
  [...document.querySelectorAll('#registrationForm input, #registrationForm select')].forEach(el => el.value = "");
}

function populateForm(data) {
  document.getElementById('registrationForm').style.display = 'block';
  document.getElementById('firstName').value = data.firstName;
  document.getElementById('formLastName').value = data.lastName;
  document.getElementById('dob').value = data.dob;
  document.getElementById('email').value = data.email;
  document.getElementById('address').value = data.address;
  document.getElementById('city').value = data.city;
  document.getElementById('branch').value = data.branch;
  document.getElementById('spouseName').value = data.spouseName;
  document.getElementById('weddingDate').value = data.weddingDate;
  document.getElementById('accommodationRequired').value = data.accommodationRequired;
  document.getElementById('arrivalDateTime').value = data.arrivalDateTime;
  document.getElementById('departureDateTime').value = data.departureDateTime;
  document.getElementById('membersAttending').value = data.membersAttending;
  document.getElementById('attendingStatus').value = data.attendingStatus;
  document.getElementById('message').innerText = "";
}

function submitForm() {
  const phone = document.getElementById('phone').value;
  const formData = new FormData();
  formData.append('phone', phone);
  formData.append('firstName', document.getElementById('firstName').value);
  formData.append('lastName', document.getElementById('formLastName').value);
  formData.append('dateOfBirth', document.getElementById('dob').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('address', document.getElementById('address').value);
  formData.append('city', document.getElementById('city').value);
  formData.append('branch', document.getElementById('branch').value);
  formData.append('spouseName', document.getElementById('spouseName').value);
  formData.append('weddingDate', document.getElementById('weddingDate').value);
  formData.append('accommodationRequired', document.getElementById('accommodationRequired').value);
  formData.append('arrivalDateTime', document.getElementById('arrivalDateTime').value);
  formData.append('departureDateTime', document.getElementById('departureDateTime').value);
  formData.append('membersAttending', document.getElementById('membersAttending').value);
  formData.append('attendingStatus', document.getElementById('attendingStatus').value);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.text())
    .then(msg => {
      document.getElementById('message').innerText = msg;
    });
}
