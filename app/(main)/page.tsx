import Banner from "@/components/landing/banner";
import Products from "@/components/landing/products";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container">
        <Products />
      </div>
    </>
  );
}
