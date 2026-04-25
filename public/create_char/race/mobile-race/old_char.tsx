<div
        className="relative w-75.25 h-132.5 rounded-[20px] px-4 py-6 flex flex-col"
        style={{
          background: '#242424',
          backgroundImage: 'linear-gradient(116deg, #121212 0%, #272727 52.87%, #121212 100%)',
        }}
      >
        {/* Horned skull header icon + title */}
        <div className="flex flex-col items-center mb-4">
          <Image
            src={`${ASSET}/нтерикпмуа 1.png`}
            alt=""
            width={64}
            height={59}
            className="w-16 h-auto -mt-12"
            unoptimized
          />
          <h2 className="font-firenight text-[18px] leading-none text-[#FFEED5] tracking-wider mt-2">
            ХАРАКТЕРИСТИКИ
          </h2>
        </div>

        {/* Stats list */}
        <div className="flex flex-col flex-1 justify-around">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="grid grid-cols-[32px_1fr_18px_1fr] items-center gap-3 border-b border-white/5 pb-2 last:border-b-0"
            >
              <span className="flex justify-center">
                <Image
                  src={stat.icon}
                  alt=""
                  width={stat.iconWidth}
                  height={stat.iconHeight}
                  unoptimized
                />
              </span>
              <span className="font-firenight text-[20px] text-[#FCE9CE] leading-none text-center">
                {stat.value}
              </span>
              <span className="flex justify-center">
                {stat.showStar && (
                  <Image
                    src={`${ASSET}/Star 1.svg`}
                    alt=""
                    width={10}
                    height={9}
                    unoptimized
                  />
                )}
              </span>
              <span className="font-jost text-[13px] text-[#ECECEC]/80 text-left">
                {stat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ОСОБЕННОСТИ section */}
      <div className="w-75 flex flex-col gap-1">
        <h3 className="font-firenight text-[14px] tracking-wider text-[#FFEED5] mb-1">
          ОСОБЕННОСТИ
        </h3>
        <p className="font-jost text-[12px] text-[#ECECEC]/80">
          <span className="text-[#FFEED5]">Оружие:</span> Кинжал, Посох
        </p>
        <p className="font-jost text-[12px] text-[#ECECEC]/80">
          <span className="text-[#FFEED5]">Броня:</span> Без брони
        </p>
        <p className="font-jost text-[12px] text-[#ECECEC]/80">
          <span className="text-[#FFEED5]">Навык:</span> происхождение чародея
        </p>
      </div>
