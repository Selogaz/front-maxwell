import Greeting from '@/components/sections/index/Greeting';
import About from '@/components/sections/index/About';
import Adventures from '@/components/sections/index/Adventures';
import Advantages from '@/components/sections/index/Advantages';
import Pricing from '@/components/sections/index/Pricing';

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
