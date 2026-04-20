import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxvxgkzALj5Mip7GHAJBK9SYnNm9qO0KI",
  authDomain: "alqaysar-menu.firebaseapp.com",
  databaseURL: "https://alqaysar-menu-default-rtdb.firebaseio.com",
  projectId: "alqaysar-menu",
  storageBucket: "alqaysar-menu.firebasestorage.app",
  messagingSenderId: "181160036262",
  appId: "1:181160036262:web:d26f2d2504b880807bb167",
  measurementId: "G-3ZTYG4EHMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Staff PIN
const STAFF_PIN = "1234"; // Change this to your secure PIN

// Menu Data
const MENU = [
  { section: "Appetizers", items: [
    { id: "veg_salad", en: "Vegetable Salad", ar: "سلطة خضار", price: "6.00" },
    { id: "milk_cucumber", en: "Milk Cucumber", ar: "خيار لبن", price: "4.00" },
    { id: "hot_pepper", en: "Hot Pepper", ar: "شطة حار", price: "3.00" },
    { id: "green_chili", en: "Hot Green Chili Pepper", ar: "شطة أخضر حار", price: "3.00" },
    { id: "tahini", en: "Tahini", ar: "طحينة", price: "3.00" },
    { id: "rana_pepper", en: "Rana Hot Pepper", ar: "شطة رنا", price: "2.00" },
    { id: "chicken_wings", en: "Chicken Wings", ar: "أجنحة دجاج", price: "20.00" },
    { id: "chicken_spring", en: "Chicken Spring Roll", ar: "سبرينغ رول دجاج", price: "12.00" },
    { id: "veg_spring", en: "Vegetable Spring Roll", ar: "سبرينغ رول خضاروات", price: "8.00" },
    { id: "prawn_spring", en: "Prawn Spring Roll", ar: "سبرينغ رول روبيان", price: "12.00" },
    { id: "fish_finger", en: "Fish Finger with Tartar Sauce", ar: "أصابع سمك مع صلصة", price: "12.00" },
    { id: "butterfly_prawn", en: "Butterfly Tail Prawn", ar: "روبيان زيل الفراشة", price: "20.00" },
    { id: "french_fries", en: "French Fries", ar: "بطاطس مقلية", price: "5.00" },
  ]},
  { section: "Grills", items: [
    { id: "chicken_kebab_p", en: "Chicken Kebab (Person)", ar: "نفر كباب دجاج", price: "24.00" },
    { id: "meat_kebab_p", en: "Meat Kebab (Person)", ar: "نفر كباب لحم", price: "27.00" },
    { id: "chicken_thighs", en: "Chicken Thighs", ar: "نفر أوصال دجاج", price: "27.00" },
    { id: "shish_kebab", en: "Chicken Shish Kebab", ar: "نفر شيش طاووق", price: "27.00" },
    { id: "chicken_kebab_sw", en: "Chicken Kebab Sandwich", ar: "ساندوتش كباب دجاج", price: "10.00" },
    { id: "meat_kebab_sw", en: "Meat Kebab Sandwich", ar: "ساندوتش كباب لحم", price: "10.00" },
  ]},
  { section: "Chinese", items: [
    { id: "fried_rice", en: "Fried Rice", ar: "رز مقلي", price: "18.00" },
    { id: "manchurian", en: "Chicken Manchurian", ar: "دجاج منشوريان", price: "20.00" },
    { id: "chow_mein", en: "Chow Mein / Noodles", ar: "نودلز تشاو مين", price: "18.00" },
  ]},
  { section: "Beverages", items: [
    { id: "sweet_lassi", en: "Sweet & Saltish Lassi", ar: "لاسي حلو ومالح", price: "8.00" },
    { id: "mango_lassi", en: "Mango Lassi", ar: "لاسي مانجو", price: "8.00" },
    { id: "lemonade", en: "Lemonade", ar: "عصير ليمون", price: "6.00" },
    { id: "water", en: "Water", ar: "ماء", price: "1.00" },
  ]},
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Check if already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Load menu from Firebase
  useEffect(() => {
    if (isLoggedIn) {
      loadFromFirebase();
    }
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error('Error checking login status:', e);
    }
  };

  const loadFromFirebase = () => {
    setLoading(true);
    const menuRef = ref(database, 'menu/available');
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val() || {};
      setSelected(data);
      setLoading(false);
    });
  };

  const handleLogin = async () => {
    if (pin === STAFF_PIN) {
      setIsLoggedIn(true);
      setError('');
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } else {
      setError('Incorrect PIN. Try again.');
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setPin('');
    await AsyncStorage.removeItem('isLoggedIn');
  };

  const toggleDish = (dishId) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      if (newSelected[dishId]) {
        delete newSelected[dishId];
      } else {
        newSelected[dishId] = true;
      }
      return newSelected;
    });
  };

  const selectAllInSection = (section) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      section.items.forEach(item => {
        newSelected[item.id] = true;
      });
      return newSelected;
    });
  };

  const deselectAllInSection = (section) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      section.items.forEach(item => {
        delete newSelected[item.id];
      });
      return newSelected;
    });
  };

  const saveMenu = async () => {
    setSaving(true);
    
    // Build full dish data
    const menuData = {};
    MENU.forEach(section => {
      section.items.forEach(item => {
        if (selected[item.id]) {
          menuData[item.id] = {
            en: item.en,
            ar: item.ar,
            price: item.price,
            section: section.section
          };
        }
      });
    });

    try {
      const menuRef = ref(database, 'menu');
      await set(menuRef, {
        available: selected,
        dishes: menuData,
        updatedAt: new Date().toISOString()
      });
      
      Alert.alert('Success', 'Menu updated! Guests can see the changes now.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save menu. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const getSelectedCount = () => {
    return Object.keys(selected).length;
  };

  const filterDishes = (items) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.en.toLowerCase().includes(query) || 
      item.ar.includes(query)
    );
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>AQ</Text>
            </View>
            <Text style={styles.loginTitle}>Al Qaysar</Text>
            <Text style={styles.loginSubtitle}>Staff access — menu manager</Text>
            
            <TextInput
              style={styles.pinInput}
              placeholder="Enter staff PIN"
              value={pin}
              onChangeText={setPin}
              secureTextEntry
              keyboardType="number-pad"
              maxLength={10}
              onSubmitEditing={handleLogin}
            />
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Main App Screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topBarTitle}>Menu Manager</Text>
          <Text style={styles.topBarDate}>
            {new Date().toLocaleDateString('en-SA', { weekday:'long', day:'numeric', month:'long' })}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Save Bar */}
      <View style={styles.saveBar}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <TouchableOpacity 
            style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
            onPress={saveMenu}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Update guest menu'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.countPill}>
          <Text style={styles.countPillText}>
            {getSelectedCount()} dish{getSelectedCount() !== 1 ? 'es' : ''} on
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Menu List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a1a1a" />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {MENU.map((section, sectionIndex) => {
            const filteredItems = filterDishes(section.items);
            if (filteredItems.length === 0) return null;

            return (
              <View key={sectionIndex}>
                <Text style={styles.sectionHeader}>{section.section}</Text>
                
                <View style={styles.selectAllRow}>
                  <TouchableOpacity 
                    style={[styles.miniButton, { marginRight: 8 }]}
                    onPress={() => selectAllInSection(section)}
                  >
                    <Text style={styles.miniButtonText}>All on</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.miniButton}
                    onPress={() => deselectAllInSection(section)}
                  >
                    <Text style={styles.miniButtonText}>All off</Text>
                  </TouchableOpacity>
                </View>

                {filteredItems.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.dishRow,
                      selected[item.id] && styles.dishRowSelected
                    ]}
                    onPress={() => toggleDish(item.id)}
                  >
                    <View style={[
                      styles.checkbox,
                      selected[item.id] && styles.checkboxSelected,
                      { marginRight: 12 }
                    ]}>
                      {selected[item.id] && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    
                    <View style={styles.dishInfo}>
                      <Text style={styles.dishName}>{item.en}</Text>
                      <Text style={styles.dishNameAr}>{item.ar}</Text>
                    </View>
                    
                    {item.price && (
                      <Text style={styles.dishPrice}>{item.price} ر.س</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f4f0',
  },
  
  // Login Styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e3dc',
    padding: 36,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#c8a96e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f0f0f',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },
  pinInput: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 15,
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  errorText: {
    color: '#c0392b',
    fontSize: 13,
    marginTop: 8,
  },

  // Top Bar
  topBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e3dc',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  topBarDate: {
    fontSize: 12,
    color: '#888',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutButtonText: {
    fontSize: 12,
    color: '#888',
  },

  // Save Bar
  saveBar: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e3dc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  countPill: {
    backgroundColor: '#f0ede8',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  countPillText: {
    fontSize: 12,
    color: '#555',
  },

  // Search Bar
  searchBar: {
    padding: 10,
    backgroundColor: '#f5f4f0',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 14,
  },

  // Menu List
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    padding: 14,
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    backgroundColor: '#f5f4f0',
  },
  selectAllRow: {
    flexDirection: 'row',
    padding: 6,
    paddingHorizontal: 16,
    backgroundColor: '#f5f4f0',
  },
  miniButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  miniButtonText: {
    fontSize: 11,
    color: '#555',
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0ede8',
  },
  dishRowSelected: {
    backgroundColor: '#f0faf5',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  dishNameAr: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  dishPrice: {
    fontSize: 13,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
  },
});
