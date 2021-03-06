// Saves options to chrome.storage.sync.
function save_options() {
  var mode = document.getElementById('mode').value;
  console.log(mode);
  chrome.storage.sync.set({
    appMode: mode
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    appMode: 'highlight'
      }, function(items) {
    document.getElementById('mode').value = items.appMode;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);