export function Footer({ authorName }) {
  return (
    <footer className="border-t border-slate-300 py-6 text-center text-slate-500 text-sm mt-auto">
      <p>Hecho con React por <span className="text-primary font-medium">{authorName}</span></p>
    </footer>
  );
}