
const https = require('https')
const express = require('express')
const multer = require('multer')
const upload = multer()
const fs = require('fs')
const path = require('path')
const mysql = require('mysql')

let pool  = mysql.createPool({
  host: "localhost",
  user: "userDB",
  password: "pass",
  database: "db"
})

console.log('модуль Загрузки img')
const app = express();

app.use('/', express.static('./varx/www/html'))

app.use('/a', express.static('./varx/www/html/a/'));

app.use(express.json({limit: '50mb'}))
app.post('/del',   (req, res, ) => {
  const id = req.body.data_0;
  console.log('пришло на удаление:',id)  
  pool.getConnection( function(err, con) {
    if (err) throw err;
    con.query(`DELETE FROM x2v.dbmail WHERE id='${id}'`, function (err, resdel, fields) {
      res.send(`удалено сообщение номер ${id}`)
      console.log('удалено')
    })
    con.release()
  })
  const xdata = `{"id-user":${true}, "tebeuser":"user"}`
  fs.writeFile(`./varx/www/html/@/user/data.json`, xdata ,  function (err, file) {
    if (err) throw err;
    console.log('tebe: Фаил json  создан')
})
})

app.post('/mail',   (req, res, ) => { 
  pool.getConnection( function(err, con) {
    if (err) throw err;//Проверка введеной капчи
    con.query(`SELECT id,datadb,mail FROM x2v.dbmail ORDER BY id DESC LIMIT 5`, function (err, resdel, fields) {
      res.send(`Входящие:${resdel[0].mail}<br>${resdel[0].id}<button onclick="tebeFxhr(${resdel[0].id})">Удалить</button><br>${resdel[1].mail}<br>${resdel[1].id}<button onclick="tebeFxhr(${resdel[1].id})">Удалить</button><br>${resdel[2].mail}<br>${resdel[2].id}<button onclick="tebeFxhr(${resdel[2].id})">Удалить</button><br>${resdel[3].mail}<br>${resdel[3].id}<button onclick="tebeFxhr(${resdel[3].id})">Удалить</button><br>${resdel[4].mail}<br>${resdel[4].id}<button onclick="tebeFxhr(${resdel[4].id})">Удалить</button><br>`)
      console.log('сообщение:',resdel[0].mail)
    })
    con.release()
  })
        const sdata = `{"id-user":${false}, "tebeuser":"user"}`
        fs.writeFile(`./varx/www/html/@/user/data.json`, sdata ,  function (err, file) {
          if (err) throw err;
          console.log('tebe: Фаил json  создан') 
      })
})
app.post('/img', upload.any(),  (req, res, ) => {
    const tebeuser = 'user'
    if(req.files[0].mimetype==='image/jpeg' || req.files[0].mimetype==='image/png'){
      console.log('tebe: jpg-png')
         fs.writeFile(`./varx/www/html/@/${tebeuser}/${tebeuser}.jpg`, req.files[0].buffer,  function (err, file) {
          if (err) throw err;
          console.log('tebe: stories  создан')  
          res.send('Загрузка завешена')    
        });
   
      console.log('tebe:stories все хорошо!')
     
    }
    else{console.log('tebe: не коректный тип')}

})

app.listen(3000, () => console.log(`go http://localhost:3000!`));