// Polyfill for generating random UUIDs
if (!crypto.randomUUID) {
  crypto.randomUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r =
          (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) >>
          (c === "x" ? 0 : 4);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  };
}

export const productLists = [
  {
    id: crypto.randomUUID(),
    name: "Mahoney Sofa",
    description:
      "The Mahoney Sofa offers a perfect blend of comfort and style, featuring plush cushions and a sleek design that complements any living room decor.",
    sku: "29045-SB-3",
    categories: ["Furniture", "Living Room", "Sofas"],
    tags: ["Comfortable", "Stylish", "Living Room"],
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It is comfortable",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast.",
      },
    ],
    hasDiscount: 15,
    sizes: ["L", "X", "XL"],
    colors: [
      {
        id: "pebble",
        name: "Pebble",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272257/mahoney-sofa-pebble_whfcrj.webp",
      },
      {
        id: "chocolate",
        name: "Chocolate",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272256/mahoney-sofa-chocolate_riduxj.webp",
      },
    ],
    images: {
      pebble: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272688/mahoney-sofa-pebble1_zdk1x4.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272686/mahoney-sofa-pebble2_zcfzey.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272882/mahoney-sofa-pebble3_o9dznm.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272688/mahoney-sofa-pebble4_yntl9f.webp",
      ],
      chocolate: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272983/mahoney-sofa-chocolate1_j3739r.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272981/mahoney-sofa-chocolate2_fftabf.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272994/mahoney-sofa-chocolate3_l8jrss.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272981/mahoney-sofa-chocolate4_ykgt0o.webp",
      ],
    },
    price: 349.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Hennington Queen Upholstered Bed",
    description:
      "The Hennington Queen Upholstered Bed combines elegance and comfort, featuring a plush headboard and a sturdy frame for a restful night's sleep.",
    sku: "29046-HQ-1",
    categories: ["Furniture", "Bedroom", "Beds"],
    tags: ["Elegant", "Comfortable", "Bedroom"],
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It is comfortable",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast.",
      },
    ],
    sizes: ["Queen", "King", "California King"],
    colors: [
      {
        id: "bisque",
        name: "Bisque",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727285919/hennington-queen-bed-bisque_besy3h.webp",
      },
    ],
    images: {
      bisque: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727286275/hennington-queen-bed-bisque1_jqwc8x.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727286274/hennington-queen-bed-bisque2_ppnpbv.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727286276/hennington-queen-bed-bisque3_wspp64.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727286276/hennington-queen-bed-bisque4_shuzeu.webp",
      ],
    },
    price: 1099.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Rencott Dining Extension Table",
    sku: "290U5-SB-3",
    description:
      "The Rencott Dining Extension Table combines style and versatility, featuring a sleek design and light brown finish, perfect for gatherings with easy extension options.",
    categories: ["Furniture", "Dining Room", "Tables"],
    tags: ["Versatile", "Elegant", "Extendable"],
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It is comfortable.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast.",
      },
    ],
    sizes: ["M"],
    colors: [
      {
        id: "lightBrown",
        name: "Light Brown",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287084/rencott-dining-table-light-brown_yfauds.webp",
      },
    ],
    images: {
      lightBrown: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287111/rencott-dining-table-light-brown1_wqnj1w.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287113/rencott-dining-table-light-brown2_xbr6mi.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287112/rencott-dining-table-light-brown3_zw26ec.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287112/rencott-dining-table-light-brown4_qay8v0.webp",
      ],
    },
    price: 799.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "WILL-DRSR-001",
    name: "Willowton 6 Drawer Dresser",
    categories: ["Bedroom Furniture", "Dressers", "Storage Solutions"],
    tags: [
      "Modern",
      "Rustic",
      "Spacious",
      "Whitewash",
      "Two-tone",
      "High-Quality",
    ],
    description:
      "The Willowton 6 Drawer Dresser offers ample storage with a modern rustic design, featuring sturdy construction and smooth-gliding drawers in Whitewash or Two-tone finishes.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message:
          "Just bought it. It's comfortable and fits perfectly in my bedroom.",
      },
      {
        name: "John S",
        rating: 4.3,
        message:
          "Using it for a year, and it's holding up really well. Love the build quality.",
      },
      {
        name: "William S",
        rating: 4.0,
        message:
          "Everything seems great, delivery was fast, and it looks even better in person.",
      },
    ],
    hasDiscount: 10,
    sizes: ["M", "L"],
    colors: [
      {
        id: "whiteWash",
        name: "Whitewash",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287499/willowton-dresser-white-wash_vyqqej.webp",
      },
      {
        id: "twoTone",
        name: "Two-tone",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287498/willowton-dresser-two-tone_tjafdp.webp",
      },
    ],
    images: {
      whiteWash: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287582/willowton-dresser-white-wash1_k1oltm.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287585/willowton-dresser-white-wash2_vjpf0t.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287585/willowton-dresser-white-wash3_a8ltos.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287582/willowton-dresser-white-wash4_tjeggc.webp",
      ],
      twoTone: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288173/willowton-dresser-two-tone1_ufahas.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288176/willowton-dresser-two-tone2_mvg5o9.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288175/willowton-dresser-two-tone3_c7wtol.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288175/willowton-dresser-two-tone4_qvjjew.webp",
      ],
    },
    price: 499.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "APR-DRSR-002",
    name: "Aprilyn 6 Drawer Dresser",
    categories: ["Bedroom Furniture", "Dressers", "Modern Furniture"],
    tags: ["Elegant", "Contemporary", "Spacious", "White", "Honey", "Durable"],
    description:
      "The Aprilyn 6 Drawer Dresser offers sleek storage with a modern design, featuring smooth-gliding drawers and durable construction in White or Honey finishes.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message:
          "Just bought it. It's comfortable and the drawers slide smoothly.",
      },
      {
        name: "John S",
        rating: 4.3,
        message:
          "Using it for a year, and it's still in perfect condition. Great quality!",
      },
      {
        name: "William S",
        rating: 4.0,
        message:
          "Everything seems great, delivery was fast, and it's very spacious.",
      },
    ],
    sizes: ["S", "M", "L"],
    colors: [
      {
        id: "white",
        name: "White",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288886/aprilyn-drawer-dresser-white_htpmin.webp",
      },
      {
        id: "honey",
        name: "Honey",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288886/aprilyn-drawer-dresser-honey_cpmrhp.webp",
      },
    ],
    images: {
      white: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288939/aprilyn-drawer-dresser-white1_dwqwef.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288938/aprilyn-drawer-dresser-white2_udlq2t.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288942/aprilyn-drawer-dresser-white3_tuz968.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288942/aprilyn-drawer-dresser-white4_zdays5.webp",
      ],
      honey: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289010/aprilyn-drawer-dresser-honey1_kjzgiu.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289009/aprilyn-drawer-dresser-honey2_awj7op.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289007/aprilyn-drawer-dresser-honey3_tct0aw.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289013/aprilyn-drawer-dresser-honey4_regh7y.webp",
      ],
    },
    price: 259.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "NASH-MTLBED-003",
    name: "Nashburg Queen Metal Bed",
    categories: ["Bedroom Furniture", "Beds", "Metal Beds"],
    tags: [
      "Industrial",
      "Sturdy",
      "Classic Design",
      "Black",
      "Queen",
      "Durable",
    ],
    description:
      "The Nashburg Queen Metal Bed offers a sturdy industrial design with a sleek black finish, combining durability and style for any bedroom. Available in Twin, Queen, and King sizes.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It's comfortable and looks amazing.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, and it's been great. Very sturdy!",
      },
      {
        name: "William S",
        rating: 4.0,
        message:
          "Everything seems great, delivery was fast, and assembly was easy.",
      },
    ],
    sizes: ["Twin", "King", "Queen"],
    colors: [
      {
        id: "black",
        name: "Black",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289255/nashburg-metal-bed-black_ofiii3.webp",
      },
    ],
    images: {
      black: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289312/nashburg-metal-bed-black1_lugeto.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289319/nashburg-metal-bed-black2_hdmlpx.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289316/nashburg-metal-bed-black3_ezymjk.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289315/nashburg-metal-bed-black4_d2lhse.webp",
      ],
    },
    price: 249.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "TRENT-MTLBED-004",
    name: "Trentlore Queen Metal Bed",
    categories: ["Bedroom Furniture", "Beds", "Metal Beds"],
    tags: ["Minimalist", "Elegant", "White", "Queen", "Durable", "Discount"],
    description:
      "The Trentlore Queen Metal Bed features a minimalist design with a crisp white finish, combining elegance and durability for modern bedrooms. Available in Queen size only, it offers timeless appeal and an 8% discount, making it a stylish yet affordable addition to your decor.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It's comfortable and stylish.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, and it's been very sturdy.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast and hassle-free.",
      },
    ],
    hasDiscount: 8,
    sizes: ["Queen"],
    colors: [
      {
        id: "white",
        name: "White",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288886/aprilyn-drawer-dresser-white_htpmin.webp",
      },
    ],
    images: {
      white: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289768/trentlore-metal-bed-white1_y9eh7n.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289766/trentlore-metal-bed-white2_yonulm.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289765/trentlore-metal-bed-white3_pofvwd.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289764/trentlore-metal-bed-white4_udjkfi.webp",
      ],
    },
    price: 249.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "THAD-VANSET-005",
    name: "Thadamere Vanity Set with Stool",
    categories: ["Bedroom Furniture", "Vanity Sets", "Furniture Sets"],
    tags: [
      "Elegant",
      "Functional",
      "Vanity Set",
      "Stool Included",
      "White",
      "Light Brown",
      "Durable",
    ],
    description:
      "The Thadamere Vanity Set with Stool offers a stylish and functional design with a mirror and comfortable stool. Available in White and Light Brown finishes, it's a durable and elegant addition to any bedroom or dressing room.",

    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It's comfortable and adds charm to my room.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, still as good as new. Very sturdy.",
      },
      {
        name: "William S",
        rating: 4.0,
        message:
          "Everything seems great, delivery was fast, and it's easy to assemble.",
      },
    ],
    sizes: ["M"],
    colors: [
      {
        id: "white",
        name: "White",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290284/white_ruxaer.webp",
      },
      {
        id: "lightBrown",
        name: "Light Brown",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290285/light-brown_bjrmco.webp",
      },
    ],
    images: {
      white: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290518/thadamere-vanity-set-white1_l7f2rn.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290524/thadamere-vanity-set-white2_srs4in.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290522/thadamere-vanity-set-white3_tw1nig.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290520/thadamere-vanity-set-white4_klg2qv.webp",
      ],
      lightBrown: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290700/thadamere-vanity-set-light-brown1_vcbibb.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290697/thadamere-vanity-set-light-brown2_besi43.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290696/thadamere-vanity-set-light-brown3_rngyeh.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290704/thadamere-vanity-set-light-brown4_r9cih6.webp",
      ],
    },
    price: 219.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "THAD-VANSET-023",
    name: "Thadamere Vanity Set with Stool",
    categories: ["Bedroom Furniture", "Vanity Sets", "Furniture Sets"],
    tags: [
      "Elegant",
      "Vanity Set",
      "Stool Included",
      "Silver",
      "Modern",
      "Discount",
    ],
    description:
      "The Thadamere Vanity Set with Stool in sleek silver combines elegance and functionality with a modern design. It offers ample storage and comfort, perfect for bedrooms or dressing rooms. Now available at a 23% discount.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It's comfortable and looks great.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, and it still looks as new.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, and the delivery was fast.",
      },
    ],
    hasDiscount: 23,
    sizes: ["M"],
    colors: [
      {
        id: "silver",
        name: "Silver",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290908/silver_vdwgae.webp",
      },
    ],
    images: {
      silver: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290980/linon-paloma-vanity-set1_fxbdrz.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290989/linon-paloma-vanity-set2_nn4zyj.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290987/linon-paloma-vanity-set3_eyhmah.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290984/linon-paloma-vanity-set4_cjoezd.webp",
      ],
    },
    price: 315.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "TS-GAMING-CHAIR-001",
    name: "Techni Sport Gaming Chair",
    categories: ["Gaming Chairs", "Office Chairs", "Furniture"],
    tags: [
      "Ergonomic",
      "Gaming Chair",
      "Adjustable",
      "Black & White",
      "Comfortable",
    ],
    description:
      "The Techni Sport Gaming Chair offers ergonomic support and a sleek black & white design, perfect for long gaming or working sessions. Its adjustable features ensure comfort and style, making it ideal for both gamers and professionals.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It's comfortable and stylish.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, and it's still holding up great.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, and the delivery was fast.",
      },
    ],
    sizes: ["M"],
    colors: [
      {
        id: "blackWhite",
        name: "Black & White",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291315/black-white_inx7fl.webp",
      },
    ],
    images: {
      blackWhite: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291443/techni-gaming-chair1_ms3xcz.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291452/techni-gaming-chair2_tvbf5s.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291450/techni-gaming-chair3_o7wram.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291445/techni-gaming-chair4_phcbwn.webp",
      ],
    },
    price: 230.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "TS-HIGH-BACK-RACER-002",
    name: "Techni Sport Ergonomic High Back Racer Gaming Chair",
    categories: ["Gaming Chairs", "Office Chairs", "Furniture"],
    tags: [
      "Ergonomic",
      "High Back",
      "Racer Style",
      "Gaming Chair",
      "Black",
      "Comfortable",
    ],
    description:
      "The Techni Sport Ergonomic High Back Racer Gaming Chair combines superior support with a sleek racer-style design. Ideal for long gaming sessions, it features adjustable armrests and a high back for optimal comfort and durability.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It's comfortable and sleek.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, still great for long hours.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast.",
      },
    ],
    hasDiscount: 17,
    sizes: ["M"],
    colors: [
      {
        id: "black",
        name: "Black",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291559/black_zhgtc0.webp",
      },
    ],
    images: {
      black: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291682/Techni-high-back-racer-gaming-chair1_mbdlpm.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291692/Techni-high-back-racer-gaming-chair2_u1ei1v.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291689/Techni-high-back-racer-gaming-chair3_oeme2d.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291687/Techni-high-back-racer-gaming-chair4_zms1ls.webp",
      ],
    },
    price: 229.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "CL-QUADRA-BOOKCASE-003",
    name: 'CorLiving Quadra 71" Bookcase',
    categories: ["Bookcases", "Furniture", "Storage"],
    tags: [
      "Modern",
      "Bookshelf",
      "Quadra",
      "71 inch",
      "Storage",
      "Bookcase",
      "White",
      "Black",
      "Walnut",
    ],
    description:
      'The CorLiving Quadra 71" Bookcase offers a stylish and functional storage solution for any space. Available in White, Black, and Walnut, it features a sturdy design and ample storage for books and decor, making it perfect for modern interiors.',
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. It is comfortable and practical.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, still sturdy and looks great.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast.",
      },
    ],
    sizes: ["M"],
    colors: [
      {
        id: "white",
        name: "White",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290284/white_ruxaer.webp",
      },
      {
        id: "black",
        name: "Black",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291559/black_zhgtc0.webp",
      },
      {
        id: "walnut",
        name: "Walnut",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291887/walnut_uz2chn.webp",
      },
    ],
    images: {
      white: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292029/corLiving-bookcase-white1_imbqvm.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292040/corLiving-bookcase-white2_ezeohe.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292038/corLiving-bookcase-white3_wmtqj6.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292035/corLiving-bookcase-white4_o55kvf.webp",
      ],
      black: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292144/corLiving-bookcase-black1_mrd2yz.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292142/corLiving-bookcase-black2_skph9k.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292139/corLiving-bookcase-black3_lfthff.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292150/corLiving-bookcase-black4_mjekm1.webp",
      ],
      walnut: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292264/corLiving-bookcase-walnut1_ndu3a0.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292261/corLiving-bookcase-walnut2_gryth6.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292252/corLiving-bookcase-walnut3_v1wixu.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292271/corLiving-bookcase-walnut4_hrwdwo.webp",
      ],
    },
    price: 228.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "NT-QUEST-GAMINGDESK-001",
    name: "NTENSE Quest Gaming Desk with CPU Stand",
    categories: ["Gaming Furniture", "Desks", "Furniture"],
    tags: ["Gaming Desk", "CPU Stand", "NTENSE", "Gray", "Compact", "Modern"],
    description:
      "The NTENSE Quest Gaming Desk with CPU Stand features a sleek gray design and ample surface space for gaming gear. Its compact, sturdy build and integrated CPU stand make it perfect for modern gaming setups.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message:
          "Just bought it. It is comfortable and fits my gaming space perfectly.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year, and it holds up well.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast.",
      },
    ],
    colors: [
      {
        id: "gray",
        name: "Gray",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292362/gray_pdanq9.webp",
      },
    ],
    images: {
      gray: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292515/ntense-quest-gaming-desk-with-cpu-stand1_ztjr3c.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292512/ntense-quest-gaming-desk-with-cpu-stand2_zpvncc.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292509/ntense-quest-gaming-desk-with-cpu-stand3_xlugx7.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292506/ntense-quest-gaming-desk-with-cpu-stand4_w8uval.webp",
      ],
    },
    price: 171.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "CL-QUADRA-47-BOOKCASE-001",
    name: 'CorLiving Quadra 47" Bookcase',
    categories: ["Furniture", "Bookcases", "Home Decor"],
    tags: ["Bookcase", "CorLiving", "Walnut", "Black", "White", "Compact"],
    description:
      "The CorLiving Quadra 47\" Bookcase offers style and functionality with modern design and ample storage. Available in walnut, black, and white finishes, it's perfect for organizing books and decor while enhancing your home.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message:
          "Just bought it. It is comfortable and fits perfectly in my space.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year and it still looks new.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great, delivery was fast.",
      },
    ],
    sizes: ["S"],
    colors: [
      {
        id: "walnut",
        name: "Walnut",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291887/walnut_uz2chn.webp",
      },
      {
        id: "black",
        name: "Black",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291559/black_zhgtc0.webp",
      },
      {
        id: "white",
        name: "White",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290284/white_ruxaer.webp",
      },
    ],
    images: {
      walnut: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292920/corLiving-small-bookcase-walnut1_adcfnk.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292931/corLiving-small-bookcase-walnut2_hsmkea.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292928/corLiving-small-bookcase-walnut3_wanwiz.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292925/corLiving-small-bookcase-walnut4_ttuldd.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292922/corLiving-small-bookcase-walnut5_xghmy3.webp",
      ],
      black: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293070/corLiving-small-bookcase-black1_usocp3.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293111/corLiving-small-bookcase-black2_xmygto.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293108/corLiving-small-bookcase-black3_juldpz.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293105/corLiving-small-bookcase-black4_tv1jy9.webp",
      ],
      white: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293219/corLiving-small-bookcase-white1_oprrch.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293212/corLiving-small-bookcase-white2_jx7cpb.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293215/corLiving-small-bookcase-white3_b3wsbi.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293208/corLiving-small-bookcase-white4_v7nkmv.webp",
      ],
    },
    price: 157.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "TS-GC-FEMALE-001",
    name: "Techni Sport Gaming Chair for Females",
    categories: ["Furniture", "Gaming Chairs", "Office Chairs"],
    tags: ["Gaming Chair", "Techni Sport", "Kawaii", "Comfort", "Ergonomic"],
    description:
      "The Techni Sport Gaming Chair for Females features a cute Kawaii design that combines style and comfort. It offers excellent support for long gaming sessions and adjustable settings for a perfect fit, enhancing both aesthetics and functionality in your gaming setup.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message:
          "Just bought it. It is comfortable and fits perfectly in my space.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year and it still looks and feels great.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great; delivery was fast.",
      },
    ],
    hasDiscount: 28,
    colors: [
      {
        id: "kawaii",
        name: "Kawaii",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293315/kawaii_tlzig0.webp",
      },
    ],
    images: {
      kawaii: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293527/techni-gaming-chair-female1_tcwxll.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293523/techni-gaming-chair-female2_cc8iz6.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293520/techni-gaming-chair-female3_wxtfwc.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293516/techni-gaming-chair-female4_hmkgyg.webp",
      ],
    },
    price: 309.99,
  },
  {
    id: crypto.randomUUID(),
    sku: "CS-CUBBIES-001",
    name: "Cascavel Stair Cubbies",
    categories: ["Furniture", "Storage", "Home Decor"],
    tags: ["Cubbies", "Storage Solution", "Home Organization", "Modern"],
    description:
      "The Cascavel Stair Cubbies provide a stylish and functional storage solution for home organization. Perfect for maximizing space, these modern cubbies are ideal for storing shoes, books, and other essentials, seamlessly blending into any room decor while ensuring easy access to your belongings.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message:
          "Just bought it. It is comfortable and fits perfectly in my entryway.",
      },
      {
        name: "John S",
        rating: 4.3,
        message: "Using it for a year and it still looks as good as new.",
      },
      {
        name: "William S",
        rating: 4.0,
        message: "Everything seems great; delivery was fast.",
      },
    ],
    colors: [
      {
        id: "white",
        name: "White",
        image:
          "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290284/white_ruxaer.webp",
      },
    ],
    images: {
      white: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293699/cascavel-stair-cubbies1_uot6ha.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293719/cascavel-stair-cubbies2_zpajzp.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293716/cascavel-stair-cubbies3_drpho8.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293706/cascavel-stair-cubbies4_nmzouw.webp",
      ],
    },
    price: 104.99,
  },
];
