const okBtn = document.getElementById('okBtn');
const cancelBtn = document.getElementById('cancelBtn');
const showBtn = document.getElementById('showBtn');
const showModalBtn = document.getElementById('showModalBtn');
const dialog = document.getElementById('dialog');

const closeDialog = () => {
  if(!dialog) {
    dialog = document.getElementById('dialog');
  }
  if(dialog.open) {
    dialog.close();
  }
}

okBtn.addEventListener('click', function(event) {
  console.log('dialog props: ', dialog[open]);
  closeDialog();
});

cancelBtn.addEventListener('click', function(event) {
  closeDialog();
});

showBtn.addEventListener('click', function(event) {
  closeDialog();
  dialog.show();
});

showModalBtn.addEventListener('click', function(event) {
  closeDialog();
  dialog.showModal();
});