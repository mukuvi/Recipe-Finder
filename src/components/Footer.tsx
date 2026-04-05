export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-main">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="text-center text-xs text-text-muted">
          © {new Date().getFullYear()} RecipeFinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
