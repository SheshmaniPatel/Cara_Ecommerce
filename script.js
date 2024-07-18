// Script for navigation bar
// controlling navbar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Select all elements with the class name 'product'
const products = document.querySelectorAll(".product");

// Loop through each element and add the onclick event
products.forEach((product) => {
  product.addEventListener("click", () => {
    const imgElement = product.querySelector("img");
    window.location.href = "sproduct.html";
    if (imgElement) {
      const imgSrc = imgElement.src;
      // Encode the image source URL to pass as a parameter
      const encodedImgSrc = encodeURIComponent(imgSrc);
      // Redirect to sproduct.html with encodedImgSrc as parameter
      window.location.href = `sproduct.html?img=${encodedImgSrc}`;
    }
  });
});
