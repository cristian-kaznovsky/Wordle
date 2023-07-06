let Keyboard = window.SimpleKeyboard.default;

function createKeyboardEvent(key) {
  let event;
  if (key === "Enter") {
    event = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
      which: 13,
      shiftKey: false,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  } else if (key === "Backspace") {
    event = new KeyboardEvent("keydown", {
      key: "Backspace",
      code: "Backspace",
      keyCode: 8,
      charCode: 8,
      which: 8,
      shiftKey: false,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  } else {
    event = new KeyboardEvent("keydown", {
      key: key,
      code: `Key${key.toUpperCase()}`,
      keyCode: key.toUpperCase().charCodeAt(0),
      charCode: key.charCodeAt(0),
      which: key.toUpperCase().charCodeAt(0),
      shiftKey: false,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  }
  return event;
}

let keyboard = new Keyboard({
  // onChange: (event) => {
  //   const arr = event;
  //   console.log(arr);
  //   const parsedEvent = createKeyboardEvent(arr);
  //   insertLetter(parsedEvent);
  //   event = "";
  // },
  onKeyPress: (button) => configureKey(button),
  mergeDisplay: true,
  theme: "hg-theme-default hg-theme-ios",
  layout: {
    default: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "Z X C V B N M {backspace} {enter}",
    ],
  },
  display: {
    "{enter}": "Enter",
    "{backspace}": "⌫",
  },
});
function configureKey(button) {
  //console.log("Button pressed", button);
  let key;
  key = button.replaceAll("{", "");
  key = key.replaceAll("}", "");
  let capitalizedKey = key.slice();
  capitalizedKey =
    capitalizedKey.charAt(0).toUpperCase() + capitalizedKey.slice(1);
  //console.log(capitalizedKey);
  insertLetter(createKeyboardEvent(capitalizedKey));
}

function checkScreen() {
  const keyboardDiv = document.querySelector(".simple-keyboard");
  let w = window.innerWidth;
  let h = window.innerHeight;
  //console.log("Browser width: " + w + ", height: " + h + ".");
  if (w > 720) {
    //keyboardDiv.remove();
    keyboardDiv.style.width=`${w/2}px`;
    keyboardDiv.style.textAlign="center";
    keyboardDiv.style.justifyContent="center";
    keyboardDiv.style.alignItems="center";
  }
}
checkScreen();
