(function () {
  const url = new URL(window.location.href);

  // Eğer ilk link (AssociateTag=1 olan) ile geldiysek
  if (url.pathname.includes("/gp/aws/cart/add.html") && url.searchParams.get("AssociateTag") === "1") {
    const asin = url.searchParams.get("ASIN.1");
    const orderId = url.searchParams.get("AmazonOrderId");
    const quantity = url.searchParams.get("Quantity.1") || "1";

    if (!asin || !orderId) return;

    // Yeni taglı ürün sayfası
    const tagUrl = new URL(`https://www.amazon.com/dp/${asin}`);
    tagUrl.searchParams.set("asin", asin);
    tagUrl.searchParams.set("amazonOrderId", orderId);
    tagUrl.searchParams.set("quantity", quantity);
    tagUrl.searchParams.set("sendType", "1");
    tagUrl.searchParams.set("linkCode", "ll1");
    tagUrl.searchParams.set("th", "1");
    tagUrl.searchParams.set("language", "en_US");
    tagUrl.searchParams.set("tag", "smartfind0545-20");

    // Taglı ürüne yönlendir
    window.location.href = tagUrl.toString();
  }

  // Eğer taglı ürün sayfasına geldiysek ve içinde amazonOrderId geçiyorsa
  if (url.pathname.startsWith("/dp/") && url.searchParams.get("amazonOrderId")) {
    const asin = url.pathname.split("/dp/")[1].split("/")[0];
    const orderId = url.searchParams.get("amazonOrderId");
    const quantity = url.searchParams.get("quantity") || "1";

    // Add to Cart linkine geri dön
    const cartUrl = new URL("https://www.amazon.com/gp/aws/cart/add.html");
    cartUrl.searchParams.set("AmazonOrderId", orderId);
    cartUrl.searchParams.set("sendType", "1");
    cartUrl.searchParams.set("ASIN.1", asin);
    cartUrl.searchParams.set("Quantity.1", quantity);
    cartUrl.searchParams.set("tag", "smartfind0545-20");
    cartUrl.searchParams.set("AssociateTag", "1");

    // 1 saniye sonra yönlendir
    setTimeout(() => {
      window.location.href = cartUrl.toString();
    }, 1000);
  }
})();
