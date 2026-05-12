import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import { TRANSLATIONS, CATEGORY_ICONS, SECTION_ORDER } from './translations';
import './App.css';

// Image component with fallback
function DishImage({ src, alt, icon }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className="dish-thumb-placeholder">{icon}</div>;
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const [dishes, setDishes] = useState([]);
  const [currentSection, setCurrentSection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = (key, ...args) => {
    const tr = TRANSLATIONS[lang];
    const val = tr[key];
    return typeof val === 'function' ? val(...args) : val;
  };

  useEffect(() => {
    const menuRef = ref(db, 'menu');
    const unsubscribe = onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.dishes) {
        const dishList = Object.values(data.dishes);
        // Debug: log first dish to check imageUrl format
        if (dishList.length > 0) {
          console.log('Sample dish imageUrl:', dishList[0].imageUrl);
        }
        setDishes(dishList);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredDishes = dishes.filter(d => {
    const matchesSection = currentSection === 'All' || d.section === currentSection;
    const matchesSearch = !searchQuery || 
      d.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ar.includes(searchQuery);
    return matchesSection && matchesSearch;
  });

  const groupedDishes = {};
  filteredDishes.forEach(d => {
    if (!groupedDishes[d.section]) groupedDishes[d.section] = [];
    groupedDishes[d.section].push(d);
  });

  const sectionKeys = currentSection === 'All'
    ? SECTION_ORDER.filter(s => s !== 'All' && groupedDishes[s])
    : [currentSection];

  const availableSections = ['All', ...SECTION_ORDER.filter(s => 
    s !== 'All' && dishes.some(d => d.section === s)
  )];

  return (
    <div className="app">
      {/* Nav */}
      <motion.nav 
        className="top-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="nav-logo">
          <span className="nav-logo-icon">👑</span>
          <span className="nav-logo-name">{t('navName')}</span>
          <span className="nav-logo-sub">{t('navSub')}</span>
        </div>
        <div className="nav-contact">
          <a href="tel:+966565041261">📞 +966 565 041 261</a>
          <a href="mailto:alqaysarcatering@gmail.com">✉️ alqaysarcatering@gmail.com</a>
          <a href="#">{t('navHours')}</a>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div className="lang-toggle">
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
            <button 
              className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
              onClick={() => setLang('ar')}
            >ع</button>
          </div>
          <button className="nav-menu-btn">
            <span></span><span></span><span></span>
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.div 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <motion.div 
            className="hero-welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >{t('heroWelcome')}</motion.div>
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >{t('heroTitle')}</motion.h1>
          <div className="hero-divider"><span className="hero-divider-icon">✦</span></div>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >{t('heroSubtitle')}</motion.p>
          <motion.div 
            className="hero-search"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="hero-search-icon">🔍</span>
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
        <motion.div 
          className="hero-deco"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="hero-deco-badge"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring' }}
          >
            <span className="hero-deco-badge-num">24</span>
            <span className="hero-deco-badge-text">{t('decoHours')}</span>
          </motion.div>
          <div className="hero-deco-info">
            <div className="hero-deco-stat">
              <div className="hero-deco-stat-num">17+</div>
              <div className="hero-deco-stat-label">{t('decoCats')}</div>
            </div>
            <div className="hero-deco-stat">
              <div className="hero-deco-stat-num">100+</div>
              <div className="hero-deco-stat-label">{t('decoDishes')}</div>
            </div>
            <div className="hero-deco-stat">
              <div className="hero-deco-stat-num">⭐ 4.8</div>
              <div className="hero-deco-stat-label">{t('decoRating')}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="desktop-layout">
        {/* Category Sidebar */}
        <motion.div 
          className="category-bar"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="category-scroll">
            {availableSections.map((section, i) => (
              <motion.div
                key={section}
                className={`cat-item ${section === currentSection ? 'active' : ''}`}
                onClick={() => setCurrentSection(section)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="cat-icon-wrap">{CATEGORY_ICONS[section] || '🍽️'}</div>
                <span className="cat-label">{t('catShort')[section] || section}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="main-area">
          <div className="menu-body">
            <div className="content">
              {loading ? (
                <div className="loading-state">
                  <motion.div 
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  {t('loading')}
                </div>
              ) : filteredDishes.length === 0 ? (
                <motion.div 
                  className="empty-state"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2>{t('noResults')}</h2>
                  <p>{t('noResultsSub')}</p>
                </motion.div>
              ) : (
                sectionKeys.map((section, secIdx) => (
                  <motion.div 
                    key={section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: secIdx * 0.1 }}
                  >
                    <div className="section-header">
                      <div className="section-header-left">
                        <span className="section-header-icon">↓</span>
                        <span className="section-header-title">{t('catShort')[section] || section}</span>
                      </div>
                    </div>
                    <div className="dishes-grid">
                      {(groupedDishes[section] || []).map((dish, idx) => {
                        const primaryName = lang === 'ar' ? dish.ar : dish.en;
                        const secondaryName = lang === 'ar' ? dish.en : dish.ar;
                        return (
                          <motion.div
                            key={dish.en + idx}
                            className="dish-row"
                            onClick={() => setSelectedDish(dish)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.02, backgroundColor: '#fffaf5' }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div 
                              className="dish-thumb"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <DishImage
                                src={dish.imageUrl}
                                alt={dish.en}
                                icon={CATEGORY_ICONS[dish.section] || '🍽️'}
                              />
                            </motion.div>
                            <div className="dish-details">
                              <div className="dish-row-name">{primaryName}</div>
                              <div className="dish-row-name-ar">{secondaryName}</div>
                              <div className="dish-row-desc">
                                {dish.description || t('dishDesc', dish.en, dish.section)}
                              </div>
                            </div>
                            <div className="dish-price-col">
                              {dish.price ? (
                                <div className="dish-row-price">
                                  {dish.price}<span className="currency">ر.س</span>
                                </div>
                              ) : (
                                <div className="price-ask">{t('askStaff')}</div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div 
            className="modal active"
            onClick={() => setSelectedDish(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-sheet"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="modal-img-wrap">
                <DishImage
                  src={selectedDish.imageUrl}
                  alt={selectedDish.en}
                  icon={CATEGORY_ICONS[selectedDish.section] || '🍽️'}
                />
                <button className="modal-close-btn" onClick={() => setSelectedDish(null)}>✕</button>
              </div>
              <div className="modal-handle"></div>
              <div className="modal-body">
                <div className="modal-section-tag">{t('catShort')[selectedDish.section] || selectedDish.section}</div>
                <h2 className="modal-title">{lang === 'ar' ? selectedDish.ar : selectedDish.en}</h2>
                <div className="modal-title-ar">{lang === 'ar' ? selectedDish.en : selectedDish.ar}</div>
                <div className="modal-price-row">
                  <span className="modal-price-val">
                    {selectedDish.price || t('askStaffModal')}
                  </span>
                  {selectedDish.price && <span className="modal-price-cur">ر.س</span>}
                </div>
                <p className="modal-desc">
                  {selectedDish.description || t('dishDesc', selectedDish.en, selectedDish.section)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Bar */}
      <motion.div 
        className="bottom-bar"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, type: 'spring' }}
      >
        <div className="bottom-bar-left">
          <div className="bottom-bar-icon">🍽️</div>
          <div>
            <div className="bottom-bar-text-main">{t('barName')}</div>
            <div className="bottom-bar-text-sub">{t('barSub')}</div>
          </div>
        </div>
        <a href="tel:+966565041261">
          <motion.button 
            className="bottom-bar-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >{t('barBtn')}</motion.button>
        </a>
      </motion.div>
    </div>
  );
}

export default App;
