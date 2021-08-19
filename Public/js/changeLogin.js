document.getElementById("goToRegister").addEventListener("click", () => {
  //document.getElementById("divLogin").style.display = "none";
  document.getElementById("login").style.display = "none";
  //document.getElementById("divSignUp").style.display = "block";
  document.getElementById("signUp").style.display = "block";
});

document.getElementById("goToLogin").addEventListener("click", () => {
  //document.getElementById("divLogin").style.display = "block";
  document.getElementById("login").style.display = "block";
  //document.getElementById("divSignUp").style.display = "none";
  document.getElementById("signUp").style.display = "none";
});
