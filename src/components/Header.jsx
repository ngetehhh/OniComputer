import { useEffect } from "react";
import bgHeader from '../assets/bg_header.png';

export const Header = ({menuOpen, setMenuOpen}) => {

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    
    return (
     <div className="relative w-full h-[600px] md:h-[700px] bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={bgHeader}
          alt="PC Setup Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 ">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl leading-tight">
          Temukan Komponen PC <br /> Impian Anda di Sini
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl">
          Kami menyediakan panduan dari komponen terbaik untuk setiap level kebutuhan
        </p>
      <a href="#products">
        <button 
        className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 font-medium cursor-pointer">
          Cek Komponen
        </button>
        </a>
      </div>
    </div>
  );
};
