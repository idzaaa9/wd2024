var firebaseUrl = 'https://festivaliwd-default-rtdb.europe-west1.firebasedatabase.app';

document.addEventListener('DOMContentLoaded', function () {
  
  var request = new XMLHttpRequest();

  const container = document.getElementById('user-table');

  request.onreadystatechange = function () {
    if (this.readyState == 4) {

      if (this.status != 200) {
        alert('Error occured!');
        return;
      }

      var responseData = JSON.parse(request.responseText);

      for (var userId in responseData) {
        var user = responseData[userId];
        container.appendChild(createRow(user, userId));
      }
    }
  }

  request.open('GET', firebaseUrl + '/korisnici.json');
  request.send();
});

function createRow (data, id) {
  const row = document.createElement('tr');

  const usernameTd = document.createElement('td');
    usernameTd.textContent = data.korisnickoIme;
  row.appendChild(usernameTd);

  const passwordTd = document.createElement('td');
    passwordTd.textContent = data.lozinka;
  row.appendChild(passwordTd);

  const nameTd = document.createElement('td');
    nameTd.textContent = data.ime;
  row.appendChild(nameTd);

  const surnameTd = document.createElement('td');
    surnameTd.textContent = data.prezime;
  row.appendChild(surnameTd);

  const emailTd = document.createElement('td');
    emailTd.textContent = data.email;
  row.appendChild(emailTd);

  const birthdayTd = document.createElement('td');
    birthdayTd.textContent = data.datumRodjenja;
  row.appendChild(birthdayTd);

  const addressTd = document.createElement('td');
    addressTd.textContent = data.adresa;
  row.appendChild(addressTd);

  const numberTd = document.createElement('td');
    numberTd.textContent = data.telefon;
  row.appendChild(numberTd);

  const occupationTd = document.createElement('td');
    occupationTd.textContent = data.zanimanje;
  row.appendChild(occupationTd);

  const editButtonTd = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.classList.add('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
      window.location.href = 'editUser.html?id=' + id;
    }
    editButtonTd.appendChild(editButton);
  row.appendChild(editButtonTd);

  const deleteButtonTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () { deleteUser(id); };

    deleteButtonTd.appendChild(deleteButton);
  row.appendChild(deleteButtonTd);


  return row;
}

function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    var request = new XMLHttpRequest();

    request.open('DELETE', firebaseUrl + '/korisnici/' + userId + '.json', true);

    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) {
          alert('Error while deleting user');
          return;
        }
        alert('User deleted successfully');
      }
    }

    request.send();
  } else {
    alert('Deletion canceled');
  }
}