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

// Make array of expandable sections
const expandableElementFactory = (section) => {
  return {
    heading: section.getElementsByTagName("h2")[0],
    arrow: section.getElementsByClassName("arrow")[0],
    rotateArrowDown() {
      if (!this.expanded) {
        this.arrow.style.transform = "rotate(45deg)";
      }
    },
    rotateArrowRight() {
      if (this.expanded) this.arrow.style.transform = "rotate(-45deg)";
    },
    elementToExpand:
      section.parentElement.getElementsByClassName("expendable")[0],

    expanded: false,

    expandOrClose() {
      if (this.expanded === false) {
        this.elementToExpand.style.display = "flex";
        this.rotateArrowDown();
        this.expanded = true;
      } else {
        this.elementToExpand.style.display = "none";
        this.rotateArrowRight();
        this.expanded = false;
      }
    },
  };
};

const expandableSections = Array.from(
  document.getElementsByClassName("expandingHeading")
).map((section) => expandableElementFactory(section));

expandableSections.forEach(({ heading, arrow }) => {
  heading.addEventListener("pointerdown", (event) => {
    const target = event.target;
    expandableSections
      .find((section) => target === section.heading)
      .expandOrClose();
  });

  arrow.addEventListener("pointerdown", (event) => {
    const target = event.target;
    console.log("in arrow mouseover event");
    console.log(target);
    expandableSections
      .find((section) => target === section.arrow)
      .expandOrClose();
  });
});
