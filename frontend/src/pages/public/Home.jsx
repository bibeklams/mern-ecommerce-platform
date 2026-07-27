import ShopNowBanner from "../../components/home/ShopNowBanner";
import FeaturedProducts from "../../components/product/FeaturedProducts";
import CategorySection from "../../components/home/CategorySection";
import Products from "./Products";

import { useSelector } from "react-redux";

function Home() {
  const { products, featuredProducts } = useSelector((state) => state.product);

  console.log("Products:", products);
  console.log("Featured:", featuredProducts);

  return (
    <main>
      <ShopNowBanner />

      <FeaturedProducts />

      <CategorySection />

      <Products />
    </main>
  );
}

export default Home;
