export function Footer({ authorName }) {
  return (
    <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm mt-auto">
      <p>Hecho con React por <span className="text-slate-300 font-medium">{authorName}</span></p>
    </footer>
  );
}