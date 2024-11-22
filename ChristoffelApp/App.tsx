import React, { useEffect, useState, createContext, useContext} from 'react';
import { View, Text, Image, Button, TouchableOpacity, TextInput, ToastAndroid, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { NavigationProp } from '@react-navigation/native';
import { FlatList } from 'react-native';  
import { useDishes } from './DishesContext'
import { DishesProvider } from './DishesContext';
const sampleDishes = [
  { name: 'Starlight Risotto', category: 'main', price: 100, description: 'A creamy risotto, infused with herbs and Parmesan cheese.' },
  { name: 'Crimson Ember Steak', category: 'main', price: 150, description: 'Juicy steak with a smoky flavor and red wine reduction.' },
  { name: 'Golden Bread Sticks', category: 'starter', price: 180, description: 'Warm, crispy breadsticks with garlic butter.' },
  { name: 'Twilight Tiramisu', category: 'dessert', price: 100, description: 'Classic dessert with coffee-soaked ladyfingers and mascarpone.' },
  { name: 'Emerald Soup', category: 'starter', price: 400, description: 'A creamy soup made from fresh green vegetables.' },
];
const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen after 3 seconds
    }, 3000);
  }, []);

  return (
    <DishesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Choice"
            component={Choice}
            options={{ title: 'Choose Role' }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'Christoffel' }}
          />
          <Stack.Screen
            name="Filter"
            component={FilterScreen}
            options={{ title: 'Filter Dishes' }}
          />
          <Stack.Screen
            name="CustomDish"
            component={CustomDishScreen}
            options={{ title: 'Add Custom Dish' }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ title: 'Payment' }}
          />
          <Stack.Screen
            name="AddToFilterScreen"
            component={AddToFilterScreen}
            options={{ title: 'Chef Screen' }}
          />
          <Stack.Screen
            name="StartersScreen"
            component={StartersScreen}
            options={{ title: 'Starters' }}
          />
          <Stack.Screen
            name="MainCourseScreen"
            component={MainCourseScreen}
            options={{ title: 'Main Courses' }}
          />
          <Stack.Screen
            name="DessertScreen"
            component={DessertScreen}
            options={{ title: 'Desserts' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DishesProvider>
  );
};
type Props = {
  navigation: NavigationProp<any>;
};
const Splash: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Choice'); // Use navigate instead of replace
    }, 3000);
  }, [navigation]);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B2B2B2' }}>
      <Image source={require('./assets/christofelopen.png')} />
    </View>
  );
};

