document.addEventListener('DOMContentLoaded', function() {
var firebaseUrl = 'https://festivaliwd-default-rtdb.europe-west1.firebasedatabase.app';

var request = new XMLHttpRequest();

const container = document.getElementById('card-container');

request.onreadystatechange = function () {
  if (this.readyState == 4) {
    
    if (this.status != 200) {
      alert('Error occured');
      return;
    }

    var responseData = JSON.parse(request.responseText);

    for (var organiserId in responseData) {
      var organiser = responseData[organiserId];
      container.appendChild(createCard(organiser, organiserId));
    }

  }
};

request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
request.send();

function createCard (cardData, id) {
  const card = document.createElement('div');
    card.classList.add('card');

  const imageContent = document.createElement('div');
    imageContent.classList.add('image-content');
    
    const overlay = document.createElement('span');
      overlay.classList.add('overlay');

    const cardImage = document.createElement('div');
      cardImage.classList.add('card-image');
        const img = document.createElement('img');
          img.src = cardData.logo;
          img.classList.add('card-img');
      
    cardImage.appendChild(img);
  
  imageContent.appendChild(overlay);
  imageContent.appendChild(cardImage);

  const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const title = document.createElement('h2');
      title.classList.add('name');
      title.textContent = cardData.naziv;

    const description = document.createElement('p');
      description.classList.add('description');
      description.textContent = 'opis organizacije';
  
  const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const editButton = document.createElement('button');
        editButton.classList.add('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
          window.location.href = 'editOrganisation.html?id=' + id;
        }

  buttons.appendChild(editButton);

      const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {deleteOrg(id); };    

  buttons.appendChild(deleteButton);

  cardContent.appendChild(title);
  cardContent.appendChild(description);
  cardContent.appendChild(buttons);

  card.appendChild(imageContent);
  card.appendChild(cardContent);

  return card;
}
});

function deleteOrg(orgId) {
  if (confirm('Are you sure you want to delete this organiser?')) {
    var request = new XMLHttpRequest();

    request.open('DELETE', firebaseUrl + '/organizatoriFestivala/' + orgId + '.json', true);

    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) {
          alert('Error while deleting organiser');
          return;
        }
        alert('User deleted organiser');
      }
    }

    request.send();
  } else {
    alert('Deletion canceled');
  }
}