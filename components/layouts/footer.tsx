import React from "react";
import Logo from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-200">
      <div className="container grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        <div>
          <Logo />
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span className="text-sm font-medium">ABC Street, India</span>
            </div>
            <a href="#" className="flex items-center gap-2">
              <Phone size={20} />
              <span className="text-sm font-medium">+91 2345678945</span>
            </a>
            <a href="#" className="flex items-center gap-2">
              <Mail size={20} />
              <span className="text-sm font-medium">abc@support.com</span>
            </a >
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold mb-2 uppercase">JOIN US ON</p>
            <div className="flex items-center gap-4">
              <a href="#">
                <Image
                  src="/imgs/facebook.png"
                  alt="facebook"
                  width={40}
                  height={40}
                />
              </a>
              <a href="#">
                <Image
                  src="/imgs/youtube.png"
                  alt="youtube"
                  width={40}
                  height={40}
                />
              </a>
              <a href="#">
                <Image
                  src="/imgs/instagram.png"
                  alt="instagram"
                  width={40}
                  height={40}
                />
              </a>
              <a href="#">
                <Image
                  src="/imgs/twitter.png"
                  alt="twitter"
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2 uppercase">
            Customer Service
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/track-order" className="font-medium hover:underline w-fit">
              Track Order
            </Link>
            <Link href="/contact-us" className="font-medium hover:underline w-fit">
              Contact Us
            </Link>
            <Link href="/about" className="font-medium hover:underline w-fit">
              About Us
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">INFORMATION</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/privacy-policy"
              className="font-medium hover:underline w-fit"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="font-medium hover:underline w-fit"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/shipping-policy"
              className="font-medium hover:underline w-fit"
            >
              Shipping & Delivery
            </Link>
            <Link href="/refund-policy" className="font-medium hover:underline w-fit">
              Refund & Cancelation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
