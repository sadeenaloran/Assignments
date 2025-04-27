function validate(){
    let isvalid = true;
    const errorMessage1 = document.getElementById("errormessage1");
    const errorMessage2 = document.getElementById("errormessage2");
    const errorMessage3 = document.getElementById("errormessage3");
    const errorMessage4 = document.getElementById("errormessage4");
    const errorMessage5 = document.getElementById("errormessage5");
    const errorMessage6 = document.getElementById("errormessage6");

  
    const fullName = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();

   
    if (fullName === "") {
        errorMessage1.textContent = "Please enter your full name.";
        isvalid=false;
    }

    if (email === "" || !email.includes("@")) {
        errorMessage2.textContent = "Not valid email address.";
        isvalid=false;
    }
    
    if (password === "") {
        errorMessage3.textContent = "Please enter your Password";
        isvalid=false;
    }
    if (password.length < 8) {
        errorMessage4.textContent = "Password must be at least 8 characters.";
        isvalid=false;
    }
    if (confirmPassword === "") {
        errorMessage5.textContent = "Please Confirm your password";
        isvalid=false;
    }
    if (confirmPassword !== password) {
        errorMessage6.textContent = "Confirm password doesn't match the original password.";
        isvalid=false;
    }

   return isvalid;
}