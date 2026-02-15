import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  vendor: string;
  description: string;
  stock_quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  tracking_id: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  created_at: string;
  items?: CartItem[];
}

export interface Vendor {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  crops: string[];
  contact: string;
  image: string;
  verified: boolean;
  areaInHectares: number;
  soilPH: number;
}

interface AppContextType {
  cart: CartItem[];
  orders: Order[];
  vendors: Vendor[];
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (address: string, customerData: { name: string; email: string; phone: string; deliveryTime?: string }) => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loadProducts: () => Promise<void>;
  loadOrders: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 1, name: "Rajesh Kumar Farm", city: "Ludhiana", state: "Punjab", location: "Ludhiana, Punjab", rating: 4.8, crops: ["Wheat", "Rice", "Maize"], contact: "+91 98765 43210", image: "🌾", verified: true, areaInHectares: 12.5, soilPH: 7.2 },
    { id: 2, name: "Priya Organic Produce", city: "Nashik", state: "Maharashtra", location: "Nashik, Maharashtra", rating: 4.6, crops: ["Onions", "Tomatoes", "Grapes"], contact: "+91 98234 56789", image: "🍅", verified: true, areaInHectares: 8.3, soilPH: 6.8 },
    { id: 3, name: "Suresh Coffee Estate", city: "Mysore", state: "Karnataka", location: "Mysore, Karnataka", rating: 4.9, crops: ["Coffee", "Cardamom", "Pepper"], contact: "+91 97654 32109", image: "☕", verified: true, areaInHectares: 15.0, soilPH: 5.9 },
    { id: 4, name: "Vikram Apple Orchard", city: "Shimla", state: "Himachal Pradesh", location: "Shimla, Himachal Pradesh", rating: 4.7, crops: ["Apples", "Pears", "Cherries"], contact: "+91 96543 21098", image: "🍎", verified: true, areaInHectares: 10.0, soilPH: 6.5 },
    { id: 5, name: "Harman Spice Farm", city: "Jodhpur", state: "Rajasthan", location: "Jodhpur, Rajasthan", rating: 4.5, crops: ["Cumin", "Coriander", "Chili"], contact: "+91 95432 10987", image: "🌶️", verified: true, areaInHectares: 20.0, soilPH: 7.8 },
    { id: 6, name: "Deepak Rice Mills", city: "Kolkata", state: "West Bengal", location: "Kolkata, West Bengal", rating: 4.8, crops: ["Rice", "Potatoes", "Mustard"], contact: "+91 94321 09876", image: "🌾", verified: true, areaInHectares: 18.5, soilPH: 6.2 },
    { id: 7, name: "Anitha Coconut Farm", city: "Coimbatore", state: "Tamil Nadu", location: "Coimbatore, Tamil Nadu", rating: 4.7, crops: ["Coconut", "Banana", "Turmeric"], contact: "+91 93210 98765", image: "🥥", verified: true, areaInHectares: 14.2, soilPH: 6.1 },
    { id: 8, name: "Arun Pulses Co.", city: "Indore", state: "Madhya Pradesh", location: "Indore, Madhya Pradesh", rating: 4.6, crops: ["Chickpeas", "Lentils", "Soybeans"], contact: "+91 92109 87654", image: "🫘", verified: true, areaInHectares: 22.0, soilPH: 7.4 },
    { id: 9, name: "Manish Dairy Farm", city: "Karnal", state: "Haryana", location: "Karnal, Haryana", rating: 4.9, crops: ["Wheat", "Sugarcane", "Rice"], contact: "+91 91098 76543", image: "🌾", verified: true, areaInHectares: 16.0, soilPH: 7.5 },
    { id: 10, name: "Nirav Cotton Farm", city: "Ahmedabad", state: "Gujarat", location: "Ahmedabad, Gujarat", rating: 4.5, crops: ["Cotton", "Groundnut", "Sesame"], contact: "+91 90987 65432", image: "🌱", verified: true, areaInHectares: 25.0, soilPH: 8.1 },
    { id: 11, name: "Sumit Grain Farms", city: "Meerut", state: "Uttar Pradesh", location: "Meerut, UP", rating: 4.7, crops: ["Wheat", "Rice", "Sugarcane"], contact: "+91 89876 54321", image: "🌾", verified: true, areaInHectares: 13.5, soilPH: 7.0 },
    { id: 12, name: "Bimal Tea Estate", city: "Dibrugarh", state: "Assam", location: "Dibrugarh, Assam", rating: 4.8, crops: ["Tea", "Rice", "Ginger"], contact: "+91 88765 43210", image: "🍵", verified: true, areaInHectares: 30.0, soilPH: 5.5 },
    { id: 13, name: "Kunchacko Spice Garden", city: "Kochi", state: "Kerala", location: "Kochi, Kerala", rating: 4.7, crops: ["Pepper", "Cardamom", "Cinnamon"], contact: "+91 87654 32109", image: "🌿", verified: true, areaInHectares: 11.0, soilPH: 5.8 },
    { id: 14, name: "Gopal Chili Farm", city: "Guntur", state: "Andhra Pradesh", location: "Guntur, Andhra Pradesh", rating: 4.6, crops: ["Red Chilies", "Cotton", "Rice"], contact: "+91 86543 21098", image: "🌶️", verified: true, areaInHectares: 19.0, soilPH: 7.3 },
    { id: 15, name: "Srinu Rice Farm", city: "Warangal", state: "Telangana", location: "Warangal, Telangana", rating: 4.8, crops: ["Rice", "Maize", "Turmeric"], contact: "+91 85432 10987", image: "🌾", verified: true, areaInHectares: 17.5, soilPH: 6.9 },
    { id: 16, name: "Ravi Vegetable Farm", city: "Bhubaneswar", state: "Odisha", location: "Bhubaneswar, Odisha", rating: 4.5, crops: ["Tomatoes", "Cabbage", "Cauliflower"], contact: "+91 84321 09876", image: "🍅", verified: true, areaInHectares: 9.0, soilPH: 6.3 },
    { id: 17, name: "Yogendra Organic Farm", city: "Dehradun", state: "Uttarakhand", location: "Dehradun, Uttarakhand", rating: 4.9, crops: ["Basmati Rice", "Wheat", "Ginger"], contact: "+91 83210 98765", image: "🌾", verified: true, areaInHectares: 11.5, soilPH: 6.7 },
    { id: 18, name: "Hari Makhana Farm", city: "Darbhanga", state: "Bihar", location: "Darbhanga, Bihar", rating: 4.7, crops: ["Makhana", "Rice", "Wheat"], contact: "+91 82109 87654", image: "🌰", verified: true, areaInHectares: 8.0, soilPH: 6.4 },
    { id: 19, name: "Kumar Vegetables", city: "Ranchi", state: "Jharkhand", location: "Ranchi, Jharkhand", rating: 4.6, crops: ["Rice", "Maize", "Vegetables"], contact: "+91 81098 76543", image: "🌾", verified: true, areaInHectares: 12.0, soilPH: 6.6 },
    { id: 20, name: "Sharma Farm Produce", city: "Raipur", state: "Chhattisgarh", location: "Raipur, Chhattisgarh", rating: 4.5, crops: ["Rice", "Groundnuts", "Soybean"], contact: "+91 80987 65432", image: "🌱", verified: true, areaInHectares: 21.0, soilPH: 7.1 },
    { id: 21, name: "Maya Ginger Farm", city: "Shillong", state: "Meghalaya", location: "Shillong, Meghalaya", rating: 4.8, crops: ["Ginger", "Turmeric", "Pineapple"], contact: "+91 79876 54321", image: "🫚", verified: true, areaInHectares: 7.0, soilPH: 5.6 },
    { id: 22, name: "Tenzin Cardamom Estate", city: "Gangtok", state: "Sikkim", location: "Gangtok, Sikkim", rating: 4.9, crops: ["Cardamom", "Turmeric", "Ginger"], contact: "+91 78765 43210", image: "🌿", verified: true, areaInHectares: 6.5, soilPH: 5.7 },
    { id: 23, name: "Arjun Cashew Farm", city: "Panaji", state: "Goa", location: "Panaji, Goa", rating: 4.7, crops: ["Cashew", "Coconut", "Arecanut"], contact: "+91 77654 32109", image: "🥜", verified: true, areaInHectares: 10.5, soilPH: 6.0 },
    { id: 24, name: "Sanjay Pineapple Farm", city: "Imphal", state: "Manipur", location: "Imphal, Manipur", rating: 4.6, crops: ["Pineapple", "Ginger", "Rice"], contact: "+91 76543 21098", image: "🍍", verified: true, areaInHectares: 5.5, soilPH: 5.9 },
    { id: 25, name: "Mithun Rubber Estate", city: "Agartala", state: "Tripura", location: "Agartala, Tripura", rating: 4.5, crops: ["Rubber", "Rice", "Pineapple"], contact: "+91 75432 10987", image: "🌱", verified: true, areaInHectares: 18.0, soilPH: 5.8 },
    { id: 26, name: "Kerenthung Hill Farm", city: "Kohima", state: "Nagaland", location: "Kohima, Nagaland", rating: 4.7, crops: ["Rice", "Maize", "Chili"], contact: "+91 74321 09876", image: "🌾", verified: true, areaInHectares: 9.5, soilPH: 6.2 },
    { id: 27, name: "Taba Kiwi Farm", city: "Itanagar", state: "Arunachal Pradesh", location: "Itanagar, Arunachal Pradesh", rating: 4.8, crops: ["Kiwi", "Apples", "Ginger"], contact: "+91 73210 98765", image: "🥝", verified: true, areaInHectares: 7.5, soilPH: 6.1 },
    { id: 28, name: "Lalthazuala Bamboo Farm", city: "Aizawl", state: "Mizoram", location: "Aizawl, Mizoram", rating: 4.6, crops: ["Bamboo", "Ginger", "Rice"], contact: "+91 72109 87654", image: "🎋", verified: true, areaInHectares: 13.5, soilPH: 6.0 },
    { id: 29, name: "Abdul Apple Orchard", city: "Jammu", state: "Jammu & Kashmir", location: "Jammu, J&K", rating: 4.9, crops: ["Apples", "Walnuts", "Almonds"], contact: "+91 71098 76543", image: "🍎", verified: true, areaInHectares: 14.0, soilPH: 6.8 },
    { id: 30, name: "Dorje Apricot Farm", city: "Leh", state: "Ladakh", location: "Leh, Ladakh", rating: 4.7, crops: ["Apricots", "Apples", "Barley"], contact: "+91 70987 65432", image: "🍑", verified: true, areaInHectares: 6.0, soilPH: 7.0 }
  ]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load real vendor data from AI
  const loadVendors = async () => {
    try {
      console.log('Fetching real vendor data...');
      const { data, error } = await supabase.functions.invoke('fetch-vendor-data');

      if (error) {
        console.error('Error loading vendors:', error);
        // All errors: gracefully fall back to sample data
        toast({
          title: "Using Sample Data",
          description: "AI vendor data unavailable. Showing sample vendors.",
        });
        return;
      }

      if (data?.vendors) {
        setVendors(data.vendors);
        console.log('Loaded real vendor data:', data.vendors.length, 'vendors');
      }
    } catch (error: any) {
      console.error('Error loading vendors:', error);
      toast({
        title: "Using Sample Data",
        description: "Unable to load real-time vendor data. Showing sample vendors.",
      });
    }
  };

  // Load products from database
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error loading products:', error);
    }
  };

  // Load user's orders from database
  const loadOrders = async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Load order items for each order
      const ordersWithItems = await Promise.all(
        (data || []).map(async (order) => {
          const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

          return {
            ...order,
            items: items?.map(item => ({
              id: item.product_id || '',
              name: item.product_name,
              price: Number(item.unit_price),
              unit: 'kg',
              image: item.product_image || '📦',
              category: '',
              vendor: '',
              description: '',
              stock_quantity: 0,
              quantity: item.quantity
            }))
          };
        })
      );

      setOrders(ordersWithItems);
    } catch (error: any) {
      console.error('Error loading orders:', error);
    }
  };

  // Load vendors and products on mount
  useEffect(() => {
    loadVendors();
    loadProducts();
  }, []);

  // Load orders when user changes
  useEffect(() => {
    loadOrders();
  }, [user]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async (address: string, customerData: { name: string; email: string; phone: string; deliveryTime?: string }) => {
    if (cart.length === 0 || !user) {
      toast({
        title: "Error",
        description: "Please sign in to place an order",
        variant: "destructive"
      });
      return;
    }

    try {
      const orderNumber = `ORD${Date.now()}`;
      const trackingId = `TRK${Date.now()}`;
      const total = getTotalPrice();

      // Insert order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          order_number: orderNumber,
          tracking_id: trackingId,
          total_amount: total,
          status: 'pending',
          delivery_address: address,
          customer_name: customerData.name,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          preferred_delivery_time: customerData.deliveryTime || null
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send email confirmation
      try {
        await supabase.functions.invoke('send-order-confirmation', {
          body: {
            customerName: customerData.name,
            customerEmail: customerData.email,
            customerPhone: customerData.phone,
            orderId: orderNumber,
            items: cart,
            total: total,
            address: address,
            deliveryTime: customerData.deliveryTime || '',
            trackingId: trackingId,
          }
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

      clearCart();
      await loadOrders();

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Order ${orderNumber} has been placed. Check your email for confirmation.`
      });
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to place order",
        variant: "destructive"
      });
      throw error;
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value: AppContextType = {
    cart,
    orders,
    vendors,
    products,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    placeOrder,
    getTotalPrice,
    getTotalItems,
    loadProducts,
    loadOrders
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
