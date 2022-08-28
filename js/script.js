const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    /*The validation of input, and if present to display the spinner. */
    if(url === ''){
        alert('Please enter a valid url');
    } else{
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
};

/*The following is for the image size of the QR Code.*/
const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    })
}

/*Displaying the spinner */
const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

/*Hiding it after an appointed time. */
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

/*Clear everything */
const clearUI = () => {
    qr.innerHTML = '';

    const saveLink = document.getElementById('save-link');
    if (saveLink)
        saveLink.remove();
};

/*Making the button actually able to download the image that is displayed. */
const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);