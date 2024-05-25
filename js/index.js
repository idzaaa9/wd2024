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

    const buttonContainer = document.createElement('a');
      buttonContainer.href = 'organisation.html/' + id;
    
      const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Read more!';

    buttonContainer.appendChild(button);
  
  cardContent.appendChild(title);
  cardContent.appendChild(description);
  cardContent.appendChild(buttonContainer);

  card.appendChild(imageContent);
  card.appendChild(cardContent);

  return card;
}
});
