import HeroSection from "../components/HeroSection";
import RoleSelector from "../components/RoleSelector";
import FeaturesGrid from "../components/FeaturesGrid";

export default function HomePage({ onStartInterview }) {
  return (
    <>
      <HeroSection onStartInterview={onStartInterview} />
      <RoleSelector onSelectRole={onStartInterview} />
      <FeaturesGrid />
    </>
  );
}