module.exports = {
  readableDate: function (dateString) {
    return new Date(dateString).toDateString();
  },
  /**
   * Shuffle function obtained from: https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
   */
  shuffleArray: function (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  },

  /**
   * A function to change values from hex codes to RGB
   */
  hexToRGB: function (hex) {
    let r = 0,
      g = 0,
      b = 0;
    // handling 3 digit hex
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
      // handling 6 digit hex
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }

    return {
      red: +r,
      green: +g,
      blue: +b,
    };
  },
  validateEmail: function (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
};
