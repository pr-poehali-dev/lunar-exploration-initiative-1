export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="/images/woman-horse.jpg"
          alt="Woman on horse in countryside"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Ключевые направления эпохи</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Экзистенциализм, магический реализм, постмодернизм — каждое течение стало ответом на вызовы времени и перевернуло представление о том, каким может быть роман.
        </p>
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-3 text-neutral-700">
            <span className="w-1 h-6 bg-neutral-900 inline-block"></span>
            <span className="text-sm uppercase tracking-wide">Экзистенциализм — Камю, Сартр, Симона де Бовуар</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-700">
            <span className="w-1 h-6 bg-neutral-900 inline-block"></span>
            <span className="text-sm uppercase tracking-wide">Магический реализм — Маркес, Борхес, Астуриас</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-700">
            <span className="w-1 h-6 bg-neutral-900 inline-block"></span>
            <span className="text-sm uppercase tracking-wide">Постмодернизм — Эко, Пинчон, Борроуз</span>
          </div>
        </div>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Изучить направления
        </button>
      </div>
    </div>
  );
}