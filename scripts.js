(function () {
  var copyButtons = document.querySelectorAll("[data-copy-link]");
  var currentUrl = "https://journal.kaliartistry.com/heavy-is-the-crown-brunson-wanted-the-smoke/";

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var original = button.getAttribute("data-original-text") || button.textContent;
      button.setAttribute("data-original-text", original);

      var setStatus = function (label) {
        button.textContent = label;
        button.setAttribute("aria-live", "polite");
        window.setTimeout(function () {
          button.textContent = original;
        }, 1600);
      };

      var fallbackCopy = function () {
        var area = document.createElement("textarea");
        area.value = currentUrl;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        var ok = false;
        try {
          ok = document.execCommand("copy");
        } catch (error) {
          ok = false;
        }
        document.body.removeChild(area);
        return ok;
      };

      var writeText = navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(currentUrl)
        : Promise.reject(new Error("Clipboard API unavailable"));

      writeText.then(function () {
        setStatus("Copied");
      }).catch(function () {
        setStatus(fallbackCopy() ? "Copied" : "Copy manually");
      });
    });
  });

  var progress = document.querySelector(".reading-progress span");
  if (progress) {
    var updateProgress = function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var percent = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
      progress.style.width = percent + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
  }
})();
