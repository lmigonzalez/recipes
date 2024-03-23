import Image from "next/image";
import Hero from "./sections/Hero";
import Popular from "./sections/Popular";
import Testimonials from "./sections/Testimonials";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <Popular />
      <Testimonials />
    </main>
  );
}
