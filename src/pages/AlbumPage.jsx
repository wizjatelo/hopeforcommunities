import React, { useState, useEffect } from 'react';
import { Search, X, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AlbumGallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch('/album.json')
      .then((res) => res.json())
      .then((data) => {
        const albumData = data.map((src, index) => ({
          id: index,
          src,
          title: `Album ${index + 1}`,
          description: `Photo collection ${index + 1}`,
          tags: ['travel', 'memories', 'nature'][index % 3]
        }));
        setImages(albumData);
        setFilteredImages(albumData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch images:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = images.filter(
      (img) =>
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [searchTerm, images]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600 mb-4"></div>
          <p className="text-slate-600 text-lg">Loading albums...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header Component */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search albums or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-white rounded-lg p-1 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-slate-600 mt-4">
            Showing {filteredImages.length} of {images.length} albums
          </p>
        </div>

        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No albums found matching your search.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((img, index) => (
                <div
                  key={img.id}
                  onClick={() => openLightbox(index)}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{img.title}</h3>
                      <p className="text-sm text-slate-200">{img.description}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {img.tags}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredImages.map((img, index) => (
                <div
                  key={img.id}
                  onClick={() => openLightbox(index)}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex"
                >
                  <div className="w-48 h-32 flex-shrink-0 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{img.title}</h3>
                    <p className="text-slate-600 text-sm mb-2">{img.description}</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs w-fit">
                      {img.tags}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:bg-white/10 p-3 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[90vh] w-full"
            >
              <img
                src={filteredImages[currentImageIndex].src}
                alt={filteredImages[currentImageIndex].title}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-xl font-semibold mb-1">
                  {filteredImages[currentImageIndex].title}
                </h3>
                <p className="text-slate-300">
                  {filteredImages[currentImageIndex].description}
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:bg-white/10 p-3 rounded-full transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </main>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AlbumGallery;