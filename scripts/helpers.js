function textToBinary(text) {
    let binaryMessage = '';
    for (let i = 0; i < text.length; i++) {
      const binaryChar = text.charCodeAt(i).toString(2).padStart(8, '0');
      binaryMessage += binaryChar;
    }
    return binaryMessage;
}
  
function binaryToText(binary) {
    let text = '';
    for (let i = 0; i < binary.length; i += 8) {
      const binaryChar = binary.substr(i, 8);
      const charCode = parseInt(binaryChar, 2);
      text += String.fromCharCode(charCode);
    }
    return text;
}