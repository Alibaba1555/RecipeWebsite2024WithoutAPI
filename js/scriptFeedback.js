//Api for EmailJS (feedback directely to my gmail)
emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', feedbackForm)
    .then(() => {
        alert('Feedback sent successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send feedback.');
    });
