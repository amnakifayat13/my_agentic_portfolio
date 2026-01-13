import ContactSection from "./contact/page";
import HeroSystem from "./components/HeroSystem";
import ProjectTimeline from "./projects/page";
import SkillsSection from "./components/Skills";


export default function Home() {
  return (
    <main className= "md:w-[1170px] md:mx-auto">
      <HeroSystem />
      <ProjectTimeline/>
      <SkillsSection/>
      <ContactSection/>
      
    </main>
  );
}
