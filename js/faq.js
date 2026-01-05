function initFAQ() {
  const faqNodes = document.querySelectorAll(".faq-node");
  if (!faqNodes.length) return;

  faqNodes.forEach((node) => {
    const trigger = node.querySelector(".faq-trigger");
    const response = node.querySelector(".faq-response");
    const inner = node.querySelector(".response-inner");

    if (!trigger || !response || !inner) return;

    trigger.addEventListener("click", () => {
      const isActive = node.classList.contains("active");

      faqNodes.forEach((other) => {
        if (other !== node) {
          other.classList.remove("active");
          const r = other.querySelector(".faq-response");
          if (r) r.style.maxHeight = "0px";
        }
      });

      if (!isActive) {
        node.classList.add("active");
        response.style.maxHeight = inner.scrollHeight + "px";
      } else {
        node.classList.remove("active");
        response.style.maxHeight = "0px";
      }
    });
  });
}
