const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const form = document.getElementById('form');

emailInput.addEventListener('blur', function () {
    const email = this.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const feedback = document.getElementById('emailFeedback');

    if (email.length === 0) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'Email address mandatory';
    } else if (!emailRegex.test(email)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'enter a valid email address';
    } else {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
        feedback.style.display = 'none';
    }
})

passwordInput.addEventListener('input', function () {
    const password = this.value;
    const strengthDiv = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');

    if (password.length > 0) {
        strengthDiv.style.display = 'block';
        if (password.length < 6) {
            strengthBar.className = 'strength-bar  strength-weak'
        } else if (password.length < 8) {
            strengthBar.className = 'strength-bar strength-medium';
        } else {
            strengthBar.className = 'strength-bar  strength-strong';
        }
    } else {
        strengthDiv.style.display = 'none';
    }

})

let customer = [];

async function getCustomers() {

    try {
        const requestBody = await fetch('http://localhost:4000/customer', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        customer = await requestBody.json();

    } catch (error) {
        console.log(error)
    }
}
getCustomers();

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let customerInfo = null;

    customer.forEach(function (cust) {

        if (cust.email === emailInput.value && cust.password === passwordInput.value) {
            customerInfo = cust;
        }
    });
    if (customerInfo) {
        localStorage.setItem('customerId', customerInfo.id);
        window.location.href = './customerDashboard.html';;
        window.alert('Logged in successfully');
    } else {
        window.alert('incorrect email or password');
 

    }


})