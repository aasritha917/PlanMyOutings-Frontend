import Dashboard from "./Dashboard";
import Restaurants from "./Restaurants";
import Movies from "./Movies";
import Temples from "./Temples";
import Beaches from "./Beaches";
import Waterfalls from "./Waterfalls";
import Parks from "./Parks";
import Footer from "./Footer"; // ✅ import Footer

export default function Home({ darkMode, user, setAuthModalOpen }) {
  const categories = [
    {
      key: "dashboard",
      label: "Dashboard",
      component: <Dashboard darkMode={darkMode} user={user} setAuthModalOpen={setAuthModalOpen} />,
    },
    
    { key: "movies", label: "Movies", component: <Movies darkMode={darkMode} /> },
    { key: "temples", label: "Temples", component: <Temples darkMode={darkMode} /> },
    { key: "beaches", label: "Beaches", component: <Beaches darkMode={darkMode} /> },
    
    { key: "waterfalls", label: "Waterfalls", component: <Waterfalls darkMode={darkMode} /> },
    { key: "parks", label: "Parks", component: <Parks darkMode={darkMode} /> },
    { key: "restaurants", label: "Restaurants", component: <Restaurants darkMode={darkMode} /> },
  ];

  return (
    <div className="transition-colors">
      {categories.map((cat) => (
        <section key={cat.key} id={cat.key}>
          {cat.component}
        </section>
      ))}

      {/* Footer added here */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
