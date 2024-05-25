var firebaseUrl = 'https://festivaliwd-default-rtdb.europe-west1.firebasedatabase.app';

const urlParams = new URLSearchParams(window.location.search);
  const orgId = urlParams.get('id');
  if (!orgId) {
    window.location.href = 'index.html';
  }

  console.log(orgId);
document.addEventListener('DOMContentLoaded', function() {
  var request = new XMLHttpRequest();
  
  const container = document.getElementById('main');
  
  request.onreadystatechange = function() {
    if (this.readyState == 4) {

      if (this.status != 200) {
        alert('Error occured');
        return;
      }
      
      var responseData = JSON.parse(request.responseText);
      
      document.title = responseData.naziv;
      generateHeader(responseData);
      generateOrg(responseData);
      generateFestivals(responseData);

    }
  }

  request.open('GET', firebaseUrl + '/organizatoriFestivala/' + orgId + '.json');
  request.send();
});

function generateHeader (data) {
  const header = document.createElement('div');
  header.classList.add('organisation-header');

  const image = document.createElement('img');
  image.src = data.logo;

  const title = document.createElement('h1');
  title.classList.add('header-small-title');
  title.textContent = data.naziv;

  header.appendChild(image);
  header.appendChild(title);

  container.appendChild(header);

  return;
}

function generateOrg (data) {

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('organisation-info-container');

  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = 'opis organizacije';

  infoContainer.appendChild(desription);
  
  const name = document.createElement('div');
  name.classList.add('organisation-field');
  name.id = 'orgName';
  const nameLabel = document.createElement('span');
  nameLabel.classList.add('field-name');
  nameLabel.textContent = 'Name: ';
  const nameField = document.createElement('span');
  nameField.classList.add('field-value');
  nameField.textContent = data.naziv;
  name.appendChild(nameLabel);
  name.appendChild(nameField);
  infoContainer.appendChild(name);

  const address = document.createElement('div');
  address.classList.add('organisation-field');
  address.id = 'orgAddress';
  const addressLabel = document.createElement('span');
  addressLabel.classList.add('field-name');
  addressLabel.textContent = 'Address: ';
  const addressField = document.createElement('span');
  addressField.classList.add('field-value');
  addressField.textContent = data.adresa;
  address.appendChild(addressLabel);
  address.appendChild(addressField);
  infoContainer.appendChild(address);

  const yearCreated = document.createElement('div');
  yearCreated.classList.add('organisation-field');
  yearCreated.id = 'orgYearCreated';
  const yearCreatedLabel = document.createElement('span');
  yearCreatedLabel.classList.add('field-name');
  yearCreatedLabel.textContent = 'Year of creation: ';
  const yearCreatedField = document.createElement('span');
  yearCreatedField.classList.add('field-value');
  yearCreatedField.textContent = data.godinaOsnivanja;
  yearCreated.appendChild(yearCreatedLabel);
  yearCreated.appendChild(yearCreatedField);
  infoContainer.appendChild(yearCreated);

  const phoneNumber = document.createElement('div');
  phoneNumber.classList.add('organisation-field');
  phoneNumber.id = 'orgPhoneNumber';
  const phoneNumberLabel = document.createElement('span');
  phoneNumberLabel.classList.add('field-name');
  phoneNumberLabel.textContent = 'Phone number: ';
  const phoneNumberField = document.createElement('span');
  phoneNumberField.classList.add('field-value');
  phoneNumberField.textContent = data.kontaktTelefon;
  phoneNumber.appendChild(phoneNumberLabel);
  phoneNumber.appendChild(phoneNumberField);
  infoContainer.appendChild(phoneNumber);

  const email = document.createElement('div');
  email.classList.add('organisation-field');
  email.id = 'orgEmail';
  const emailLabel = document.createElement('span');
  emailLabel.classList.add('field-name');
  emailLabel.textContent = 'Email: ';
  const emailField = document.createElement('span');
  emailField.classList.add('field-value');
  emailField.textContent = data.email;
  email.appendChild(emailLabel);
  email.appendChild(emailField);
  infoContainer.appendChild(email); 


  container.appendChild(infoContainer);

  return;
}

function generateFestivals (data) {

  const fesTitle = document.createElement('span');
  fesTitle.classList.add('organisation-field');
  fesTitle.textContent = 'Festivals: ';

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  const festivalRequest = new XMLHttpRequest();

  festivalRequest.open('GET', firebaseUrl + '/festivali/' + data.festivali + '.json');

  festivalRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      
      if (this.status != 200) {
        alert('Erorr while loading festivals');
        return;
      }

      const responseData = JSON.parse(festivalRequest.responseText);

      for (var festivalId in responseData) {
        cardContainer.appendChild(generateFestival(responseData[festivalId], festivalId));
      }

    }
  }

  festivalRequest.send();

  container.appendChild(cardContainer);

  return;
}

function generateFestival (data, id) {
  const card = document.createElement('div');
  card.classList.add('card');

  const imageContent = document.createElement('div');
  imageContent.classList.add('image-content');

  const overlay = document.createElement('span');
  overlay.classList.add('overlay');

  const cardImg = document.createElement('div');
  cardImg.classList.add('card-image');

  const image = document.createElement('img');
  image.src = data.slike[0];
  image.classList.add('card-img');

  cardImg.appendChild(image);

  imageContent.appendChild(overlay);
  imageContent.appendChild(cardImg);

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const imgHeader = document.createElement('h2');
  imgHeader.classList.add('name');
  imgHeader.textContent = data.naziv;

  const festDesc = document.createElement('p');
  festDesc.classList.add('description');
  festDesc.textContent = data.opis;

  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Read more!';
  button.onclick = function () {
    window.location.href = 'festival.html?id=' + id; 
  }

  cardContent.appendChild(imgHeader);
  cardContent.appendChild(festDesc);
  cardContent.appendChild(button);

  card.appendChild(imageContent);
  card.appendChild(cardContent);

  return card;
}