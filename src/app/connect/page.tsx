import type { Metadata } from "next";
import ConnectExperience from "../components/connect/ConnectExperience";
import "./connect.css";

export const metadata: Metadata = {
  title: "Connect | Persimmon Quest",
  description: "Explore the Persimmon Quest neurofashion collection with qBand Air, qPad One, and an interactive simulation. No hardware or sign-in needed."
};

export default function ConnectPage() {
  return <ConnectExperience />;
}
