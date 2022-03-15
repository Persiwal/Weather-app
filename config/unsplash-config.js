export const unsplash = {
  clientID: "lIhop-7RCk1OmyEl2IMpNDUkhBT5xJG2y9r5NpnR2Ks",

  fetchPhoto: function (keyword) {
    fetch(
      `https://api.unsplash.com/photos/random/?color=white&q=0&query=city&orientation=landscape&client_id=${this.clientID}`
    )
      .then((response) => response.json())
      .then((data) => this.setPhotoAsBg(data));
  },
  setPhotoAsBg: function (data) {
    const { links } = data;
    document.body.style.backgroundImage = `url(${links["download"]})`;
  },
};
