export const unsplash = {
  clientID: "lIhop-7RCk1OmyEl2IMpNDUkhBT5xJG2y9r5NpnR2Ks",

  fetchPhoto: async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random/?color=white&q=0&query=city&orientation=landscape&client_id=${unsplash.clientID}`)
      const data = await response.json();
      return unsplash.setPhotoAsBg(data);
    } catch (err) {
      console.log(err);
    }
  },
  setPhotoAsBg: (data) => {
    const { links } = data;
    document.body.style.backgroundImage = `url(${links["download"]})`;
  },
};
