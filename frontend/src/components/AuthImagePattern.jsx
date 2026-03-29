const AuthImagePattern = ({ title, subtitle }) => {
  const imageUrl = "/public/images/9.jpg";

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8 overflow-hidden rounded-2xl">
          {[...Array(9)].map((_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const delays = [
              "0s",
              "0.15s",
              "0.3s",
              "0.45s",
              "0.6s",
              "0.75s",
              "0.9s",
              "1.05s",
              "1.2s",
            ];
            return (
              <div
                key={i}
                className="aspect-square animate-pulse"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "300% 300%",
                  backgroundPosition: `${-col * 100}% ${-row * 100}%`,
                  animationDelay: delays[i],
                }}
              />
            );
          })}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
