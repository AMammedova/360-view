import dynamic from "next/dynamic";

const PanoramaContainer = dynamic(() => import("@/containers/PanoramaContainer"), { ssr: false });
export default function Home() {
  return <PanoramaContainer/>;
}
