function showLoadingPopup(event, url) {
    event.preventDefault();
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    setTimeout(() => {
      window.open(url, '_blank');
      popup.classList.add('hidden');
    }, 1400);
  }
  function showProfilePopup() {
    document.getElementById('profilePopup').classList.remove('hidden');
  }
  function hideProfilePopup() {
    document.getElementById('profilePopup').classList.add('hidden');
  }
