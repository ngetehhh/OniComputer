export const Footer = () => {
    return (
    <footer id="contact" className="bg-[#111] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
        
        {/* Left Side: Logo */}
        <div className="flex flex-col ">
           <div className="font-bold text-3xl tracking-tighter">
            <span className="text-[#D90000]">ONI</span>
          </div>
          <div className="text-gray-400 text-sm font-normal tracking-[0.1em] uppercase">
            Computer
          </div>
        </div>

        {/* Right Side: Links */}
        <div className="flex gap-16 md:gap-32 text-sm text-gray-400">
          {/* Column 1 */}
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-semibold mb-2">Products</h4>
            <a href="#products" className="hover:text-white transition">Processors</a>
            <a href="#products" className="hover:text-white transition">Graphic Card</a>
            <a href="#produts" className="hover:text-white transition">Motherboards</a>
            <a href="#products" className="hover:text-white transition">Memory</a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-semibold mb-2">Contacts</h4>
            <a href="mailto:rafaelmp1507@gmail.com" className="hover:text-white transition">rafaelmp1507@gmail.com</a>
            <a href="tel:082349289120" className="hover:text-white transition">0823-4928-9120</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

