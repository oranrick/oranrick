/*!
 * Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
 */
// This file adds custom interactions for the site.

(function () {
  function buildShareUrl(network, url, text) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    switch (network) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case "x":
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
      case "telegram":
        return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
      default:
        return "";
    }
  }

  function openShareWindow(url) {
    const popup = window.open(
      url,
      "_blank",
      "noopener,noreferrer,width=600,height=600",
    );

    if (!popup) {
      window.location.href = url;
    }
  }

  function getFeedbackElement(container) {
    return (
      container.querySelector(".share-feedback") ||
      container.querySelector("[data-share-feedback]")
    );
  }

  function showFeedback(container, message) {
    const feedback = getFeedbackElement(container);
    if (!feedback) return;

    feedback.textContent = message;
    feedback.classList.add("is-visible");
    window.setTimeout(() => {
      feedback.classList.remove("is-visible");
    }, 4000);
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        console.warn("Clipboard API error", error);
      }
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch (error) {
      console.warn("Fallback clipboard copy failed", error);
    }

    return false;
  }

  function prepareShareButtons(root = document) {
    const context = root || document;

    let shareBlocks = [];

    const isElement = context instanceof Element;
    const isDocumentFragment =
      typeof DocumentFragment !== "undefined" &&
      context instanceof DocumentFragment;

    if (isElement || isDocumentFragment) {
      shareBlocks = Array.from(context.querySelectorAll(".share-container"));

      if (context.matches && context.matches(".share-container")) {
        shareBlocks.unshift(context);
      }
    } else {
      shareBlocks = Array.from(document.querySelectorAll(".share-container"));
    }

    shareBlocks.forEach((block) => {
      if (block.dataset.shareInitialised === "true") {
        return;
      }

      const baseUrl =
        block.getAttribute("data-share-url") || window.location.href;
      const baseText =
        block.getAttribute("data-share-text") || document.title || baseUrl;

      const buttons = block.querySelectorAll("[data-share-network]");

      buttons.forEach((button) => {
        const network = button.getAttribute("data-share-network");
        if (!network) return;

        if (network === "copy") {
          button.addEventListener("click", async (event) => {
            event.preventDefault();
            const copied = await copyToClipboard(baseUrl);
            if (copied) {
              showFeedback(
                block,
                "Enlace copiado. ¡Compártelo donde quieras!",
              );
            } else {
              showFeedback(
                block,
                "No se pudo copiar automáticamente. Copia el enlace manualmente.",
              );
            }
          });
          return;
        }

        if (network === "native" && navigator.share) {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            navigator
              .share({
                title: baseText,
                text: baseText,
                url: baseUrl,
              })
              .catch((error) => {
                if (error && error.name !== "AbortError") {
                  console.warn("Native share failed", error);
                }
              });
          });
          return;
        }

        const shareUrl = buildShareUrl(network, baseUrl, baseText);
        if (!shareUrl) {
          return;
        }

        button.addEventListener("click", (event) => {
          event.preventDefault();
          openShareWindow(shareUrl);
        });
      });

      block.dataset.shareInitialised = "true";
    });
  }

  window.initializeShareButtons = prepareShareButtons;

  document.addEventListener("DOMContentLoaded", () => {
    prepareShareButtons(document);
  });
})();
