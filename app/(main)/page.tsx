import Banner from "@/components/landing/banner";
import Products from "@/components/landing/products";
import DataProvider from "@/providers/DataProvider";

export default function Home() {
  return (
    <DataProvider>
      <Banner />
      <div className="container">
        <Products />
      </div>
    </DataProvider>
  );
}
