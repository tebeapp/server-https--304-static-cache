async function mailgo() {
    console.log('mail fitch')
      fetch("/mail", {method: 'POST',body: false})
    .then((response) => {return response.text()})
    .then((status) => {
      document.getElementById("mail").innerHTML = status
    })
    }
    mailgo()
  
  let input = document.querySelector('input')
  let preview = document.querySelector('.preview')
  input.style.opacity = 0
  input.addEventListener('change', updateImageDisplay)
  function updateImageDisplay() {
    while(preview.firstChild) {preview.removeChild(preview.firstChild)}
  let curFiles = input.files
  const tebelink = curFiles
  console.log('img-s-0',curFiles)
  console.log('img-s-1',tebelink)
  console.log('img-s-2',input.files[0])
  const vsv = new FormData()
  vsv.append('file', input.files[0])
  vsv.append('vsv-f-0', 'vsv-f-1')
   fetch("/img", {
    method: 'POST',
    body: vsv})
    .then((response) => {
      return response.text();
    })
    .then((tebevstatus) => {
      document.getElementById("imgstatus").innerHTML = tebevstatus
    })
  //отправка
    if(curFiles.length === 0) {
      let para = document.createElement('p')
      para.textContent = 'tebe-0: Статус загрузки'
      preview.appendChild(para)
    } else {
      let list = document.createElement('ol');
      preview.appendChild(list)
      for(let i = 0; i < curFiles.length; i++) {
        let listItem = document.createElement('li')
        let para = document.createElement('p')
        if(validFileType(curFiles[i])) {
          para.textContent =` ➜ фаил размер:  ${returnFileSize(curFiles[i].size)}`        
          let image = document.createElement('img')
          image.src = window.URL.createObjectURL(curFiles[i])
          listItem.appendChild(image)
          listItem.appendChild(para)
        } else {
          para.textContent = `tebe: только форматы JPG и PNG ${curFiles[i].name}`
          listItem.appendChild(para)
        }
        list.appendChild(listItem)
      }
    }
  }
  let fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]
  function validFileType(file) {
    for(let i = 0; i < fileTypes.length; i++) {
      if(file.type === fileTypes[i]) {
        return true;
      }
    }
    return false;
  }
  function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number > 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number > 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }
  
  // проверка изменений на сервере в статичном json на true запросить новый список. false ожидание http 304
  function statJson(){
    let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText))
                const sjtebe = JSON.parse(this.responseText)
                console.log('jsonid:', sjtebe['id-user'])     
                console.log('jsonuser', sjtebe['tebeuser']) 
                sjtebe['id-user']===true ? mailgo() : console.log('xhr-fitch slip') 
  
              }
            } 
        const host = `../@/user/data.json`
        console.log('host',host)
            xhttp.open("GET", host, true);//по умолчанию корневая папка
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
  }
  setInterval('statJson()',2000)
  
          function  tebeFxhr(x) { 
         console.log('drop-id',x)
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          alert(this.responseText);
        }
      };
      let jtebe = JSON.stringify({data_1:'i', data_0:x});
      xhttp.open("POST", '/del', true);
      xhttp.setRequestHeader("Content-type", "application/json");// удаление сообщения
      xhttp.send(jtebe);
      }