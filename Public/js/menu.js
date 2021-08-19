 
document.getElementById("menuIcon").addEventListener("click", function () {
/*   alert("el menu se abre") */
  document.getElementById("menuIcon").style.display = "none";
  document.getElementById("containerMenu").style.display = "block";
  document.getElementById("menuIcon2").style.display = "block";
});

document.getElementById("menuIcon2").addEventListener("click", function () {
/*   alert("el menu se cierra") */
    document.getElementById("menuIcon").style.display = "block";
    document.getElementById("containerMenu").style.display = "none";
    document.getElementById("menuIcon2").style.display = "none";
  });