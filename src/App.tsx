import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { Collection } from '@/sections/Collection';
import { Menu } from '@/sections/Menu';
import { Story } from '@/sections/Story';
import { CustomCakes } from '@/sections/CustomCakes';
import { Visit, Footer } from '@/sections/Visit';
import { Chatbot } from '@/components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Collection />
      <Menu />
      <Story />
      <CustomCakes />
      <Visit />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
