import type { Metadata } from "next";
import ConnectExperience from "../components/connect/ConnectExperience";
import "./connect.css";

export const metadata: Metadata = {
  title: "Connect | Persimmon Quest",
  description: "Explore qBand Air and qPad One through an interactive, simulated brain-health experience. No hardware or sign-in needed."
};

export default function ConnectPage() {
  return <ConnectExperience />;
}
