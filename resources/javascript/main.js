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
      // console.log("trying to change sttyle");
      if (!this.expanded) {
        // console.log("this section is not expanded");
        this.arrow.style.transform = "rotate(45deg)";
      }
    },
    rotateArrowRight() {
      if (!this.expanded) this.arrow.style.transform = "rotate(-45deg)";
    },
    elementToExpand:
      section.parentElement.getElementsByClassName("expendable")[0],
    expanded: false,
    expandOrClose() {
      if (this.expanded === false) {
        this.elementToExpand.style.display = "flex"; // TODO: think about changing to "initial"
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
  heading.addEventListener("mouseover", (event) => {
    const target = event.target;
    expandableSections
      .filter((section) => target === section.heading)[0]
      .rotateArrowDown();
  });

  heading.addEventListener("click", (event) => {
    const target = event.target;
    expandableSections
      .filter((section) => target === section.heading)[0]
      .expandOrClose();
  });

  arrow.addEventListener("click", (event) => {
    const target = event.target;
    expandableSections
      .filter((section) => target === section.heading)[0]
      .expandOrClose();
  });

  heading.addEventListener("mouseout", (event) => {
    const target = event.target;
    expandableSections
      .filter((section) => target === section.heading)[0]
      .rotateArrowRight();
  });

  arrow.addEventListener("mouseover", (event) => {
    const target = event.target;
    expandableSections
      .filter((section) => target === section.arrow)[0]
      .rotateArrowDown();
  });

  arrow.addEventListener("mouseout", (event) => {
    const target = event.target;
    expandableSections
      .filter((section) => target === section.arrow)[0]
      .rotateArrowRight();
  });

  // arrow.addEventListener(
  //   "mouseout",
  //   expandableSections.filter((section) => arrow === section.arrow)[0]
  //     .rotateArrowRight
  // );
  // heading.onClick = expandableSections.filter(
  //   (section) => heading === section.heading
  // )[0].expandOrClose;
  // arrow.onClick = expandableSections.filter(
  //   (section) => arrow === section.arrow
  // )[0].expandOrClose;
});

// expandableSections.forEach(section => {
//   section.heading.addEventListener()
// });

// console.log(expandableSections);

// const expendingButtons = Array.from(
//   document.getElementsByClassName("expanding")
// );

// const expendingArrows = Array.from(document.getElementsByClassName("arrow"));

// console.log(expendingArrows);

// const rotateArrowDown = (event) => {
//   console.log(event.target);
//   event.target.style.transform = "rotate(45deg)";
// };

// const rotateArrowRight = (event) => {
//   event.target.style.transform = "rotate(-45deg)";
// };

// expendingArrows.forEach((arrow) => {
//   arrow.addEventListener("mouseover", rotateArrowDown);
//   arrow.addEventListener("mouseout", rotateArrowRight);
// });

// function that expand and closes the expandable sections
// const expand = (event) => {
//   const expandingButton = event.target;
//   const expandableElement = {
//     heading: "",
//     arrow: "",
//     elementToExpand: "",
//     expanded: false;
//   };

//   if (expandingButton.getAttribute("class") === "arrow") {
//     arrow = expandingButton;
//   } else {
//     arrow = expandingButton.getElementsByClassName("arrow");
//   }

//   heading = expandingButton.parentElement;
//   elementToExpand =
//     heading.parentElement.getElementsByClassName("expendable")[0];

//   if (elementToExpand.style.display === "flex") {
//     elementToExpand.style.display = "none";
//     arrow.style.transform = "rotate(-45deg)";
//   } else {
//     elementToExpand.style.display = "flex";
//     arrow.style.transform = "rotate(45deg)";
//   }
// };

// Adds event listeners for the expanding sections
// expendingButtons.forEach((element) => {
//   element.addEventListener("click", expand);
// });
