import { useState, useMemo } from 'react';
import { DESTINATIONS } from './data/destinations';
import { useWatchlist } from './hooks/useWatchlist';
import { useToggle } from './hooks/useToggle';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { ItemList } from './components/ItemList';
import { ListPanel } from './components/ListPanel';
import { Footer } from './components/Footer';

export default function App() {
  const { list: watchlist, count, toggleItem, clearList } = useWatchlist();
  const [isDrawerOpen, , openDrawer, closeDrawer] = useToggle(false);

  // Estados locales para la búsqueda y el filtro de categoría
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Filtrado optimizado del catálogo
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Navbar count={count} onOpenDrawer={openDrawer} />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-24 px-4 flex flex-col gap-6">
        <SearchBar
          search={searchQuery}
          onSearchChange={setSearchQuery}
          category={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ItemList
          items={filteredDestinations}
          watchlist={watchlist}
          onToggle={toggleItem}
          search={searchQuery}
          onResetSearch={() => {
            setSearchQuery('');
            setSelectedCategory('Todos');
          }}
        />
      </main>

      <ListPanel
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        watchlist={watchlist}
        allDestinations={DESTINATIONS}
        onToggle={toggleItem}
        onClearList={clearList}
      />
    <Footer authorName="Juan Pablo Millicay" />
    </div>
  );
}