let checkEmail = (email)=>{
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
}
 
let checkLengthPass = (pass)=>{
    return(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/.test(pass))
}

let singUpButton = document.getElementById('singUpButton');
singUpButton.addEventListener('click',(event)=>{
    let name = document.getElementById('name').value; 
    let email = document.getElementById('email').value; 
    let password = document.getElementById('password').value; 
    let repassword = document.getElementById('repassword').value; 
    
    if(checkEmail(email)) {
        if(password != repassword){
            document.getElementById('errorMsg').innerHTML=`<h3 class="errorColor">Las passwords no coinciden</h3>`
            event.preventDefault()
        }else {
            if(checkLengthPass(password) != true){
                document.getElementById('errorMsg').innerHTML=`<h3 class="errorColor">Password = 8 caraters 1 especial 1 mayuscula 1 numero</h3>`
                event.preventDefault()
            }else{
                document.getElementById('errorMsg').innerHTML=" "
                console.log('Todo OK')
            }
        }
    }else{
        document.getElementById('errorMsg').innerHTML=`<h3 class="errorColor">Email inválido</h3>`
        event.preventDefault()
    }
})