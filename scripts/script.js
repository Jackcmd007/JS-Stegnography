function previewImage(event) {
    const previewDiv = document.getElementById('preview');
    previewDiv.innerHTML = '';
  
    const imageFile = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const image = document.createElement('img');
      image.src = e.target.result;
      // image.style.maxWidth = '500px'; // Adjust the maximum width as needed
      // image.style.maxHeight = '500px'; // Adjust the maximum height as needed
      previewDiv.appendChild(image);
    };
  reader.readAsDataURL(imageFile);
}

//function to download the encoded image
function downloadImage() {
    const outputDiv = document.getElementById('output');
    const encodedImage = outputDiv.querySelector('img');
    
    if (encodedImage) {
      const downloadLink = document.createElement('a');
      downloadLink.href = encodedImage.src;
      downloadLink.download = 'encoded_image.png';
      downloadLink.click();
    }
  }
  
// Event listener for download button
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', downloadImage);



function copyText() {
    const decodedText = document.getElementById('decodedText');
    decodedText.select();
    document.execCommand('copy');
}