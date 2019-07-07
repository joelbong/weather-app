const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message')

weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const location = search.value;
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message.innerHTML = data.error;
                } else {
                    message.innerHTML = `In ${data.location}, temperature is ${data.temperature}° and humidity ${data.humidity}`;
                }
        })
})
})