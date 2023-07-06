const word_url="https://words.dev-apis.com/word-of-the-day?random=1",check_url="https://words.dev-apis.com/validate-word";let letter_index=1,row_index=1,my_word="",row_pos=document.querySelector(`.puzzle-container .puzzle-row:nth-child(${row_index})`),letter_pos=row_pos.querySelector(`.puzzle-row :nth-child(${letter_index})`);const loader=document.querySelector(".loader"),ANSWER_LENGTH=5;let wordApi,wordJson,secretWord,message=document.querySelector(".message"),sticky=!1,lives=6,done=!1;async function init(){wordApi=await fetch(word_url),wordJson=await wordApi.json(),secretWord=wordJson.word}function insertLetter(e){!1===done&&(isLetter(e.key)&&letter_index<=5&&0==sticky?(letter_pos.value=e.key.toUpperCase(),letter_pos.style.color="black",letter_index+=1,updateLetter(letter_index),my_word+=e.key.toUpperCase()):"Enter"===e.key&&6==letter_index&&0==sticky&&row_index<7?(sticky=!0,loadSpinner(!0),checkWord(my_word)):"Backspace"===e.key&&letter_index>1&&(my_word=my_word.slice(0,my_word.length-1),letter_index-=1,updateLetter(letter_index),letter_pos.style.color="white"))}async function checkWord(e){const t={word:e=e.toLowerCase()},o=await fetch(check_url,{method:"POST",body:JSON.stringify(t)});wordFeedback((await o.json()).validWord,e)}function loadSpinner(e){!0===e?loader.classList.remove("loader-hidden"):loader.classList.add("loader-hidden")}async function wordFeedback(e,t){if(!1===e)changeBorder(!1);else if(!0===e){t===secretWord?(message.textContent="You Win!",message.style.color="#00a648",done=!0):lives==row_index&&(message.style.color="red",message.textContent=`You Lose. The word was "${secretWord}"`,done=!0);let e={};for(let o=0;o<ANSWER_LENGTH;o++){const r=t[o],d=secretWord[o];e[d]?e[d]++:e[d]=1,r===d?(letterFeedback(o+1,"#00a648"),e[r]--):letterFeedback(o+1,"#888888")}for(let o=0;o<ANSWER_LENGTH;o++){const r=t[o],d=secretWord[o];secretWord.includes(r)&&e[r]>0&&r!==d&&(letterFeedback(o+1,"#f7c652"),e[r]--)}makeReadOnly(),goNext(),my_word=""}sticky=!1}function changeBorder(e){if(!1===e){my_word="";for(let e=1;e<6;e++)updateLetter(e),letter_pos.style.borderColor="red";setTimeout((()=>{for(let e=5;e>=1;e--)updateLetter(e),letter_pos.style.borderColor="lightgrey",letter_pos.style.color="white"}),1e3),letter_index=1,updateLetter(letter_index)}loadSpinner(!1)}function isLetter(e){return/^[a-zA-Z]$/.test(e)}function updateBoth(e,t){row_pos=document.querySelector(`.puzzle-container .puzzle-row:nth-child(${e})`),letter_pos=row_pos.querySelector(`.puzzle-row :nth-child(${t})`)}function updateRow(e){row_pos=document.querySelector(`.puzzle-container .puzzle-row:nth-child(${e})`)}function updateLetter(e){letter_pos=row_pos.querySelector(`.puzzle-row :nth-child(${e})`)}function goNext(){row_index+=1,letter_index=1,updateBoth(row_index,letter_index)}function letterFeedback(e,t){updateLetter(e),letter_pos.style.backgroundColor=`${t}`,loadSpinner(!1)}function makeReadOnly(){for(let e=0;e<=ANSWER_LENGTH;e++)updateLetter(e),letter_pos&&(letter_pos.readOnly=!0),updateLetter(letter_index)}init();
//# sourceMappingURL=index.7676e2d7.js.map