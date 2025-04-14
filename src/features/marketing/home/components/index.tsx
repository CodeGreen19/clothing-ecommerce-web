import Banner from "./Banner";
import NewArrived from "./NewArrived";
import BrowseCollection from "./BrowseCollection";
import FAQSection from "./FrequentlyAsked";
import Categories from "./Categories";
import { ScrollCards } from "./ScrollCards";

const Homepage = () => {
  return (
    <main>
      <section className="background-banner min-h-screen pb-10 lg:min-h-screen">
        <Banner />
        <BrowseCollection />
      </section>
      {/* <div className="hero-wave-border-bottom"></div> */}
      <NewArrived />
      <Categories />
      <ScrollCards />
      <FAQSection />
    </main>
  );
};

export default Homepage;
