/* Bella Sera — Food & Visual Assets
  Build-safe via import.meta.url
*/

// Helper for the "General" assets folder (Home Page)
const img = (fileName) =>
  new URL(`../assets/images/${fileName}`, import.meta.url).href;

// Helper for the "Menu" specific folder (Menu Page)
const menuImg = (fileName) =>
  new URL(`../assets/images/menu/${fileName}`, import.meta.url).href;

export const foodData = {
  /* =========================
      HERO — SIGNATURE RAMEN
     ========================= */
  ramen: {
    name: "Spicy Miso Ramen",
    description: "Rich broth, soft egg, chili oil",
    bowl: img("ramen.png"), // From main images folder

    floatables: {
      egg: img("egg.png"),
      nori: img("nori.png"),
      naruto: img("naruto.png"),
      chopsticks: img("chopstick.png"), // Fixed: singular 'chopstick'
    },
  },

  /* =========================
      RIGHT-SIDE / FEATURE IMAGES
     ========================= */
  featured: {
    pizza: {
      name: "Woodfired Pizza",
      image: img("pizza.png"),
    },
    momos: {
      name: "Steamed Momos",
      image: img("momos.png"),
    },
    burger: {
      name: "Gourmet Burger",
      image: img("burger.png"),
    },
  },

  /* =========================
      DRINKS (NO TRANSPARENCY)
     ========================= */
  drinks: {
    mojito: {
      name: "Classic Mojito",
      image: img("mojito.png"),
    },
    shake: {
      name: "Creamy Shake",
      image: img("shake.png"),
    },
  },

  /* =========================
      SPRINKLES — PARALLAX ACCENTS
     ========================= */
  accents: {
    herbs: {
      basil: img("basil.png"),
      mint: img("mint.png"),
      coriander: img("coriander.png"),
    },
    spices: {
      chilli: img("chilli.png"),
      garlic: img("garlic.png"),
      clove: img("clove.png"),
    },
    grains: {
      coffee: img("coffee.png"),
      flour: img("flour.png"),
    },
  },

  /* =========================
      TEXTURE & HUMAN ELEMENT
     ========================= */
  environment: {
    surface: img("surface.jpeg"),
    kitchen: img("kitchen.png"),
    cafe: img("cafe.png"),
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
        image: menuImg("ramen-miso.png"),
        veg: false,
      },
      {
        id: "r2",
        name: "Shoyu Truffle",
        price: "₹520",
        desc: "Soy broth, truffle oil, nori sheet.",
        image: menuImg("ramen-shoyu.png"),
        veg: false,
      },
      {
        id: "r3",
        name: "Veg Tantanmen",
        price: "₹400",
        desc: "Spicy sesame broth, soy mince, bok choy.",
        image: menuImg("ramen-veg.png"),
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
        image: menuImg("margherita.png"),
        veg: true,
      },
      {
        id: "p2",
        name: "Spicy Pepperoni",
        price: "₹650",
        desc: "Italian pepperoni, hot honey, chili flakes.",
        image: menuImg("pepperoni.png"),
        veg: false,
      },
      {
        id: "p3",
        name: "Exotic Veg",
        price: "₹590",
        desc: "Bell peppers, olives, jalapeños, feta.",
        image: menuImg("exotic-pizza.png"),
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
        image: menuImg("crystal-momo.png"),
        veg: true,
      },
      {
        id: "m2",
        name: "Steamed Momos",
        price: "₹320",
        desc: "Traditional vegetable filling, sesame chutney.",
        image: menuImg("steam-momo.png"),
        veg: true,
      },
      {
        id: "m3",
        name: "Pan Fried Momos",
        price: "₹350",
        desc: "Crispy bottom, spicy schezwan glaze.",
        image: menuImg("fried-momo.png"),
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
        image: menuImg("burger.png"),
        veg: false,
      },
      {
        id: "h2",
        name: "Grilled Sandwich",
        price: "₹280",
        desc: "Sourdough, pesto, mozzarella, tomato.",
        image: menuImg("sandwich.png"),
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
        image: menuImg("mojito.png"),
        veg: true,
      },
      {
        id: "d2",
        name: "Oreo Shake",
        price: "₹290",
        desc: "Vanilla bean ice cream, crushed oreos.",
        image: menuImg("shake.png"),
        veg: true,
      },
      {
        id: "d3",
        name: "Artisan Coffee",
        price: "₹200",
        desc: "Single origin arabica, freshly brewed.",
        image: menuImg("coffee.png"),
        veg: true,
      },
    ],
  },
};
