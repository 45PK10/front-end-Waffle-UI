const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const numberInput = document.getElementById('number');
const form = document.getElementById('form');

    nameInput.addEventListener('blur', function (e) {
        e.preventDefault();

        const name = this.value.trim();
        const feedback = document.getElementById('nameFeedback');

        if (!name) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            feedback.style.display = 'block';
            feedback.innerHTML = 'Name must be manadatory';
        } else if (name.length < 6) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            feedback.style.display = 'block';
            feedback.innerHTML = 'Name should be contain atleast 6 characters';
        } else {
            this.classList.add('is-valid');
            this.classList.remove('is-invalid');
            feedback.style.display = 'none';
        }
    });

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

let Vendor = [];
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    let isValid = true;

    const name = nameInput.value;
    if (!name) {
        nameInput.classList.add('is-invalid');
        isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = emailInput.value;
    if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
    }


    const password = passwordInput.value;
    if (!password || password.length < 9) {
        passwordInput.classList.add('is-invalid');
        isValid = false;
    }

    const number = numberInput.value;
    if (!number || number.length < 10) {
        numberInput.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        try {

            const existRes = await fetch('http://localhost:4000/Vendor');
            const Vendor = await existRes.json();

            const exists = Vendor.some(vendorr => vendorr.email === emailInput.value);
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
            const response = await fetch('http://localhost:4000/Vendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            const obj = await response.json();
            console.log(obj);
            isLoading = false;


            window.alert('Sucessfully Registered');
            
            window.location.href = 'vendorLogin.html';

        } catch (error) {
            console.log(error);
        }
    } else {
        alert('fill all required fields')
    }

})

