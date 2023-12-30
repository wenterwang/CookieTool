document.addEventListener('DOMContentLoaded', function() {
  var getButton = document.getElementById('get-cookies');
  var toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(function() {
      toast.style.display = 'none';
    }, 2000);
  }

  getButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var url = tabs[0].url;
      chrome.cookies.getAll({url: url}, function(cookies) {
        let cookiesText = '';
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          cookiesText += cookie.name + '=' + cookie.value + (i < cookies.length - 1 ? '; ' : '');
        }
        // 将获取到的 cookie 复制到剪切板
        navigator.clipboard.writeText(cookiesText).then(function() {
          showToast('Cookies copied to clipboard.');
        }, function(err) {
          console.error('Could not copy cookies to clipboard: ', err);
          showToast('Failed to copy cookies to clipboard.');
        });
      });
    });
  });
});
