// Function to encode text message into an image
function encode() {
  const imageInput = document.getElementById('imageInput');   // Get the input element for image file
  const messageInput = document.getElementById('messageInput');   // Get the input element for text message
  const outputDiv = document.getElementById('output');   // Get the output container element

  const imageFile = imageInput.files[0];   // Get the selected image file
  const reader = new FileReader();   // Create a new FileReader object to read the image file

  reader.onload = function (e) {
    const image = new Image();   // Create a new Image object
    image.onload = function () {
      const canvas = document.createElement('canvas');   // Create a canvas element
      const context = canvas.getContext('2d');   // Get the 2D rendering context of the canvas
      canvas.width = image.width;   // Set the canvas width to match the image width
      canvas.height = image.height;   // Set the canvas height to match the image height
      context.drawImage(image, 0, 0);   // Draw the image on the canvas

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);   // Get the image data from the canvas
      const pixels = imageData.data;   // Get the pixel data from the image data
      const binaryMessage = textToBinary(messageInput.value);   // Convert the text message to binary representation
      let messageIndex = 0;   // Initialize the message index

      for (let i = 0; i < pixels.length; i += 4) {
        if (messageIndex >= binaryMessage.length) break;   // Break the loop if the entire message has been encoded

        const pixel = pixels.subarray(i, i + 4);   // Get the RGBA values of a pixel

        for (let j = 0; j < 3; j++) {
          if (messageIndex >= binaryMessage.length) break;   // Break the loop if the entire message has been encoded

          pixel[j] = (pixel[j] & 0xFE) | Number(binaryMessage[messageIndex]);   // Modify the least significant bit of the pixel color component to encode the message bit
          messageIndex++;
        }

        pixels.set(pixel, i);   // Update the pixel data with the modified values
      }

      context.putImageData(imageData, 0, 0);   // Put the modified image data back to the canvas

      const encodedImage = document.createElement('img');   // Create a new image element for the encoded image
      encodedImage.src = canvas.toDataURL();   // Set the source of the image to the canvas data URL
      outputDiv.innerHTML = '';   // Clear the output container
      outputDiv.appendChild(encodedImage);   // Append the encoded image to the output container

      const downloadLink = document.createElement('a');   // Create a download link for the encoded image
      downloadLink.href = canvas.toDataURL();   // Set the download link URL to the canvas data URL
      downloadLink.download = 'encoded_image.png';   // Set the download file name
      downloadLink.innerText = 'Download Image';   // Set the text for the download link
      //outputDiv.appendChild(downloadLink);   // Uncomment this line to append the download link to the output container
    };

    image.src = e.target.result;   // Set the source of the image to the file reader result (image data URL)
  };

  reader.readAsDataURL(imageFile);   // Read the image file as data URL
}
