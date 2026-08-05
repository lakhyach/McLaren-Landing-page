/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const links = [
    { title: "About", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Portfolio", href: "#casestudy" },
    { title: "Blogs", href: "#blogs" },
    { title: "Benefits", href: "#why-us" },
  ];

  const socials = [
    { title: "LinkedIn", href: "#" },
    { title: "Instagram", href: "#" },
    { title: "Twitter", href: "#" },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-50 pt-24 pb-12 font-sans min-h-[60vh] flex flex-col justify-between border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 w-full">
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-24">
          {/* Company Info */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-bold text-zinc-50 mb-2">
              MACLARN <sup className="text-xs">&reg;</sup>
            </h4>
            <p className="text-xs text-zinc-500 font-medium tracking-tight">
              San Francisco, USA
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-100 transition-colors w-fit"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-100 transition-colors w-fit"
              >
                {social.title}
              </a>
            ))}
          </div>

          {/* Contact Email */}
          <div className="md:col-span-2">
            <a
              href="mailto:contact@maclarn.com"
              className="text-xs font-medium text-zinc-500 hover:text-zinc-100 transition-colors"
            >
              contact@maclarn.com
            </a>
          </div>

          {/* Call to Action Callout */}
          <div className="md:col-span-3 flex flex-col items-end">
            <div className="text-right mb-6">
              <h3 className="text-3xl font-medium tracking-tighter text-zinc-600 leading-none">
                Reach Out
              </h3>
              <h3 className="text-3xl font-medium tracking-tighter text-zinc-50 leading-none mt-1">
                with MACLARN
              </h3>
            </div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              className="h-12 w-12 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-50 cursor-pointer hover:border-zinc-500 transition-all"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* INFINITE MARQUEE BRAND MARK WITH ANIMATED DYNAMIC GRADIENT */}
      <div className="w-full overflow-hidden my-6 select-none flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // Adjust speed (higher number = slower marquee)
          }}
        >
          {/* Duplicate the headline block for a seamless infinite loop */}
          {[0, 1].map((index) => (
            <motion.h1
              key={index}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-[18vw] lg:text-[15vw] 2xl:text-[13vw] font-bold leading-none tracking-tighter pr-12 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-amber-500 via-yellow-400 via-cyan-400 to-zinc-100 bg-[length:200%_auto] flex items-center"
            >
              MACLARN
              <sup className="text-[0.25em] align-top top-[-0.2em] relative font-light ml-1">
                &reg;
              </sup>
            </motion.h1>
          ))}
        </motion.div>
      </div>

      {/* FINAL COPYRIGHT BAR */}
      <div className="container cursor-pointer mx-auto px-6 md:px-12 w-full mt-8">
        <div className="flex justify-between items-center text-xs tracking-wide text-zinc-500 pt-8 border-t border-zinc-900">
          <span className="hover:text-zinc-200 transition-all duration-200 ease-in">
            &copy;{new Date().getFullYear()} MACLARN Inc.
          </span>
          <span className="hover:text-zinc-200 transition-all duration-200 ease-in">
            Enduro Performance Dynamics
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;