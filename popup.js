// TODO Find me a way to exclude sites from being asked at all

// If (this site is whitelisted)
// then
//  do nothing
// else
//   start the timer here
const intervalID = setInterval(run, 50);

// TODO Find a way to unmute the page after its been muted AND stop the process from running on this tab again.
// this function can be called to toggle the muted state of tabs. If we toggle its muted state, we should also set a request to stop asking on this page.
async function toggleMuteState(tabId) {
  const tab = await chrome.tabs.get(tabId);
  const muted = !tab.mutedInfo.muted;
  await chrome.tabs.update(tabId, { muted });
  console.log(`Tab ${tab.id} is ${muted ? 'muted' : 'unmuted'}`);
}

let queryOptions = { audible: true };
async function talkingTabs() {
  let [tab] = await chrome.tabs.query(queryOptions);
  // TODO find out if all tabs are to be returned in an array/ probably has to do with manifest permissions specifically the activeTab permission.
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
// function to extract id and mute tab
async function getIdAndMute(tab) {
  console.log(tab);
  await chrome.tabs.update(tab.id, { muted: true }); // TODO this really needs to loop over an array as of right now it only works if one tab is audible
}
// basically the init function, it asks the program to start listening to tabs and then handles th response
function run() {
  talkingTabs()
    .then((tab) => {
      // Here we call the function that takes the object data of the tabs that are audible and mutes them.
      getIdAndMute(tab);
    })
    .catch((e) => {
      console.log();
    });
}
