import type { Metadata } from "next";
import QuestViewStory from "./QuestViewStory";

export const metadata: Metadata = {
  title: "Quest View | Persimmon Quest",
  description: "Four keys, one gentle companion. Quest View brings movement, calm and sleep together on qPad, and learns your rhythm."
};

export default function QuestViewPage() {
  return (
    <main className="qv">
      <QuestViewStory />
    </main>
  );
}
