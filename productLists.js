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
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
    hasOffer: "-15%",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272689/mahoney-sofa-pebble5_pul1hv.webp",
      ],
      chocolate: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272983/mahoney-sofa-chocolate1_j3739r.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272981/mahoney-sofa-chocolate2_fftabf.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272994/mahoney-sofa-chocolate3_l8jrss.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272981/mahoney-sofa-chocolate4_ykgt0o.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272983/mahoney-sofa-chocolate5_h92gsf.webp",
      ],
    },
    price: 349.99,
    discountPrice: 297.49,
  },
  {
    id: crypto.randomUUID(),
    name: "Hennington Queen Upholstered Bed",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727286274/hennington-queen-bed-bisque5_xlmzon.webp",
      ],
    },
    price: 1099.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Rencott Dining Extension Table",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287115/rencott-dining-table-light-brown5_d4sqib.webp",
      ],
    },
    price: 799.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Willowton 6 Drawer Dresser",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
    hasOffer: "-10%",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287583/willowton-dresser-white-wash5_ch66c7.webp",
      ],
      twoTone: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288173/willowton-dresser-two-tone1_ufahas.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288176/willowton-dresser-two-tone2_mvg5o9.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288175/willowton-dresser-two-tone3_c7wtol.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288175/willowton-dresser-two-tone4_qvjjew.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288174/willowton-dresser-two-tone5_y6qnbg.webp",
      ],
    },
    price: 499.99,
    discountPrice: 449.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Aprilyn 6 Drawer Dresser",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727288939/aprilyn-drawer-dresser-white5_x6glpa.webp",
      ],
      honey: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289010/aprilyn-drawer-dresser-honey1_kjzgiu.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289009/aprilyn-drawer-dresser-honey2_awj7op.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289007/aprilyn-drawer-dresser-honey3_tct0aw.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289013/aprilyn-drawer-dresser-honey4_regh7y.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289011/aprilyn-drawer-dresser-honey5_dkxuzv.webp",
      ],
    },
    price: 259.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Nashburg Queen Metal Bed",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289313/nashburg-metal-bed-black5_ocqvqp.webp",
      ],
    },
    price: 249.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Trentlore Queen Metal Bed",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
    hasOffer: "-8%",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289770/trentlore-metal-bed-white5_vamvix.webp",
      ],
    },
    price: 249.99,
    discountPrice: 229.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Thadamere Vanity Set with Stool",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290502/thadamere-vanity-set-white5_g2fazw.webp",
      ],
      lightBrown: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290700/thadamere-vanity-set-light-brown1_vcbibb.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290697/thadamere-vanity-set-light-brown2_besi43.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290696/thadamere-vanity-set-light-brown3_rngyeh.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290704/thadamere-vanity-set-light-brown4_r9cih6.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290702/thadamere-vanity-set-light-brown5_qyqz7c.webp",
      ],
    },
    price: 219.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Thadamere Vanity Set with Stool",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
    hasOffer: "-23%",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727290982/linon-paloma-vanity-set5_ckqa2q.webp",
      ],
    },
    price: 315.99,
    discountPrice: 242.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Techni Sport Gaming Chair",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291447/techni-gaming-chair5_prq4cq.webp",
      ],
    },
    price: 230.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Techni Sport Ergonomic High Back Racer Gaming Chair",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
    hasOffer: "-17%",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727291684/Techni-high-back-racer-gaming-chair5_dhjmyb.webp",
      ],
    },
    price: 229.99,
    discountPrice: 189.99,
  },
  {
    id: crypto.randomUUID(),
    name: 'CorLiving Quadra 71" Bookcase',
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292032/corLiving-bookcase-white5_fyh0dm.webp",
      ],
      black: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292144/corLiving-bookcase-black1_mrd2yz.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292142/corLiving-bookcase-black2_skph9k.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292139/corLiving-bookcase-black3_lfthff.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292150/corLiving-bookcase-black4_mjekm1.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292147/corLiving-bookcase-black5_sezhh4.webp",
      ],
      walnut: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292264/corLiving-bookcase-walnut1_ndu3a0.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292261/corLiving-bookcase-walnut2_gryth6.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292252/corLiving-bookcase-walnut3_v1wixu.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292271/corLiving-bookcase-walnut4_hrwdwo.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292267/corLiving-bookcase-walnut5_lvryqm.webp",
      ],
    },
    price: 228.99,
  },
  {
    id: crypto.randomUUID(),
    name: "NTENSE Quest Gaming Desk with CPU Stand",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727292518/ntense-quest-gaming-desk-with-cpu-stand5_m7gcex.webp",
      ],
    },
    price: 171.99,
  },
  {
    id: crypto.randomUUID(),
    name: 'CorLiving Quadra 47" Bookcase',
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293101/corLiving-small-bookcase-black5_qnbx0i.webp",
      ],
      white: [
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293219/corLiving-small-bookcase-white1_oprrch.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293212/corLiving-small-bookcase-white2_jx7cpb.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293215/corLiving-small-bookcase-white3_b3wsbi.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293208/corLiving-small-bookcase-white4_v7nkmv.webp",
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293206/corLiving-small-bookcase-white5_wnxlwz.webp",
      ],
    },
    price: 157.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Techni Sport Gaming Chair for Females",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
    hasOffer: "-28%",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293512/techni-gaming-chair-female5_e83yem.webp",
      ],
    },
    price: 309.99,
    discountPrice: 223.47,
  },
  {
    id: crypto.randomUUID(),
    name: "Cascavel Stair Cubbies",
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: [
      {
        name: "Ricardo M",
        rating: 4.5,
        message: "Just bought it. it is comfortable",
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
        "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727293703/cascavel-stair-cubbies5_eaayun.webp",
      ],
    },
    price: 104.99,
  },
];
