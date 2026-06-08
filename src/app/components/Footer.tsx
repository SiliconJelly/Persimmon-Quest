const DATA_ROOM_URL =
  "https://app.notion.com/p/siliconjelly/PQ-Data-Room-30e7b6e77f0a81cb8a63d0145a74dd28?source=copy_link";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8">
      <div className="site-footer">
        <div className="footer-bottom">
          <nav className="footer-links footer-links--formal" aria-label="Project links">
            <span className="status-led status-led--green" aria-hidden="true" />
            <a href={DATA_ROOM_URL} target="_blank" rel="noopener noreferrer">
              Project Data Room
            </a>
          </nav>
          <span>© 2026 Persimmon Quest. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
