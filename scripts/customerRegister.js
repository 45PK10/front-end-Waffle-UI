const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const numberInput = document.getElementById('number');
const form = document.getElementById('form');



nameInput.addEventListener('blur', function () {
    const name = this.value.trim();
    const feedback = document.getElementById('nameFeedback');

    if (name.length === 0) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'Name is must be there';
    } else if (name.length < 3) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'name must be 3 chacters';
    } else {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
        feedback.style.display = 'none';
    }
})

emailInput.addEventListener('blur', function () {
    const email = this.value;
    emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

numberInput.addEventListener('blur', function () {
    const number = this.value;
    const feedback = document.getElementById('numberFeedback');

    if (number.length === 0) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'Phone number is mandatory';
    } else if (number.length < 10) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
        feedback.style.display = 'block';
        feedback.innerHTML = 'invalid phone number'
    } else {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
        feedback.style.display = 'none';
    }
})

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    let isValid = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailInput.value || !emailRegex.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!passwordInput.value) {
        passwordInput.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {


        try {

            const existRes = await fetch('http://localhost:4000/customer');
            const customer = await existRes.json();

            const exists = customer.some(user => user.email === emailInput.value);
            if (exists) {
                window.alert('Email already exists');
                return;
            }
            const requestBody = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                number: numberInput.value
            }
            var isLoading = true;
            const response = await fetch('http://localhost:4000/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            const obj = await response.json();
            console.log(obj);
            isLoading = false;


            window.alert('Sucessfully Registered')
            window.location.href = 'customerLogin.html';

        } catch (error) {
            console.log(error);
        }
    } else {
        alert('fill all required fields')
    }

});