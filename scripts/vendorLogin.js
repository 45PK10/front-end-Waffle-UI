const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const form = document.getElementById('form');


emailInput.addEventListener('blur', function (e) {
    e.preventDefault();

    const email = this.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const feedback = document.getElementById('emailFeedback');

    if (!email) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'Email should be mandatory';
    } else if (!emailRegex.test(email)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'Invalid Email Format';
    } else {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
        feedback.style.display = 'none';
    }
})

passwordInput.addEventListener('input', function (e) {
    e.preventDefault();

    const password = this.value;
    const strengthDiv = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');

    if (password.length === 0 || password.length < 3) {
        strengthDiv.style.display = 'block';
        strengthBar.className = 'strength-bar strength-weak';
    } else if (password.length < 6) {
        strengthDiv.style.display = 'block';
        strengthBar.className = 'strength-bar strength-medium';
    } else {
        strengthDiv.style.display = 'block';
        strengthBar.className = 'strength-bar strength-strong';
    }
})

let Vendor = [];
async function getVendor() {
    try {
        const requestBody = await fetch('http://localhost:4000/Vendor', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        Vendor = await requestBody.json();
        console.log(Vendor);
    } catch (error) {
        console.log(error);
    }
}
getVendor();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let vendorList = null;

     Vendor.forEach( function(vend){

        if(emailInput.value === vend.email && passwordInput.value=== vend.password){
            vendorList = vend;
        }
     })
     if(vendorList){
        localStorage.setItem('vendorId', vendorList.id );
        window.alert('Logged in successfully');
        window.location.href = 'vendorDashboard.html';
     }else{
        window.alert('incorrect email or password');
     }
})