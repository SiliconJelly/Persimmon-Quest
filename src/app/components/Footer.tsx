import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DATA_ROOM_URL = "https://app.notion.com/p/siliconjelly/PQ-Data-Room-30e7b6e77f0a81cb8a63d0145a74dd28?source=copy_link";

export default function Footer() {
  return (
    <footer className="pq-shell pq-footer">
      <div className="pq-footer-top">
        <Link href="/" className="pq-brand"><img src="/media/logo.png" width="32" height="32" alt="" /><span>Persimmon Quest</span></Link>
        <p>A more human future for brain health</p>
        <a href={DATA_ROOM_URL} target="_blank" rel="noopener noreferrer">Project data room <ArrowUpRight size={15} /></a>
      </div>
      <div className="pq-footer-bottom"><span>© 2026 Persimmon Quest</span><span>Human at heart · Science in mind</span></div>
    </footer>
  );
}
