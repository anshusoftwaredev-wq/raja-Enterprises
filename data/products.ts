
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    retailPrice: 159900,
    wholesalePrice: 142000,
    moq: 5,
    stock: 45,
    category: 'Phones',
    description: 'The titanium iPhone. Aerospace-grade titanium design. A17 Pro chip. Pro camera system.',
    image: 'https://rukminim2.flixcart.com/image/2560/2560/xif0q/mobile/c/x/n/-original-imahggesggfsawxg.jpeg?q=90',
    isNew: true,
    isPopular: true,
    specs: {
      'Processor': 'A17 Pro',
      'Display': '6.7-inch OLED',
      'Camera': '48MP Main',
      'Battery': '29h Video'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    retailPrice: 129999,
    wholesalePrice: 112000,
    moq: 5,
    stock: 30,
    category: 'Phones',
    description: 'Welcome to the era of mobile AI. Built with Titanium for ultimate durability.',
    image: 'https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/i/s/g/-original-imahgfmzraymrnrg.jpeg?q=90',
    isPopular: true,
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'Display': '6.8-inch AMOLED',
      'Camera': '200MP Main',
      'S-Pen': 'Included'
    }
  },
  {
    id: '3',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    retailPrice: 24900,
    wholesalePrice: 19500,
    moq: 10,
    stock: 120,
    category: 'Audio',
    description: 'Active Noise Cancellation and personalized Spatial Audio.',
    image: 'https://rukminim2.flixcart.com/image/1280/1280/xif0q/headphone/e/a/f/-original-imagtc44nk4b3hfg.jpeg?q=90',
    specs: {
      'Chip': 'H2',
      'Battery': '6h ANC',
      'Charging': 'USB-C / MagSafe'
    }
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    retailPrice: 29990,
    wholesalePrice: 24500,
    moq: 8,
    stock: 25,
    category: 'Audio',
    description: 'Industry-leading noise cancellation. Your world, nothing else.',
    image: 'https://rukminim2.flixcart.com/image/1280/1280/xif0q/headphone/v/d/g/-original-imahgr295uvptwq7.jpeg?q=90',
    isPopular: true,
    specs: {
      'Battery': '30 hours',
      'Driver': '30mm',
      'Weight': '250g'
    }
  },
  {
    id: '5',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    retailPrice: 64999,
    wholesalePrice: 58000,
    moq: 10,
    stock: 50,
    category: 'Phones',
    description: 'Elite performance with 4th Gen Hasselblad Camera for Mobile.',
    image: 'https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/7/z/j/12-cph2573-oneplus-original-imahjngudb3jjkew.jpeg?q=90',
    isNew: true,
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '16GB LPDDR5X',
      'Charging': '100W SUPERVOOC'
    }
  },
  {
    id: '6',
    name: 'Belkin MagSafe Stand',
    brand: 'Belkin',
    retailPrice: 4999,
    wholesalePrice: 3200,
    moq: 20,
    stock: 200,
    category: 'Accessories',
    description: 'Fast wireless charging for your Apple ecosystem.',
    image: 'https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile-holder/w/m/8/suction-cup-vacuum-suction-magnetic-magsafe-car-phone-holder-360-original-imahe87mghhggjp3.jpeg?q=90',
    specs: {
      'Output': '15W Fast Charging',
      'Compatability': 'iPhone 12+'
    }
  }
];
