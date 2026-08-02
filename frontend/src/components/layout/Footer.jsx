import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaStore,
  FaShoppingBag,
  FaHeart,
  FaUserShield,
} from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  const shopLinks = [
    {
      label: "Products",
      to: "/products",
    },
    {
      label: "New Arrivals",
      to: "/products?sort=newest",
    },
    {
      label: "Deals",
      to: "/products?discount=true",
    },
    {
      label: "Wishlist",
      to: "/wishlist",
    },
  ];

  const customerLinks = [
    {
      label: "My Orders",
      to: "/orders",
    },
    {
      label: "Profile",
      to: "/profile",
    },
    {
      label: "Notifications",
      to: "/notifications",
    },
    {
      label: "Track Order",
      to: "/orders",
    },
  ];

  const sellerLinks = [
    {
      label: "Become a Seller",
      to: "/profile",
    },
    {
      label: "Seller Dashboard",
      to: "/seller/dashboard",
    },
    {
      label: "Add Product",
      to: "/seller/products/add",
    },
    {
      label: "Seller Orders",
      to: "/seller/orders",
    },
  ];

  const supportLinks = [
    {
      label: "Help Center",
      to: "/help",
    },
    {
      label: "Contact Us",
      to: "/contact",
    },
    {
      label: "Privacy Policy",
      to: "/privacy",
    },
    {
      label: "Terms & Conditions",
      to: "/terms",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer */}

      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-12
      "
      >
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          gap-10
        "
        >
          {/* Brand */}

          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="
                h-9
                w-9
                flex
                items-center
                justify-center
                rounded-lg
                bg-white
                text-gray-900
                font-bold
              "
              >
                S
              </span>

              <span
                className="
                text-xl
                font-bold
                text-white
              "
              >
                ShopVerse
              </span>
            </Link>

            <p
              className="
              mt-4
              max-w-sm
              text-sm
              leading-relaxed
            "
            >
              Nepal's modern multi-vendor marketplace. Buy quality products from
              trusted sellers and grow your business with ShopVerse.
            </p>

            <div
              className="
              mt-5
              space-y-3
              text-sm
            "
            >
              <div
                className="
                flex
                items-center
                gap-3
              "
              >
                <FaMapMarkerAlt />
                Kathmandu, Nepal
              </div>

              <div
                className="
                flex
                items-center
                gap-3
              "
              >
                <FaPhoneAlt />
                +977 9800000000
              </div>

              <div
                className="
                flex
                items-center
                gap-3
              "
              >
                <FaEnvelope />
                support@shopverse.com
              </div>
            </div>
          </div>

          {/* Shop */}

          <FooterColumn
            title="Shop"
            icon={<FaShoppingBag />}
            links={shopLinks}
          />

          {/* Customer */}

          <FooterColumn
            title="Customer"
            icon={<FaHeart />}
            links={customerLinks}
          />

          {/* Seller */}

          <FooterColumn title="Seller" icon={<FaStore />} links={sellerLinks} />

          {/* Support */}

          <FooterColumn
            title="Support"
            icon={<FaUserShield />}
            links={supportLinks}
          />
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
        border-t
        border-white/10
      "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-4
          py-5
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-4
        "
        >
          <p
            className="
            text-xs
            text-gray-500
          "
          >
            © {year} ShopVerse. All rights reserved.
          </p>

          <div
            className="
            flex
            items-center
            gap-3
          "
          >
            <SocialIcon icon={<FaFacebookF />} />

            <SocialIcon icon={<FaInstagram />} />

            <SocialIcon icon={<FaYoutube />} />
          </div>

          <div
            className="
            text-xs
            text-gray-500
          "
          >
            Payments:
            <span className="text-white ml-2">eSewa</span>
            <span className="text-white ml-2">Khalti</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, icon }) {
  return (
    <div>
      <h3
        className="
flex
items-center
gap-2
text-white
font-semibold
mb-4
"
      >
        {icon}

        {title}
      </h3>

      <ul
        className="
space-y-3
text-sm
"
      >
        {links.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className="
hover:text-white
transition
"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <a
      href="#"
      className="
h-9
w-9
rounded-full
bg-white/5
flex
items-center
justify-center
hover:bg-white/10
hover:text-white
transition
"
    >
      {icon}
    </a>
  );
}

export default Footer;
