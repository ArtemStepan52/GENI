// Функция для загрузки XML-файла
function loadXMLData(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'albums.xml', true); // Загружаем XML-файл
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const xmlDoc = xhr.responseXML;
      callback(xmlDoc);
    }
  };
  xhr.send();
}

// Функция для отображения или скрытия информации об альбоме
function toggleAlbumInfo(albumId) {
  loadXMLData(function (xmlDoc) {
    const album = xmlDoc.getElementsByTagName('album')[albumId - 1]; // Получаем альбом по id
    const title = album.getElementsByTagName('title')[0].textContent;
    const artist = album.getElementsByTagName('artist')[0].textContent;
    const year = album.getElementsByTagName('year')[0].textContent;
    const tracks = album.getElementsByTagName('track');
    
    const trackList = [];
    for (let i = 0; i < tracks.length; i++) {
      trackList.push(tracks[i].getElementsByTagName('trackTitle')[0].textContent);
    }

   
    if (albumId === 1) {
      const albumInfo1 = document.getElementById('albumInfo1');
      if (albumInfo1.style.display === 'block') {
        albumInfo1.style.display = 'none'; 
      } else {
        document.getElementById('title1').textContent = title;
        document.getElementById('artist1').textContent = artist;
        document.getElementById('year1').textContent = year;
        const tracksList1 = document.getElementById('tracks1');
        tracksList1.innerHTML = trackList.map(track => `<li>${track}</li>`).join('');
        albumInfo1.style.display = 'block'; // Показать альбом
        document.getElementById('albumInfo2').style.display = 'none'; 
      }
    } else if (albumId === 2) {
      const albumInfo2 = document.getElementById('albumInfo2');
      if (albumInfo2.style.display === 'block') {
        albumInfo2.style.display = 'none'; 
      } else {
        document.getElementById('title2').textContent = title;
        document.getElementById('artist2').textContent = artist;
        document.getElementById('year2').textContent = year;
        const tracksList2 = document.getElementById('tracks2');
        tracksList2.innerHTML = trackList.map(track => `<li>${track}</li>`).join('');
        albumInfo2.style.display = 'block'; // Показать альбом
        document.getElementById('albumInfo1').style.display = 'none'; 
      }
    }
  });
}
