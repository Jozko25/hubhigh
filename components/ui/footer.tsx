"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-gradient-to-b from-black/60 via-black/85 to-black/95 border-t border-white/10 overflow-hidden">
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Main footer content - horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
          {/* Company info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              O nás
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm max-w-sm">
              Sme dravý tím, ktorý neustále sleduje trendy a tvorí videá, ktoré nielen vyzerajú dobre ale hlavne fungujú. 
              Pomáhame firmám rásť cez výkonný a strategický obsah.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Služby
            </h4>
            <ul className="space-y-2">
              <motion.li
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/sluzby" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <span className="relative">
                    Výkonnostný marketing
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/sluzby" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <span className="relative">
                    Tvorba obsahu
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/sluzby" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <span className="relative">
                    Správa sociálnych sietí
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/freeKurz" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <span className="relative">
                    Free kurz
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Kontakt
            </h4>
            <div className="bg-gradient-to-r from-purple-900/20 via-purple-800/10 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-md border border-purple-500/30">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-200 font-semibold text-sm">Email</p>
                  <a 
                    href="mailto:info@hubhigh.sk" 
                    className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium hover:underline decoration-purple-400"
                  >
                    info@hubhigh.sk
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-4"
        >
          <div className="text-center">
            <div className="text-gray-400 text-xs">
              <p>&copy; {currentYear} HubHigh. Všetky práva vyhradené.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
