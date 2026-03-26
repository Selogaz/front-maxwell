import Greeting from '@/components/sections/Greeting';
import About from '@/components/sections/About';
import Adventures from '@/components/sections/Adventures';
import Advantages from '@/components/sections/Advantages';
import Pricing from '@/components/sections/Pricing';

export default function Home() {
  return (
    <>
      <Greeting />
      <About />
      <Advantages />
      <Pricing />
      <Adventures />
    </>
  );
}
