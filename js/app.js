/* Holiii acá va tu código también */

let keyuser;

function tarjetaBip() {
  
 let selectinput = inputGroupSelect01.value;
 let inputBip = valueinputBip.value;
 
 let urls
    if(inputBip == ''){
      urls = `http://www.psep.cl/api/Bip.php?&numberBip=${selectinput}`;
      
    }else{
      
      urls = `http://www.psep.cl/api/Bip.php?&numberBip=${inputBip}`;
      document.getElementById("valueinputBip").value = "";

      
    }

  fetch(urls).then(response => response.json()
  ).then(respuestaJson => {
    // const saldo = respuestaJson[Saldotarjeta];
    
    verSaldo(respuestaJson)
   
  //   saldoTotal.innerHTML += `<div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
  //   <h4>Saldo Total</h4>
  //   <p>${respuestaJson["Saldo tarjeta"]}</p>
  //  </div>`
   console.log(saldo)
  }).catch(err => {
      console.log('numero no encontrado')
  })
  const verSaldo = (infoBip) => {
    // document.getElementById('resultadosaldo').style.display = 'block';
    let saldoBip = infoBip["Saldo  tarjeta"];
    saldoTotal.innerHTML = `<div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
       <h4>Saldo Total</h4>
      <p>${saldoBip}</p>
      </div>`
  }
  
  }
 function calcularTarifa() {
  let selectinput = inputGroupSelect01.value;
  let inputBip = valueinputBip.value;
  
  let urls
     if(inputBip == ''){
       urls = `http://www.psep.cl/api/Bip.php?&numberBip=${selectinput}`;
       
     }else{
       
       urls = `http://www.psep.cl/api/Bip.php?&numberBip=${inputBip}`;
       document.getElementById("valueinputBip").value = "";
 
       
     }
 
   fetch(urls).then(response => response.json()
   ).then(respuestaJson => {
     // const saldo = respuestaJson[Saldotarjeta];
     
     verSaldo(respuestaJson)
    
   //   saldoTotal.innerHTML += `<div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
   //   <h4>Saldo Total</h4>
   //   <p>${respuestaJson["Saldo tarjeta"]}</p>
   //  </div>`
    console.log(saldo)
   }).catch(err => {
       console.log('numero no encontrado'+  err)
   })
   const verSaldo = (infoBip) => {
    let saldoBip = infoBip["Saldo  tarjeta"];
    let saldo = saldoBip.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "");
    console.log(saldo);
    console.log(saldoBip)
      let selectinput = parseInt(inputGroupSelect02.value); 
      console.log(selectinput)
      let saldo_final = (parseInt(saldo) - selectinput);
      console.log(saldo_final)
     // document.getElementById('resultadosaldo').style.display = 'block';
   
     tarifatotal.innerHTML = `<div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
        <h4>Costo pasaje</h4>
       <p>$ ${selectinput}</p>
       </div>
       <div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
        <h4>Costo total</h4>
       <p>$ ${saldo_final}</p>
       </div>`
   }
   
 } 
let usuarioConectado;

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        usuarioConectado= user;
        
        document.getElementById('contenedorEmail').innerHTML = usuarioConectado.email;
       
        juntar(user.uid)

    }else{
        usuarioConectado = 'no tiene correo'
        console.log('usuario no conectado');
    }

})
console.log(usuarioConectado)

function registro() {
    const emailValue = email.value;
    const passwordValue = passwordRegistro.value;
    if (passwordValue.length <=8 && passwordValue.length  >3){
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then((response) => {
        location = '../index.html'
        console.log('usuario registrado');
     })
    .catch((error) => {
      console.log("Error de firebase > Código > "+error.code);
      console.log("Error de firebase > Mensaje > "+error.message);
     });
  }
}
function login() {
    const emailValue = exampleInputEmail1.value;
      const passwordValue = exampleInputPassword1.value
        firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(()=>{
            
          location = '../htmls/perfil.html';
          console.log("Usuario con login exitoso");
        })
      .catch((error)=>{
        console.log("Error de firebase > "+error.code);
        console.log("Error de firebase, mensaje > "+error.message);
      });
      
     
}



function cerrarSesion() {
  firebase.auth().signOut()
    .then(() => {
      location = '../index.html';
    })
    .catch();
}

function juntar(uid){
  keyuser = uid
}

function agregarTarjeta(uid) {
  const currentUser = firebase.auth().currentUser;
  const numeroBip = numerotarjeta.value;
  const tarjetas = firebase.database().ref().child('bips').push().key;

  firebase.database().ref(`bips/${keyuser}`).set({
    // creator: currentUser.uid,
    numBip: numeroBip
  });

  console.log(keyuser);
}



firebase.auth().onAuthStateChanged((user) => {
  if(user){
      
    firebase.database().ref(`bips/${user.uid}`)
    .on('child_added', (bips)=>{ //Para escuchar datos más veces o doblegados
    console.log(bips)
    contenedorBips.innerHTML += `<div class="col-12 col-sm-12 col-md-12 col-lg-12">
    <p class="optionsbips">${bips.val()}</p>
     </div>`;
     
});
firebase.database().ref(`bips/${user.uid}`)
  .on('child_added', (bips)=>{ //Para escuchar datos más veces o doblegados
    inputGroupSelect01.innerHTML += `
  <option >${bips.val()}</option>
   `;
  });
  inputGroupSelect02.innerHTML += `
  <option value="769">Horario Alto</option>
  <option value="680">Horario Medio</option>
  <option value="630">Horario Bajo</option>
   `
  }else{
      usuarioConectado = 'no tiene correo'
      console.log('usuario no conectado');
  }

})
  
  
  
  
 






