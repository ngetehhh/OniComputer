
export const Category = () => {
    const categories = [
    {
      id: 1,
      title: "CPU",
      desc: "Menyediakan berbagai otak komputer anda",
      image: "src/assets/processor.png",
    },
    {
      id: 2,
      title: "Graphic Card",
      desc: "Tingkatkan kualitas grafis dan performa",
      image: "src/assets/vga.png",
    },
    {
      id: 3,
      title: "Motherboard",
      desc: "Fondasi kokoh untuk PC yang stabil",
      image: "src/assets/motherboard.png", // Generic tech background
    },
    {
      id: 4,
      title: "PC Case",
      desc: "Desain elegan untuk setup impian",
      image: "src/assets/casing.png",
    },
    {
      id: 5,
      title: "Memory / RAM",
      desc: "Kecepatan multitasking yang maksimal",
      image: "src/assets/memory.jpg ",
    },
    {
      id: 6,
      title: "Power Supply",
      desc: "Daya stabil untuk seluruh komponen",
      image: "src/assets/CorsairSupply.jpg", 
    },
  ];

  return (
    <div id="category" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-16 text-black">Category</h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-50 rounded-xl p-6 flex items-center gap-6 hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Card Image */}
              <div className="w-32 h-32 flex-shrink-0 bg-white rounded-lg p-0.5 flex items-center justify-center overflow-hidden border border-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col items-start text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  {item.desc}
                </p>
                <button className="text-sm font-semibold text-black flex items-center gap-1 hover:gap-2 transition-all">
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};