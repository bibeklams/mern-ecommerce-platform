import React from "react";
import ShopNowBanner from "../../components/home/ShopNowBanner";
import CategorySection from "../../components/home/CategorySection";
import Products from "./Products";
function Home() {
  return (
    <main>
      <ShopNowBanner />
      <CategorySection />
      <Products />
    </main>
  );
}

export default Home;
