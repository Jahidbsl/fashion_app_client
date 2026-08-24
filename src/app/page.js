import AboutPage from "@/components/AboutPage";
import Banner from "@/components/Banner";
import DiscountSlider from "@/components/DiscountSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-6">
     <Banner />
     <DiscountSlider />
     <AboutPage/>
    </div>
  );
}
