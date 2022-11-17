// chrome.tabs.onActivated.addListener(moveToFirstPosition);

// async function moveToFirstPosition(activeInfo) {
//   try {
//     await chrome.tabs.move(activeInfo.tabId, {index: 0});
//     console.log('Success.');
//   } catch (error) {
//     if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
//       setTimeout(() => moveToFirstPosition(activeInfo), 50);
//     } else {
//       console.error(error);
//     }
//   }
// }

const intervalID = setInterval(run, 50)

let queryOptions = { audible: true };
async function talkingTabs() {
  let [tab] = await chrome.tabs.query(queryOptions);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tab) {
        resolve(tab);
      } else {
        reject();
      }
    }, 1);
  });
}


function run() {
  talkingTabs()
  .then((tab) => {
    //TODO Get me the ID of the tab and mute the tab
    console.log(tab);
  })
  .catch((e) => {
    console.log();
  });
};
