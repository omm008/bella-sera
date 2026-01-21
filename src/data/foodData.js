/* Bella Sera — Food & Visual Assets
  Build-safe via import.meta.url
*/

// Helper for the "General" assets folder (Home Page)
const img = (fileName) =>
  new URL(`../assets/images/${fileName}`, import.meta.url).href;

// Helper for the "Menu" specific folder (Menu Page)
const menuImg = (fileName) =>
  new URL(`../assets/images/${fileName}`, import.meta.url).href;

export const foodData = {
  logo: {
    name: "Bella Sera",
    image: img("logo.webp"),
  },
  /* =========================
      HERO — SIGNATURE RAMEN
     ========================= */
  ramen: {
    name: "Spicy Miso Ramen",
    description: "Rich broth, soft egg, chili oil",
    bowl: img("ramen.webp"), // From main images folder

    floatables: {
      egg: img("egg.webp"),
      nori: img("nori.webp"),
      naruto: img("naruto.webp"),
      chopsticks: img("chopstick.webp"), // Fixed: singular 'chopstick'
    },
  },

  /* =========================
      RIGHT-SIDE / FEATURE IMAGES
     ========================= */
  featured: {
    pizza: {
      name: "Woodfired Pizza",
      image: img("pizza.webp"),
    },
    momos: {
      name: "Steamed Momos",
      image: img("momos.webp"),
    },
    burger: {
      name: "Gourmet Burger",
      image: img("burger.webp"),
    },
  },

  /* =========================
      DRINKS (NO TRANSPARENCY)
     ========================= */
  drinks: {
    mojito: {
      name: "Classic Mojito",
      image: img("mojito-menu.webp"),
    },
    shake_menu: {
      name: "Creamy Shake",
      image: img("shake.webp"),
    },
  },

  /* =========================
      SPRINKLES — PARALLAX ACCENTS
     ========================= */
  accents: {
    herbs: {
      basil: img("basil.webp"),
      mint: img("mint.webp"),
      coriander: img("coriander.webp"),
    },
    spices: {
      chilli: img("chilli.webp"),
      garlic: img("garlic.webp"),
      clove: img("clove.webp"),
    },
    grains: {
      coffee: img("coffee.webp"),
      flour: img("flour.webp"),
    },
  },

  /* =========================
      TEXTURE & HUMAN ELEMENT
     ========================= */
  environment: {
    surface: img("surface.webp"),
    kitchen: img("kitchen.webp"),
    cafe: img("cafe.webp"),
  },
};

/* =========================
    MENU PAGE DATA (The Filmstrip)
   ========================= */
// This maps to the specific variants in your 'images/menu' folder
export const menuData = {
  ramen: {
    label: "Ramen & Bowls",
    items: [
      {
        id: "r1",
        name: "Spicy Miso Ramen",
        price: "₹450",
        desc: "Rich pork broth, soft egg, chili oil.",
        image: menuImg("ramen-miso.webp"),
        veg: false,
      },
      {
        id: "r2",
        name: "Shoyu Truffle",
        price: "₹520",
        desc: "Soy broth, truffle oil, nori sheet.",
        image: menuImg("ramen-shoyu.webp"),
        veg: false,
      },
      {
        id: "r3",
        name: "Veg Tantanmen",
        price: "₹400",
        desc: "Spicy sesame broth, soy mince, bok choy.",
        image: menuImg("ramen-veg.webp"),
        veg: true,
      },
    ],
  },
  pizza: {
    label: "Woodfired Pizza",
    items: [
      {
        id: "p1",
        name: "Classic Margherita",
        price: "₹550",
        desc: "San Marzano tomato, buffalo mozzarella, basil.",
        image: menuImg("margherita.webp"),
        veg: true,
      },
      {
        id: "p2",
        name: "Spicy Pepperoni",
        price: "₹650",
        desc: "Italian pepperoni, hot honey, chili flakes.",
        image: menuImg("pepperoni.webp"),
        veg: false,
      },
      {
        id: "p3",
        name: "Exotic Veg",
        price: "₹590",
        desc: "Bell peppers, olives, jalapeños, feta.",
        image: menuImg("exotic-pizza.webp"),
        veg: true,
      },
    ],
  },
  momos: {
    label: "Dimsum & Momos",
    items: [
      {
        id: "m1",
        name: "Crystal Dimsum",
        price: "₹380",
        desc: "Translucent wrapper, water chestnut, mushroom.",
        image: menuImg("crystal-momo.webp"),
        veg: true,
      },
      {
        id: "m2",
        name: "Steamed Momos",
        price: "₹320",
        desc: "Traditional vegetable filling, sesame chutney.",
        image: menuImg("steam-momo.webp"),
        veg: true,
      },
      {
        id: "m3",
        name: "Pan Fried Momos",
        price: "₹350",
        desc: "Crispy bottom, spicy schezwan glaze.",
        image: menuImg("fried-momo.webp"),
        veg: true,
      },
    ],
  },
  handhelds: {
    label: "Burgers & Sandwiches",
    items: [
      {
        id: "h1",
        name: "Gourmet Burger",
        price: "₹350",
        desc: "Brioche bun, double patty, caramelized onions.",
        image: menuImg("burger-menu.webp"),
        veg: false,
      },
      {
        id: "h2",
        name: "Grilled Sandwich",
        price: "₹280",
        desc: "Sourdough, pesto, mozzarella, tomato.",
        image: menuImg("sandwich.webp"),
        veg: true,
      },
    ],
  },
  drinks: {
    label: "Sips & Shakes",
    items: [
      {
        id: "d1",
        name: "Classic Mojito",
        price: "₹250",
        desc: "White rum, fresh mint, lime wedges, soda.",
        image: menuImg("mojito.webp"),
        veg: true,
      },
      {
        id: "d2",
        name: "Oreo Shake",
        price: "₹290",
        desc: "Vanilla bean ice cream, crushed oreos.",
        image: menuImg("shake-glass.webp"),
        veg: true,
      },
      {
        id: "d3",
        name: "Artisan Coffee",
        price: "₹200",
        desc: "Single origin arabica, freshly brewed.",
        image: menuImg("coffee-cup.webp"),
        veg: true,
      },
    ],
  },
};
