function hideAll() {
  const elementsToHide = document.querySelectorAll(".show");
  elementsToHide.forEach((element) => element.classList.remove("show"));
}

function show(selector) {
  hideAll();
  document.querySelector(selector).classList.add("show");
}

export { show };