const AddToFilterScreen: React.FC = () => {
  const { dishes, updateCount } = useDishes();
  console.log(dishes); // Check the data being fetched
  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#000' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#FFF', // White for header text
          textAlign: 'center',
          fontFamily: 'Georgia',
        }}
      >
        Manage Dishes
      </Text>

      {['dessert', 'main', 'starter'].map((category) => (
        <View key={category} style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              color: '#FFF', // White for category titles
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}s
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {dishes
              .filter((dish) => dish.category === category)
              .map((dish) => (
                <View
                  key={dish.id}
                  style={{
                    borderWidth: 1,
                    borderColor: '#FFF', // White border for consistency
                    borderRadius: 10,
                    width: '45%',
                    margin: 5,
                    backgroundColor: '#222', // Dark background for the dish container
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: dish.image }}
                    style={{ width: '100%', height: 150 }}
                  />
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      backgroundColor: '#333', // Dark background for dish info
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 5,
                        color: '#FFF', // White for dish names
                      }}
                    >
                      {dish.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => updateCount(dish.id, -1)}
                        style={{
                          backgroundColor: '#555', // Grey for decrease button
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 10, color: '#FFF' }}>
                        {dish.count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateCount(dish.id, 1)}
                        style={{
                          backgroundColor: '#555', // Grey for increase button
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};


const Choice: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#FFF', // White for text
          fontFamily: 'Georgia', // Elegant font
        }}
      >
        Choose Your Role
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#333', // Dark grey for button background
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddToFilterScreen')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          Chef
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#333', // Dark grey for button background
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Main')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          User
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateCategoryAverages = (category: string) => {
  const dishes = sampleDishes.filter(dish => dish.category === category);
  const totalDishes = dishes.length;
  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const averagePrice = totalDishes > 0 ? totalPrice / totalDishes : 0;
  return { totalDishes, averagePrice: averagePrice.toFixed(2) };
};
const MainScreen: React.FC<Props> = ({ navigation }) => {
  const { totalDishes: totalMainDishes, averagePrice: avgMainPrice } = calculateCategoryAverages('main');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#000000', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Christoffel</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={{ position: 'absolute', right: 10, top: 10 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Filter</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Image
          source={require('./assets/Pink_Pasta_Sauce2.jpg')}
          style={{ width: 348, height: 123, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'white', marginTop: 10 }}>Pasta</Text>
        <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Price: R300</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Order" color="#FFFFFF" onPress={() => navigation.navigate('Payment')} />
        </View>

        <Image
          source={require('./assets/hamburger.png')}
          style={{ width: 348, height: 123, marginTop: 30, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'white', marginTop: 10 }}>Hamburger</Text>
        <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Price: R80</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Order" color="#FFFFFF" onPress={() => navigation.navigate('Payment')} />
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Button title="Custom Dish" color="#FFFFFF" onPress={() => navigation.navigate('CustomDish')} />
      </View>

      <Text style={{ color: 'white', marginTop: 20, textAlign: 'center' }}>Main Dishes: {totalMainDishes}</Text>
      <Text style={{ color: 'white', textAlign: 'center' }}>Average Price: R{avgMainPrice}</Text>
    </ScrollView>
  );
};

const FilterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000', padding: 20 }}>
      <Text
        style={{
          fontSize: 42,
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Christoffel
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Choose your meal and enjoy!
      </Text>

      {/* Starters */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('StartersScreen')}
      >
        <Image
          source={require('./assets/starters.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#000',
          }}
        />
        <Text style={{ color: '#000', fontSize: 24, fontWeight: '500', flex: 1 }}>
          Starters - Fresh & Light
        </Text>
      </TouchableOpacity>

      {/* Main Course */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('MainCourseScreen')}
      >
        <Image
          source={require('./assets/main.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#000',
          }}
        />
        <Text style={{ color: '#000', fontSize: 24, fontWeight: '500', flex: 1 }}>
          Main - Delicious & Hearty
        </Text>
      </TouchableOpacity>

      {/* Dessert */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('DessertScreen')}
      >
        <Image
          source={require('./assets/dessert.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#000',
          }}
        />
        <Text style={{ color: '#000', fontSize: 24, fontWeight: '500', flex: 1 }}>
          Dessert - Sweet Treats
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDishScreen = () => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [dishSelectOpen, setDishSelectOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cookingTime, setCookingTime] = useState('');
  const [chefNotes, setChefNotes] = useState('');

  const handleDishSelect = (value: string | null) => {
    const selected = sampleDishes.find((dish) => dish.name === value);
    setSelectedDish(value ?? '');
    setDescription(selected ? selected.description : '');
    setPrice(selected ? `Price: R${selected.price}` : '');
  };

  const handlePhotoUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('Upload cancelled', ToastAndroid.SHORT);
      } else if (response.errorMessage) {
        ToastAndroid.show('Error uploading', ToastAndroid.SHORT);
      } else if (response.assets && response.assets.length > 0) {
        setUploadedImage(response.assets[0].uri ?? '');
        ToastAndroid.show('Photo uploaded', ToastAndroid.SHORT);
      }
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
      <Text style={{ fontSize: 32, color: '#fff', textAlign: 'center' }}>Create and Customize Your Dish</Text>

      {/* Category Dropdown */}
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={[
          { label: '🥗 Starter', value: 'starter' },
          { label: '🍝 Main', value: 'main' },
          { label: '🍰 Dessert', value: 'dessert' },
        ]}
        placeholder="Select Category"
        containerStyle={{ height: 40, marginTop: 20 }}
        style={{ backgroundColor: '#333' }}
        dropDownStyle={{ backgroundColor: '#555' }}
        value={category}
        setValue={setCategory}
      />

      {/* Dish Dropdown */}
      <DropDownPicker
        open={dishSelectOpen}
        setOpen={setDishSelectOpen}
        items={sampleDishes.filter((dish) => dish.category === category).map(dish => ({ label: dish.name, value: dish.name }))}
        placeholder="Select Available Dish"
        containerStyle={{ height: 40, marginTop: 20 }}
        style={{ backgroundColor: '#333' }}
        dropDownStyle={{ backgroundColor: '#555' }}
        value={selectedDish}
        setValue={handleDishSelect}
      />

      {selectedDish && (
        <View style={{ backgroundColor: '#222', padding: 15, marginTop: 20, borderRadius: 10 }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{selectedDish}</Text>
          <Text style={{ color: '#fff', marginTop: 5 }}>{price}</Text>
          <Text style={{ color: '#fff', marginTop: 10 }}>{description}</Text>
        </View>
      )}

      {uploadedImage && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={{ uri: uploadedImage }} style={{ width: 300, height: 200, borderRadius: 15 }} />
        </View>
      )}

      <TouchableOpacity onPress={handlePhotoUpload} style={{ marginTop: 20, backgroundColor: '#555', padding: 10, borderRadius: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Upload Dish Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={{ marginTop: 20, backgroundColor: '#fff', padding: 10, height: 50, textAlignVertical: 'top', borderRadius: 10 }}
        placeholder="Cooking Time (e.g., 30 mins)"
        value={cookingTime}
        onChangeText={setCookingTime}
      />
      <TextInput
        style={{ marginTop: 20, backgroundColor: '#fff', padding: 10, height: 100, textAlignVertical: 'top', borderRadius: 10 }}
        placeholder="Chef's Notes..."
        value={chefNotes}
        onChangeText={setChefNotes}
        multiline
      />
      <TextInput
        style={{ marginTop: 20, backgroundColor: '#fff', padding: 10, height: 100, textAlignVertical: 'top', borderRadius: 10 }}
        placeholder="Add or edit dish description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </ScrollView>
  );
};

const MainCourseScreen = () => {
  const { dishes } = useDishes(); // Access shared dishes data

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#000' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#fff' }}>
        Main Courses
      </Text>
      <FlatList
        data={dishes.filter(dish => dish.category === 'main' && dish.count > 0)} // Filter dishes by category and ensure count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              backgroundColor: '#333',
              borderRadius: 10,
              padding: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => console.log(`${item.name} clicked`)} // Optional: handle press event
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 60,
                height: 60,
                marginRight: 15,
                borderRadius: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 5 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, color: '#ccc' }}>
                ${item.price.toFixed(2)} {/* Format price */}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const DessertScreen: React.FC = () => {
  const { dishes, updateCount } = useDishes(); // Get dishes and the updateCount function

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#FFFFFF' }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: '#000000',
        }}
      >
        Desserts
      </Text>
      <FlatList
        data={dishes.filter(dish => dish.category === 'main' && dish.count > 0)} // Filter dishes by category and ensure count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              backgroundColor: '#D3D3D3',
              borderRadius: 10,
              padding: 15,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => console.log(`${item.name} clicked`)} // Optional: handle press event
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 60,
                height: 60,
                marginRight: 15,
                borderRadius: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: 5,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                }}
              >
                ${item.price.toFixed(2)} {/* Format price */}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const StartersScreen: React.FC = () => {
  const { dishes, updateCount } = useDishes();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#FFFFFF' }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: '#000000',
        }}
      >
        Starters
      </Text>
      <FlatList
        data={dishes.filter(dish => dish.category === 'main' && dish.count > 0)} // Filter dishes by category and ensure count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              backgroundColor: '#D3D3D3',
              borderRadius: 10,
              padding: 15,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => console.log(`${item.name} clicked`)} // Optional: handle press event
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 60,
                height: 60,
                marginRight: 15,
                borderRadius: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: 5,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                }}
              >
                ${item.price.toFixed(2)} {/* Format price */}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 20 }}>
      <Text style={{ fontSize: 32, color: '#000000', textAlign: 'center' }}>Payment</Text>

      <TextInput
        placeholder="Card Number"
        placeholderTextColor="#000000"
        onChangeText={setCardNumber}
        keyboardType="numeric"
        style={{
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          marginTop: 20,
          color: '#000000',
        }}
      />

      <TextInput
        placeholder="Expiry Date (MM/YY)"
        placeholderTextColor="#000000"
        onChangeText={setExpiryDate}
        style={{
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          marginTop: 20,
          color: '#000000',
        }}
      />

      <TextInput
        placeholder="CVV"
        placeholderTextColor="#000000"
        onChangeText={setCvv}
        keyboardType="numeric"
        style={{
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          marginTop: 20,
          color: '#000000',
        }}
      />
      <TouchableOpacity
        onPress={() => ToastAndroid.show('Payment Processed!', ToastAndroid.SHORT)}
        style={{ marginTop: 20, backgroundColor: '#D3D3D3', padding: 10 }}
      >
        <Text style={{ color: '#000000', textAlign: 'center' }}>Submit Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
