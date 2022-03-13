export let unsplash = {
  clientID: "lIhop-7RCk1OmyEl2IMpNDUkhBT5xJG2y9r5NpnR2Ks",

  fetchPhoto: function (keyword) {
    fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&orientation=landscape&client_id=${this.clientID}`
    )
      .then((response) => response.json())
      .then((data) => this.setPhotoAsBg(data));
  },
  setPhotoAsBg: function (data) {
    const { results } = data;
    //  console.log(results);
    console.log(results);
    document.body.style.backgroundImage = `url(${results[0].urls["regular"]})`;
  },
};
