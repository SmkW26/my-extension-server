(function () {
  const url = new URL(window.location.href);

  // 1. Ürün sayfasındaysa → add to cart
  if (url.pathname.startsWith("/dp/")) {
    const interval = setInterval(() => {
      const addBtn = document.querySelector("#add-to-cart-button, input#add-to-cart-button");
      if (addBtn) {
        addBtn.click();
        clearInterval(interval);
      }
    }, 500);
  }

  // 2. Added to cart sayfasıysa → Go to Cart butonuna tıkla
  if (window.location.href.includes("/gp/aws/cart/add.html")) {
    const goToCart = () => {
      const cartBtn = [...document.querySelectorAll("*")].find(
        (el) => el.textContent?.trim() === "Go to Cart"
      );
      if (cartBtn) cartBtn.click();
    };
    setTimeout(goToCart, 1500);
  }

  // 3. Sepetteysek → kupon ve adet kontrolü
  if (url.pathname === "/cart" || url.pathname === "/gp/cart/view.html") {
    window.addEventListener("load", () => {
      const targetQty = parseInt(localStorage.getItem("affiliate_quantity") || "1", 10);

      const tryCartActions = () => {
        const valueSpan = document.querySelector('span[data-a-selector="value"]');
        const plusBtn = document.querySelector('button[data-a-selector="increment"]');
        const couponLink = document.querySelector('a.sc-action-link');

        if (!valueSpan || !plusBtn) {
          setTimeout(tryCartActions, 500);
          return;
        }

        let currentQty = parseInt(valueSpan.textContent.trim(), 10);

        const applyCoupon = () => {
          if (couponLink) couponLink.click();
        };

        if (currentQty >= targetQty) {
          applyCoupon();
          return;
        }

        const interval = setInterval(() => {
          if (currentQty >= targetQty) {
            clearInterval(interval);
            applyCoupon();
            return;
          }
          plusBtn.click();
          currentQty++;
        }, 1000);
      };

      tryCartActions();
    });
  }
})();
