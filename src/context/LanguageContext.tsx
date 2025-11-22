import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'pa' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'or' | 'as';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace',
    'nav.orders': 'Orders',
    'nav.orderHistory': 'Order History',
    'nav.vendors': 'Vendors',
    'nav.fertilizer': 'Fertilizer Friend',
    'nav.search': 'Search',
    'nav.about': 'About Us',
    'nav.bio': 'Bio',
    'nav.signIn': 'Sign In',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.badge': "🌱 India's #1 Farming Super-App",
    'hero.title': 'AgriConnect',
    'hero.subtitle': 'Connecting Farmers to the Future',
    'hero.description': 'Bridge the gap between farmers and markets. Get the right price for your crops, access fertilizers directly, and fight inflation with our AI-powered platform.',
    'hero.marketplace': 'Explore Marketplace',
    'hero.aiAssistant': 'Talk to AI Assistant',
    'hero.features': 'Features',
    'hero.farmers': 'Farmers',
    'hero.transactions': 'Transactions',
    'hero.livePrice': 'Live Market Price',
    'hero.priceChange': 'from last week',
    'hero.aiRec': 'AI Recommendation',
    'hero.bestTime': 'Best time to sell wheat',
    'hero.highDemand': 'High demand in Delhi NCR',
    
    // Vendors Page
    'vendors.title': 'Verified Vendors',
    'vendors.subtitle': 'Connect directly with trusted farmers and suppliers across India',
    'vendors.search': 'Search vendors by name or location...',
    'vendors.state': 'Select State',
    'vendors.crop': 'Select Crop',
    'vendors.verified': 'Verified',
    'vendors.pending': 'Pending',
    'vendors.cropsAvailable': 'Crops Available:',
    'vendors.contact': 'Contact',
    'vendors.viewInventory': 'View Inventory',
    'vendors.currentInventory': 'Current Inventory',
    'vendors.available': 'Available',
    'vendors.placeBulkOrder': 'Place Bulk Order',
    'vendors.noVendors': 'No vendors found',
    'vendors.adjustCriteria': 'Try adjusting your search criteria',
    'vendors.verifiedVendors': 'Verified Vendors',
    'vendors.statesCovered': 'States Covered',
    'vendors.cropVarieties': 'Crop Varieties',
    
    // Marketplace Page
    'marketplace.title': 'AgriConnect Marketplace',
    'marketplace.subtitle': 'Fresh produce directly from farmers. Fair prices, quality guaranteed.',
    'marketplace.search': 'Search crops, vendors...',
    'marketplace.category': 'Category',
    'marketplace.priceRange': 'Price Range',
    'marketplace.inStock': 'In Stock',
    'marketplace.stock': 'Stock',
    'marketplace.vendor': 'Vendor',
    'marketplace.addToCart': 'Add to Cart',
    'marketplace.yourCart': 'Your Cart',
    'marketplace.items': 'items',
    'marketplace.total': 'Total',
    'marketplace.checkout': 'Proceed to Checkout',
    
    // Problem Section
    'problem.badge': 'The Current Reality',
    'problem.title': 'Challenges Farmers Face Today',
    'problem.subtitle': 'Despite being the backbone of our economy, farmers struggle with systemic issues that prevent them from earning fair profits and accessing modern farming solutions.',
    'problem.wrongPricing': 'Wrong Pricing',
    'problem.wrongPricingDesc': "Farmers don't get fair market prices for their crops due to information gaps.",
    'problem.wrongPricingStat': '40% below market rate',
    'problem.middlemen': 'Middlemen Dependency',
    'problem.middlemenDesc': 'Heavy reliance on intermediaries reduces farmer profits significantly.',
    'problem.middlemenStat': '60% profit loss',
    'problem.weather': 'Weather Risks',
    'problem.weatherDesc': 'Unpredictable weather patterns cause massive crop losses without proper guidance.',
    'problem.weatherStat': '25% crop loss annually',
    'problem.inflation': 'Inflation Impact',
    'problem.inflationDesc': 'Rising costs and inflation affect both farmers and consumers nationwide.',
    'problem.inflationStat': '15% price increase',
    'problem.dilemma': "The Farmer's Dilemma",
    'problem.marketAccess': 'Limited Market Access',
    'problem.marketAccessDesc': 'Farmers sell to local mandis at low prices due to lack of broader market reach.',
    'problem.infoGap': 'Information Gap',
    'problem.infoGapDesc': 'No real-time pricing, weather updates, or market demand insights.',
    'problem.supplyChain': 'Supply Chain Issues',
    'problem.supplyChainDesc': 'Complex distribution chains increase costs for everyone.',
    'problem.annualLoss': 'Average Annual Loss',
    'problem.perFamily': 'Per farming family due to these challenges',
    'problem.smallFarmers': 'Small farmers',
    'problem.population': 'Population dependent',
  },
  hi: {
    // Navigation - Hindi
    'nav.home': 'होम',
    'nav.marketplace': 'बाज़ार',
    'nav.orders': 'ऑर्डर',
    'nav.orderHistory': 'ऑर्डर इतिहास',
    'nav.vendors': 'विक्रेता',
    'nav.fertilizer': 'उर्वरक मित्र',
    'nav.search': 'खोज',
    'nav.about': 'हमारे बारे में',
    'nav.bio': 'जीवनी',
    'nav.signIn': 'साइन इन',
    'nav.register': 'रजिस्टर',
    'nav.logout': 'लॉगआउट',
    'nav.admin': 'एडमिन',
    
    // Hero Section - Hindi
    'hero.badge': '🌱 भारत का #1 खेती सुपर-ऐप',
    'hero.title': 'एग्रीकनेक्ट',
    'hero.subtitle': 'किसानों को भविष्य से जोड़ना',
    'hero.description': 'किसानों और बाजारों के बीच की खाई को पाटें। अपनी फसलों के लिए सही कीमत प्राप्त करें, सीधे उर्वरक प्राप्त करें, और हमारे AI-संचालित प्लेटफॉर्म के साथ महंगाई से लड़ें।',
    'hero.marketplace': 'बाज़ार देखें',
    'hero.aiAssistant': 'AI सहायक से बात करें',
    'hero.features': 'विशेषताएं',
    'hero.farmers': 'किसान',
    'hero.transactions': 'लेनदेन',
    'hero.livePrice': 'लाइव बाज़ार मूल्य',
    'hero.priceChange': 'पिछले सप्ताह से',
    'hero.aiRec': 'AI सिफारिश',
    'hero.bestTime': 'गेहूं बेचने का सबसे अच्छा समय',
    'hero.highDemand': 'दिल्ली NCR में उच्च मांग',
  },
  pa: {
    // Navigation - Punjabi
    'nav.home': 'ਘਰ',
    'nav.marketplace': 'ਬਾਜ਼ਾਰ',
    'nav.orders': 'ਆਰਡਰ',
    'nav.orderHistory': 'ਆਰਡਰ ਇਤਿਹਾਸ',
    'nav.vendors': 'ਵਿਕਰੇਤਾ',
    'nav.fertilizer': 'ਖਾਦ ਮਿੱਤਰ',
    'nav.search': 'ਖੋਜ',
    'nav.about': 'ਸਾਡੇ ਬਾਰੇ',
    'nav.bio': 'ਜੀਵਨੀ',
    'nav.signIn': 'ਸਾਈਨ ਇਨ',
    'nav.register': 'ਰਜਿਸਟਰ',
    'nav.logout': 'ਲਾਗਆਉਟ',
    'nav.admin': 'ਐਡਮਿਨ',
    
    // Hero Section - Punjabi
    'hero.badge': '🌱 ਭਾਰਤ ਦਾ #1 ਖੇਤੀ ਸੁਪਰ-ਐਪ',
    'hero.title': 'ਐਗਰੀਕਨੈਕਟ',
    'hero.subtitle': 'ਕਿਸਾਨਾਂ ਨੂੰ ਭਵਿੱਖ ਨਾਲ ਜੋੜਨਾ',
    'hero.description': 'ਕਿਸਾਨਾਂ ਅਤੇ ਬਾਜ਼ਾਰਾਂ ਵਿਚਕਾਰ ਦੂਰੀ ਨੂੰ ਪੂਰਾ ਕਰੋ। ਆਪਣੀਆਂ ਫਸਲਾਂ ਲਈ ਸਹੀ ਕੀਮਤ ਪ੍ਰਾਪਤ ਕਰੋ, ਸਿੱਧੇ ਖਾਦ ਪ੍ਰਾਪਤ ਕਰੋ, ਅਤੇ ਸਾਡੇ AI-ਸੰਚਾਲਿਤ ਪਲੇਟਫਾਰਮ ਨਾਲ ਮਹਿੰਗਾਈ ਨਾਲ ਲੜੋ।',
    'hero.marketplace': 'ਬਾਜ਼ਾਰ ਦੇਖੋ',
    'hero.aiAssistant': 'AI ਸਹਾਇਕ ਨਾਲ ਗੱਲ ਕਰੋ',
    'hero.features': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'hero.farmers': 'ਕਿਸਾਨ',
    'hero.transactions': 'ਲੈਣ-ਦੇਣ',
    'hero.livePrice': 'ਲਾਈਵ ਬਾਜ਼ਾਰ ਕੀਮਤ',
    'hero.priceChange': 'ਪਿਛਲੇ ਹਫ਼ਤੇ ਤੋਂ',
    'hero.aiRec': 'AI ਸਿਫਾਰਸ਼',
    'hero.bestTime': 'ਕਣਕ ਵੇਚਣ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ',
    'hero.highDemand': 'ਦਿੱਲੀ NCR ਵਿੱਚ ਉੱਚ ਮੰਗ',
  },
  bn: {
    // Navigation - Bengali
    'nav.home': 'হোম',
    'nav.marketplace': 'বাজার',
    'nav.orders': 'অর্ডার',
    'nav.orderHistory': 'অর্ডার ইতিহাস',
    'nav.vendors': 'বিক্রেতা',
    'nav.fertilizer': 'সার বন্ধু',
    'nav.search': 'খুঁজুন',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.bio': 'জীবনী',
    'nav.signIn': 'সাইন ইন',
    'nav.register': 'রেজিস্টার',
    'nav.logout': 'লগআউট',
    'nav.admin': 'অ্যাডমিন',
    
    // Hero Section - Bengali
    'hero.badge': '🌱 ভারতের #1 কৃষি সুপার-অ্যাপ',
    'hero.title': 'এগ্রিকানেক্ট',
    'hero.subtitle': 'কৃষকদের ভবিষ্যতের সাথে সংযুক্ত করা',
    'hero.description': 'কৃষক এবং বাজারের মধ্যে ব্যবধান পূরণ করুন। আপনার ফসলের জন্য সঠিক মূল্য পান, সরাসরি সার পান এবং আমাদের AI-চালিত প্ল্যাটফর্মের সাথে মূল্যস্ফীতির বিরুদ্ধে লড়াই করুন।',
    'hero.marketplace': 'বাজার দেখুন',
    'hero.aiAssistant': 'AI সহায়কের সাথে কথা বলুন',
    'hero.features': 'বৈশিষ্ট্য',
    'hero.farmers': 'কৃষক',
    'hero.transactions': 'লেনদেন',
    'hero.livePrice': 'লাইভ বাজার মূল্য',
    'hero.priceChange': 'গত সপ্তাহ থেকে',
    'hero.aiRec': 'AI সুপারিশ',
    'hero.bestTime': 'গম বিক্রির সেরা সময়',
    'hero.highDemand': 'দিল্লি NCR-এ উচ্চ চাহিদা',
  },
  ta: {
    // Navigation - Tamil
    'nav.home': 'முகப்பு',
    'nav.marketplace': 'சந்தை',
    'nav.orders': 'ஆர்டர்கள்',
    'nav.orderHistory': 'ஆர்டர் வரலாறு',
    'nav.vendors': 'விற்பனையாளர்கள்',
    'nav.fertilizer': 'உர நண்பர்',
    'nav.search': 'தேடல்',
    'nav.about': 'எங்களை பற்றி',
    'nav.bio': 'சுயவிவரம்',
    'nav.signIn': 'உள்நுழை',
    'nav.register': 'பதிவு',
    'nav.logout': 'வெளியேறு',
    'nav.admin': 'நிர்வாகி',
    
    // Hero Section - Tamil
    'hero.badge': '🌱 இந்தியாவின் #1 விவசாய சூப்பர்-ஆப்',
    'hero.title': 'அக்ரிகனெக்ட்',
    'hero.subtitle': 'விவசாயிகளை எதிர்காலத்துடன் இணைத்தல்',
    'hero.description': 'விவசாயிகள் மற்றும் சந்தைகளுக்கு இடையிலான இடைவெளியை நிரப்புங்கள். உங்கள் பயிர்களுக்கு சரியான விலையைப் பெறுங்கள், நேரடியாக உரங்களை அணுகுங்கள், மற்றும் எங்கள் AI-இயங்கும் தளத்துடன் பணவீக்கத்தை எதிர்த்துப் போராடுங்கள்।',
    'hero.marketplace': 'சந்தையைப் பார்க்கவும்',
    'hero.aiAssistant': 'AI உதவியாளருடன் பேசுங்கள்',
    'hero.features': 'அம்சங்கள்',
    'hero.farmers': 'விவசாயிகள்',
    'hero.transactions': 'பரிவர்த்தனைகள்',
    'hero.livePrice': 'நேரடி சந்தை விலை',
    'hero.priceChange': 'கடந்த வாரத்திலிருந்து',
    'hero.aiRec': 'AI பரிந்துரை',
    'hero.bestTime': 'கோதுமை விற்பனைக்கான சிறந்த நேரம்',
    'hero.highDemand': 'டெல்லி NCR இல் அதிக தேவை',
  },
  te: {
    // Navigation - Telugu
    'nav.home': 'హోమ్',
    'nav.marketplace': 'మార్కెట్',
    'nav.orders': 'ఆర్డర్లు',
    'nav.orderHistory': 'ఆర్డర్ చరిత్ర',
    'nav.vendors': 'విక్రేతలు',
    'nav.fertilizer': 'ఎరువుల స్నేహితుడు',
    'nav.search': 'శోధన',
    'nav.about': 'మా గురించి',
    'nav.bio': 'జీవితచరిత్ర',
    'nav.signIn': 'సైన్ ఇన్',
    'nav.register': 'రిజిస్టర్',
    'nav.logout': 'లాగ్అవుట్',
    'nav.admin': 'అడ్మిన్',
    
    // Hero Section - Telugu
    'hero.badge': '🌱 భారతదేశం యొక్క #1 వ్యవసాయ సూపర్-యాప్',
    'hero.title': 'అగ్రికనెక్ట్',
    'hero.subtitle': 'రైతులను భవిష్యత్తుతో అనుసంధానించడం',
    'hero.description': 'రైతులు మరియు మార్కెట్ల మధ్య అంతరాన్ని తగ్గించండి. మీ పంటలకు సరైన ధరను పొందండి, నేరుగా ఎరువులను పొందండి మరియు మా AI-ఆధారిత ప్లాట్‌ఫారమ్‌తో ద్రవ్యోల్బణంతో పోరాడండి।',
    'hero.marketplace': 'మార్కెట్‌ప్లేస్‌ను అన్వేషించండి',
    'hero.aiAssistant': 'AI సహాయకుడితో మాట్లాడండి',
    'hero.features': 'ఫీచర్లు',
    'hero.farmers': 'రైతులు',
    'hero.transactions': 'లావాదేవీలు',
    'hero.livePrice': 'లైవ్ మార్కెట్ ధర',
    'hero.priceChange': 'గత వారం నుండి',
    'hero.aiRec': 'AI సిఫార్సు',
    'hero.bestTime': 'గోధుమలను అమ్మడానికి ఉత్తమ సమయం',
    'hero.highDemand': 'డిల్లీ NCRలో అధిక డిమాండ్',
  },
  mr: {
    // Navigation - Marathi
    'nav.home': 'होम',
    'nav.marketplace': 'बाजार',
    'nav.orders': 'ऑर्डर',
    'nav.orderHistory': 'ऑर्डर इतिहास',
    'nav.vendors': 'विक्रेते',
    'nav.fertilizer': 'खत मित्र',
    'nav.search': 'शोध',
    'nav.about': 'आमच्याबद्दल',
    'nav.bio': 'चरित्र',
    'nav.signIn': 'साइन इन',
    'nav.register': 'नोंदणी',
    'nav.logout': 'लॉगआउट',
    'nav.admin': 'अॅडमिन',
    
    // Hero Section - Marathi
    'hero.badge': '🌱 भारताचे #1 शेती सुपर-अॅप',
    'hero.title': 'अॅग्रीकनेक्ट',
    'hero.subtitle': 'शेतकऱ्यांना भविष्याशी जोडणे',
    'hero.description': 'शेतकरी आणि बाजारपेठ यांच्यातील अंतर कमी करा. आपल्या पिकांसाठी योग्य किंमत मिळवा, थेट खते मिळवा आणि आमच्या AI-आधारित प्लॅटफॉर्मसह महागाईशी लढा।',
    'hero.marketplace': 'बाजार पहा',
    'hero.aiAssistant': 'AI सहाय्यकाशी बोला',
    'hero.features': 'वैशिष्ट्ये',
    'hero.farmers': 'शेतकरी',
    'hero.transactions': 'व्यवहार',
    'hero.livePrice': 'लाइव्ह बाजार किंमत',
    'hero.priceChange': 'गेल्या आठवड्यापासून',
    'hero.aiRec': 'AI शिफारस',
    'hero.bestTime': 'गहू विक्रीसाठी सर्वोत्तम वेळ',
    'hero.highDemand': 'दिल्ली NCR मध्ये उच्च मागणी',
  },
  gu: {
    // Navigation - Gujarati
    'nav.home': 'હોમ',
    'nav.marketplace': 'બજાર',
    'nav.orders': 'ઓર્ડર',
    'nav.orderHistory': 'ઓર્ડર ઇતિહાસ',
    'nav.vendors': 'વિક્રેતાઓ',
    'nav.fertilizer': 'ખાતર મિત્ર',
    'nav.search': 'શોધ',
    'nav.about': 'અમારા વિશે',
    'nav.bio': 'જીવનચરિત્ર',
    'nav.signIn': 'સાઇન ઇન',
    'nav.register': 'રજિસ્ટર',
    'nav.logout': 'લૉગઆઉટ',
    'nav.admin': 'એડમિન',
    
    // Hero Section - Gujarati
    'hero.badge': '🌱 ભારતની #1 ખેતી સુપર-એપ',
    'hero.title': 'એગ્રીકનેક્ટ',
    'hero.subtitle': 'ખેડૂતોને ભવિષ્ય સાથે જોડવું',
    'hero.description': 'ખેડૂતો અને બજારો વચ્ચેનું અંતર ઘટાડો. તમારા પાક માટે યોગ્ય કિંમત મેળવો, સીધા ખાતરો મેળવો અને અમારા AI-આધારિત પ્લેટફોર્મ સાથે મોંઘવારી સામે લડો।',
    'hero.marketplace': 'બજાર જુઓ',
    'hero.aiAssistant': 'AI સહાયક સાથે વાત કરો',
    'hero.features': 'સુવિધાઓ',
    'hero.farmers': 'ખેડૂતો',
    'hero.transactions': 'વ્યવહારો',
    'hero.livePrice': 'લાઇવ બજાર કિંમત',
    'hero.priceChange': 'છેલ્લા અઠવાડિયાથી',
    'hero.aiRec': 'AI ભલામણ',
    'hero.bestTime': 'ઘઉં વેચવાનો શ્રેષ્ઠ સમય',
    'hero.highDemand': 'દિલ્હી NCR માં ઉચ્ચ માંગ',
  },
  kn: {
    // Navigation - Kannada
    'nav.home': 'ಹೋಮ್',
    'nav.marketplace': 'ಮಾರುಕಟ್ಟೆ',
    'nav.orders': 'ಆರ್ಡರ್‌ಗಳು',
    'nav.orderHistory': 'ಆರ್ಡರ್ ಇತಿಹಾಸ',
    'nav.vendors': 'ಮಾರಾಟಗಾರರು',
    'nav.fertilizer': 'ಗೊಬ್ಬರ ಸ್ನೇಹಿತ',
    'nav.search': 'ಹುಡುಕಿ',
    'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'nav.bio': 'ಜೀವನಚರಿತ್ರೆ',
    'nav.signIn': 'ಸೈನ್ ಇನ್',
    'nav.register': 'ನೋಂದಣಿ',
    'nav.logout': 'ಲಾಗ್‌ಔಟ್',
    'nav.admin': 'ಅಡ್ಮಿನ್',
    
    // Hero Section - Kannada
    'hero.badge': '🌱 ಭಾರತದ #1 ಕೃಷಿ ಸೂಪರ್-ಅಪ್ಲಿಕೇಶನ್',
    'hero.title': 'ಅಗ್ರಿಕನೆಕ್ಟ್',
    'hero.subtitle': 'ರೈತರನ್ನು ಭವಿಷ್ಯದೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು',
    'hero.description': 'ರೈತರು ಮತ್ತು ಮಾರುಕಟ್ಟೆಗಳ ನಡುವಿನ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡಿ। ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಸರಿಯಾದ ಬೆಲೆ ಪಡೆಯಿರಿ, ನೇರವಾಗಿ ಗೊಬ್ಬರಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ನಮ್ಮ AI-ಚಾಲಿತ ವೇದಿಕೆಯೊಂದಿಗೆ ಹಣದುಬ್ಬರದ ವಿರುದ್ಧ ಹೋರಾಡಿ।',
    'hero.marketplace': 'ಮಾರುಕಟ್ಟೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    'hero.aiAssistant': 'AI ಸಹಾಯಕನೊಂದಿಗೆ ಮಾತನಾಡಿ',
    'hero.features': 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    'hero.farmers': 'ರೈತರು',
    'hero.transactions': 'ವಹಿವಾಟುಗಳು',
    'hero.livePrice': 'ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
    'hero.priceChange': 'ಕಳೆದ ವಾರದಿಂದ',
    'hero.aiRec': 'AI ಶಿಫಾರಸು',
    'hero.bestTime': 'ಗೋಧಿ ಮಾರಾಟಕ್ಕೆ ಉತ್ತಮ ಸಮಯ',
    'hero.highDemand': 'ದೆಹಲಿ NCR ನಲ್ಲಿ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ',
  },
  ml: {
    // Navigation - Malayalam
    'nav.home': 'ഹോം',
    'nav.marketplace': 'മാർക്കറ്റ്',
    'nav.orders': 'ഓർഡറുകൾ',
    'nav.orderHistory': 'ഓർഡർ ചരിത്രം',
    'nav.vendors': 'വിൽപ്പനക്കാർ',
    'nav.fertilizer': 'വളം സുഹൃത്ത്',
    'nav.search': 'തിരയൽ',
    'nav.about': 'ഞങ്ങളെ കുറിച്ച്',
    'nav.bio': 'ജീവചരിത്രം',
    'nav.signIn': 'സൈൻ ഇൻ',
    'nav.register': 'രജിസ്റ്റർ',
    'nav.logout': 'ലോഗൗട്ട്',
    'nav.admin': 'അഡ്മിൻ',
    
    // Hero Section - Malayalam
    'hero.badge': '🌱 ഇന്ത്യയുടെ #1 കൃഷി സൂപ്പർ-ആപ്പ്',
    'hero.title': 'അഗ്രികണക്റ്റ്',
    'hero.subtitle': 'കർഷകരെ ഭാവിയുമായി ബന്ധിപ്പിക്കുന്നു',
    'hero.description': 'കർഷകരും വിപണികളും തമ്മിലുള്ള അകലം കുറയ്ക്കുക। നിങ്ങളുടെ വിളകൾക്ക് ശരിയായ വില നേടുക, നേരിട്ട് വളങ്ങൾ ലഭ്യമാക്കുക, ഞങ്ങളുടെ AI-പ്രവർത്തിക്കുന്ന പ്ലാറ്റ്ഫോം ഉപയോഗിച്ച് വിലക്കയറ്റത്തിനെതിരെ പോരാടുക।',
    'hero.marketplace': 'മാർക്കറ്റ് കാണുക',
    'hero.aiAssistant': 'AI സഹായിയുമായി സംസാരിക്കുക',
    'hero.features': 'സവിശേഷതകൾ',
    'hero.farmers': 'കർഷകർ',
    'hero.transactions': 'ഇടപാടുകൾ',
    'hero.livePrice': 'തത്സമയ വിപണി വില',
    'hero.priceChange': 'കഴിഞ്ഞ ആഴ്ചയിൽ നിന്ന്',
    'hero.aiRec': 'AI ശുപാർശ',
    'hero.bestTime': 'ഗോതമ്പ് വിൽക്കാനുള്ള മികച്ച സമയം',
    'hero.highDemand': 'ഡൽഹി NCR-ൽ ഉയർന്ന ആവശ്യം',
  },
  or: {
    // Navigation - Odia
    'nav.home': 'ହୋମ୍',
    'nav.marketplace': 'ବଜାର',
    'nav.orders': 'ଅର୍ଡର',
    'nav.orderHistory': 'ଅର୍ଡର ଇତିହାସ',
    'nav.vendors': 'ବିକ୍ରେତା',
    'nav.fertilizer': 'ସାର ବନ୍ଧୁ',
    'nav.search': 'ଖୋଜ',
    'nav.about': 'ଆମ ବିଷୟରେ',
    'nav.bio': 'ଜୀବନୀ',
    'nav.signIn': 'ସାଇନ୍ ଇନ୍',
    'nav.register': 'ରେଜିଷ୍ଟର',
    'nav.logout': 'ଲଗଆଉଟ୍',
    'nav.admin': 'ଆଡମିନ୍',
    
    // Hero Section - Odia
    'hero.badge': '🌱 ଭାରତର #1 କୃଷି ସୁପର-ଆପ୍',
    'hero.title': 'ଏଗ୍ରିକନେକ୍ଟ',
    'hero.subtitle': 'କୃଷକମାନଙ୍କୁ ଭବିଷ୍ୟତ ସହିତ ସଂଯୋଗ କରିବା',
    'hero.description': 'କୃଷକ ଏବଂ ବଜାର ମଧ୍ୟରେ ବ୍ୟବଧାନ ପୂରଣ କରନ୍ତୁ। ଆପଣଙ୍କର ଫସଲ ପାଇଁ ସଠିକ୍ ମୂଲ୍ୟ ପାଆନ୍ତୁ, ସିଧାସଳଖ ସାର ପାଆନ୍ତୁ ଏବଂ ଆମର AI-ଚାଳିତ ପ୍ଲାଟଫର୍ମ ସହିତ ମୁଦ୍ରାସ୍ଫୀତି ସହିତ ଲଢ଼ନ୍ତୁ।',
    'hero.marketplace': 'ବଜାର ଦେଖନ୍ତୁ',
    'hero.aiAssistant': 'AI ସହାୟକ ସହିତ କଥା ହୁଅନ୍ତୁ',
    'hero.features': 'ବୈଶିଷ୍ଟ୍ୟଗୁଡିକ',
    'hero.farmers': 'କୃଷକ',
    'hero.transactions': 'କାରବାର',
    'hero.livePrice': 'ଲାଇଭ୍ ବଜାର ମୂଲ୍ୟ',
    'hero.priceChange': 'ଗତ ସପ୍ତାହରୁ',
    'hero.aiRec': 'AI ସୁପାରିସ',
    'hero.bestTime': 'ଗହମ ବିକ୍ରୟ ପାଇଁ ସର୍ବୋତ୍ତମ ସମୟ',
    'hero.highDemand': 'ଦିଲ୍ଲୀ NCR ରେ ଅଧିକ ଚାହିଦା',
  },
  as: {
    // Navigation - Assamese
    'nav.home': 'হোম',
    'nav.marketplace': 'বজাৰ',
    'nav.orders': 'অৰ্ডাৰ',
    'nav.orderHistory': 'অৰ্ডাৰ ইতিহাস',
    'nav.vendors': 'বিক্ৰেতা',
    'nav.fertilizer': 'সাৰ বন্ধু',
    'nav.search': 'সন্ধান',
    'nav.about': 'আমাৰ বিষয়ে',
    'nav.bio': 'জীৱনী',
    'nav.signIn': 'ছাইন ইন',
    'nav.register': 'ৰেজিষ্টাৰ',
    'nav.logout': 'লগআউট',
    'nav.admin': 'এডমিন',
    
    // Hero Section - Assamese
    'hero.badge': '🌱 ভাৰতৰ #1 কৃষি চুপাৰ-এপ',
    'hero.title': 'এগ্ৰিকনেক্ট',
    'hero.subtitle': 'কৃষকসকলক ভৱিষ্যতৰ সৈতে সংযোগ কৰা',
    'hero.description': 'কৃষক আৰু বজাৰৰ মাজৰ ব্যৱধান পূৰণ কৰক। আপোনাৰ শস্যৰ বাবে সঠিক মূল্য পাওক, পোনপটীয়াকৈ সাৰ পাওক আৰু আমাৰ AI-চালিত প্লেটফৰ্মৰ সৈতে মুদ্ৰাস্ফীতিৰ বিৰুদ্ধে যুঁজ দিয়ক।',
    'hero.marketplace': 'বজাৰ চাওক',
    'hero.aiAssistant': 'AI সহায়কৰ সৈতে কথা পাতক',
    'hero.features': 'বৈশিষ্ট্যসমূহ',
    'hero.farmers': 'কৃষক',
    'hero.transactions': 'লেনদেন',
    'hero.livePrice': 'লাইভ বজাৰ মূল্য',
    'hero.priceChange': 'যোৱা সপ্তাহৰ পৰা',
    'hero.aiRec': 'AI পৰামৰ্শ',
    'hero.bestTime': 'ঘেঁহু বিক্ৰীৰ বাবে সৰ্বোত্তম সময়',
    'hero.highDemand': 'দিল্লী NCR ত উচ্চ চাহিদা',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
