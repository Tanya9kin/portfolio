// add functionality for the arrow on the side of the sections to rotate and for the content to show, when clicking on the h2 or the arrow associated with it

// add event listener to all buttons
// if button doesn't have a valid link (<a> element in it is with href="" change color and don't to anything, maybe show message that unavailible)

const buttons = Array.from(document.getElementsByTagName("button")).filter(
  (element) => element.id != "dropdown-btn"
);

const onHoverComingSoon = (event) => {
  const element = event.target;
  const originalContent = element.innerHTML;
  element.style.opacity = "0.8";
  element.innerHTML = "coming soon";
  element.addEventListener("mouseout", () => {
    element.innerHTML = originalContent;
    element.style.opacity = "0.5";
  });
};

const checkValidLink = (button) => {
  const aChild = button.children[0];
  const href = aChild.getAttribute("href");
  if (href === "" || href === "#") {
    button.style.backgroundColor = "hsla(206, 53%, 13%, 1)";
    button.style.opacity = "0.5";
    button.addEventListener("mouseover", onHoverComingSoon);
  }
};

buttons.forEach(checkValidLink);

// console.log(buttons);

//every expendable article had a sibling h2, a click on which should expand it
// const expand = () => {

// };

const expendingButtons = Array.from(
  document.getElementsByClassName("expanding")
);

const expand = (event) => {
  //   console.log(event.target.nextElementSibling);
  const elementToExpand = event.target.nextElementSibling;
  elementToExpand.style.display = "flex";
};

// console.log(expendingButtons);

expendingButtons.forEach((element) => {
  //   console.log(element);
  element.addEventListener("click", expand);
});
