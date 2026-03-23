import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 0,
    type: "title",
    bg: "#1a1a2e",
    accent: "#c9a96e",
  },
  {
    id: 1,
    type: "overview",
    bg: "#16213e",
    accent: "#e8d5b7",
  },
  {
    id: 2,
    type: "existentialism",
    bg: "#1a1a1a",
    accent: "#d4a853",
  },
  {
    id: 3,
    type: "camus",
    bg: "#0f0f1a",
    accent: "#c9a96e",
  },
  {
    id: 4,
    type: "magic-realism",
    bg: "#1a1a0a",
    accent: "#8fbc8f",
  },
  {
    id: 5,
    type: "marquez",
    bg: "#0a1a0a",
    accent: "#7daa7d",
  },
  {
    id: 6,
    type: "postmodernism",
    bg: "#1a0a0a",
    accent: "#c97070",
  },
  {
    id: 7,
    type: "russia",
    bg: "#0d1a2e",
    accent: "#7aa3c9",
  },
  {
    id: 8,
    type: "solzhenitsyn",
    bg: "#0a1220",
    accent: "#6b9ac4",
  },
  {
    id: 9,
    type: "beat",
    bg: "#1a0f00",
    accent: "#d4916a",
  },
  {
    id: 10,
    type: "conclusion",
    bg: "#0d0d0d",
    accent: "#c9a96e",
  },
];

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: slide.bg, transition: "background 0.6s ease" }}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex flex-col"
        >
          <SlideRenderer slide={slide} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-20"
        style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
        disabled={current === 0}
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-20"
        style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
        disabled={current === slides.length - 1}
      >
        <Icon name="ChevronRight" size={24} />
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? slide.accent : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Slide number */}
      <div className="absolute top-4 right-6 z-50 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}

function SlideRenderer({ slide }: { slide: (typeof slides)[0] }) {
  const { type, accent } = slide;

  if (type === "title") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px)"
        }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center relative z-10 max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: accent, opacity: 0.8 }}>
            Презентация по литературе
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
          >
            Литература второй половины
            <span style={{ color: accent }}> XX века</span>
          </h1>
          <div className="w-24 h-0.5 mx-auto mb-8" style={{ background: accent }} />
          <p className="text-lg md:text-xl mb-12" style={{ color: "rgba(255,255,255,0.6)" }}>
            1950 — 2000 · Эпоха перемен, поиска и великих голосов
          </p>
          <div
            className="inline-block px-8 py-4 rounded-sm"
            style={{ border: `1px solid ${accent}`, background: "rgba(255,255,255,0.03)" }}
          >
            <p className="text-sm uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Выполнил</p>
            <p className="text-xl font-semibold" style={{ color: accent, fontFamily: "'Playfair Display', serif" }}>
              Дидковский Даниил
            </p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Ученик 11 класса</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "overview") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Обзор темы</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Контекст эпохи
          </h2>
          <div className="w-16 h-0.5 mb-10" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Globe", title: "Исторический фон", text: "Холодная война, деколонизация, студенческие революции 1968 года, распад колониальных империй" },
              { icon: "BookOpen", title: "Литературный взрыв", text: "Невиданный расцвет — от латиноамериканского бума до советской лагерной прозы и европейского постмодернизма" },
              { icon: "Lightbulb", title: "Новые смыслы", text: "Поиск идентичности, кризис гуманизма, язык как инструмент власти и сопротивления" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="p-6 rounded-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Icon name={item.icon} size={28} className="mb-4" style={{ color: accent }} />
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "existentialism") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Направление I</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Экзистенциализм
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                Философско-литературное течение, ставящее в центр существование человека, его свободу и ответственность перед лицом абсурдного мира.
              </p>
              <div className="space-y-3">
                {["Свобода как бремя и дар", "Абсурд и поиск смысла", "Человек перед лицом смерти", "Подлинность существования"].map((point, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Ключевые авторы</p>
              {[
                { name: "Жан-Поль Сартр", work: "«Тошнота», «Бытие и ничто»", country: "Франция" },
                { name: "Альбер Камю", work: "«Посторонний», «Чума»", country: "Франция-Алжир" },
                { name: "Симона де Бовуар", work: "«Второй пол», «Мандарины»", country: "Франция" },
              ].map((author, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }}
                  className="p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="font-semibold text-white mb-1">{author.name}</p>
                  <p className="text-xs mb-1" style={{ color: accent }}>{author.work}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{author.country}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "camus") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Альбер Камю · 1913–1960</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Философия абсурда
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <blockquote className="text-xl md:text-2xl italic mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Playfair Display', serif", borderLeft: `3px solid ${accent}`, paddingLeft: "1.5rem" }}>
                «Нужно представить Сизифа счастливым»
              </blockquote>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                Камю утверждал: жизнь абсурдна, но именно это делает каждый момент бесконечно ценным. Человек должен бунтовать против бессмыслицы, не теряя любви к жизни.
              </p>
              <div className="p-4 rounded-sm" style={{ background: `rgba(${parseInt(accent.slice(1,3),16)},${parseInt(accent.slice(3,5),16)},${parseInt(accent.slice(5,7),16)},0.1)`, border: `1px solid ${accent}40` }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>Нобелевская премия 1957</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>«За огромный вклад в литературу, освещающий проблемы человеческой совести»</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "«Посторонний» (1942)", text: "Мерсо убивает человека и не испытывает раскаяния. Роман-манифест об отчуждении и абсурде." },
                { title: "«Чума» (1947)", text: "Аллегория нацизма и человеческой солидарности перед лицом неизбежного зла." },
                { title: "«Миф о Сизифе» (1942)", text: "Философское эссе — главное теоретическое высказывание об абсурде." },
              ].map((book, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12 }}
                  className="p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="font-semibold mb-2" style={{ color: accent }}>{book.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{book.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "magic-realism") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Направление II</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Магический реализм
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                Литературный стиль, в котором магические элементы органично вплетены в реальную жизнь. Возник в Латинской Америке как отражение многослойной культуры континента.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Реальное + фантастическое", desc: "Чудеса воспринимаются как обыденное" },
                  { label: "Политический подтекст", desc: "Критика диктатур и колониализма" },
                  { label: "Цикличность времени", desc: "Прошлое, настоящее и будущее — едины" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.12 }}
                    className="flex gap-4 items-start">
                    <div className="w-0.5 self-stretch flex-shrink-0 mt-1" style={{ background: accent }} />
                    <div>
                      <p className="font-semibold text-white text-sm">{item.label}</p>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Латиноамериканский бум</p>
              <div className="space-y-3">
                {[
                  { name: "Габриэль Гарсиа Маркес", years: "1927–2014", country: "Колумбия" },
                  { name: "Хорхе Луис Борхес", years: "1899–1986", country: "Аргентина" },
                  { name: "Хулио Кортасар", years: "1914–1984", country: "Аргентина" },
                  { name: "Исабель Альенде", years: "р. 1942", country: "Чили" },
                ].map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex justify-between items-center py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <div>
                      <p className="text-white font-medium text-sm">{a.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{a.country}</p>
                    </div>
                    <span className="text-xs" style={{ color: accent }}>{a.years}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "marquez") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Гарсиа Маркес · 1927–2014</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Сто лет одиночества
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <blockquote className="text-lg md:text-xl italic mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Playfair Display', serif", borderLeft: `3px solid ${accent}`, paddingLeft: "1.5rem" }}>
                «Всё, что знаешь с детства, и есть твоя родина»
              </blockquote>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                «Сто лет одиночества» (1967) — семейная сага рода Буэндиа в вымышленном Макондо. Роман охватывает сто лет истории, отражая судьбу всей Латинской Америки: войны, революции, любовь и обречённость.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "50+", desc: "языков перевода" },
                  { num: "50 млн", desc: "проданных копий" },
                  { num: "1982", desc: "Нобелевская премия" },
                  { num: "1967", desc: "год издания" },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-4 text-center rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-2xl font-bold mb-1" style={{ color: accent }}>{stat.num}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Другие произведения</p>
              {[
                "«Любовь во время чумы» (1985)",
                "«Полковнику никто не пишет» (1961)",
                "«Осень патриарха» (1975)",
                "«Хроника объявленной смерти» (1981)",
              ].map((book, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="py-3 px-4 rounded-sm text-sm" style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {book}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "postmodernism") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Направление III</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Постмодернизм
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                Постмодернизм отверг большие нарративы и единую истину. Текст стал игрой, реальность — симулякром, а автор — умер. Литература превратилась в бесконечную цитату самой себя.
              </p>
              <div className="space-y-3">
                {[
                  { term: "Интертекстуальность", def: "Текст соткан из цитат других текстов" },
                  { term: "Метафикция", def: "Произведение осознаёт себя как литературу" },
                  { term: "Ирония и пастиш", def: "Игра с жанрами и стилями прошлого" },
                  { term: "Нелинейность", def: "Разрушение традиционной структуры" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.1 }}
                    className="flex gap-3 p-3 rounded-sm" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="font-semibold text-sm flex-shrink-0" style={{ color: accent }}>{item.term}:</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{item.def}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Главные авторы</p>
              <div className="space-y-4">
                {[
                  { name: "Умберто Эко", works: "«Имя розы», «Маятник Фуко»", flag: "🇮🇹" },
                  { name: "Томас Пинчон", works: "«Радуга тяготения», «V.»", flag: "🇺🇸" },
                  { name: "Дон Делилло", works: "«Белый шум», «Подземный мир»", flag: "🇺🇸" },
                  { name: "Милан Кундера", works: "«Невыносимая лёгкость бытия»", flag: "🇨🇿" },
                  { name: "Салман Рушди", works: "«Дети полуночи»", flag: "🇮🇳" },
                ].map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <span className="text-xl">{a.flag}</span>
                    <div>
                      <p className="text-white font-medium text-sm">{a.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{a.works}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "russia") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Особый раздел</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Русская литература
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                era: "Оттепель (1953–1968)",
                desc: "После смерти Сталина — краткая свобода. Появились «Один день Ивана Денисовича» Солженицына, лирика Евтушенко и Ахмадулиной.",
                authors: ["Солженицын", "Евтушенко", "Окуджава"],
              },
              {
                era: "Самиздат и андеграунд",
                desc: "Запрещённые тексты распространялись вручную. Это была параллельная, живая литература — честная и свободная.",
                authors: ["Венедикт Ерофеев", "Бродский", "Синявский"],
              },
              {
                era: "Деревенская проза",
                desc: "Возвращение к корням, к традиционной России. Тоска по утраченной деревне и нравственным ориентирам.",
                authors: ["Распутин", "Шукшин", "Астафьев"],
              },
            ].map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
                className="p-6 rounded-sm flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{block.era}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.55)" }}>{block.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {block.authors.map((a) => (
                    <span key={a} className="text-xs px-2 py-1 rounded-sm" style={{ background: `${accent}20`, color: accent }}>{a}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "solzhenitsyn") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Александр Солженицын · 1918–2008</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Свидетель эпохи
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <blockquote className="text-lg italic mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Playfair Display', serif", borderLeft: `3px solid ${accent}`, paddingLeft: "1.5rem" }}>
                «Не верь, не бойся, не проси»
              </blockquote>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                Солженицын провёл 8 лет в советских лагерях. Его произведения стали документом эпохи и моральным приговором тоталитаризму. В 1970 году получил Нобелевскую премию, а в 1974-м был выслан из СССР.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { year: "1962", event: "Публикация «Ивана Денисовича»" },
                  { year: "1970", event: "Нобелевская премия" },
                  { year: "1973", event: "«Архипелаг ГУЛАГ»" },
                  { year: "1974", event: "Высылка из СССР" },
                ].map((ev, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-3 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="font-bold mb-1" style={{ color: accent }}>{ev.year}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{ev.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Главные произведения</p>
              {[
                { title: "«Один день Ивана Денисовича»", year: "1962", desc: "Один день в лагере — как метафора всей системы" },
                { title: "«Архипелаг ГУЛАГ»", year: "1973", desc: "Монументальное исследование лагерной системы СССР" },
                { title: "«В круге первом»", year: "1968", desc: "О советских учёных, работавших на спецслужбы" },
                { title: "«Раковый корпус»", year: "1968", desc: "Аллегория больного общества" },
              ].map((book, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }}
                  className="p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-white text-sm">{book.title}</p>
                    <span className="text-xs flex-shrink-0 ml-2" style={{ color: accent }}>{book.year}</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{book.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "beat") {
    return (
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>Направление IV · США</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Битники и контркультура
          </h2>
          <div className="w-16 h-0.5 mb-8" style={{ background: accent }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                Бит-поколение 1950-х бросило вызов потребительской Америке. Джаз, дорога, наркотики, дзен — против корпораций, войны и лицемерия. Они перевернули американскую прозу и поэзию.
              </p>
              <div className="space-y-4">
                {[
                  { name: "Джек Керуак", works: "«На дороге» (1957)", desc: "Гимн свободе и скитаниям" },
                  { name: "Аллен Гинзберг", works: "«Вопль» (1956)", desc: "Поэтический манифест бит-поколения" },
                  { name: "Уильям Берроуз", works: "«Голый завтрак» (1959)", desc: "Эксперимент с сознанием и языком" },
                ].map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.12 }}
                    className="p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold text-white text-sm">{a.name}</p>
                      <p className="text-xs" style={{ color: accent }}>{a.works}</p>
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{a.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Влияние на культуру</p>
              <div className="space-y-3">
                {[
                  { icon: "Music", text: "Вдохновили Боба Дилана и рок-революцию 60-х" },
                  { icon: "Film", text: "Повлияли на Голливуд «Новой волны»" },
                  { icon: "Zap", text: "Предвосхитили движение хиппи и контркультуру" },
                  { icon: "PenTool", text: "Открыли поток сознания как литературный приём" },
                  { icon: "Globe", text: "Распространились в Европе через переводы" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <Icon name={item.icon} size={16} style={{ color: accent, flexShrink: 0 }} />
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "conclusion") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-4xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: accent }}>Заключение</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Наследие эпохи
          </h2>
          <div className="w-24 h-0.5 mx-auto mb-8" style={{ background: accent }} />
          <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
            Литература второй половины XX века — это не просто тексты. Это ответ на катастрофы истории, поиск человека в мире без опор, голос тех, кого пытались заглушить. Эти книги изменили то, как мы думаем о себе и о мире.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Нобелевских премий", value: "25+" },
              { label: "Новых направлений", value: "4+" },
              { label: "Великих романов", value: "∞" },
              { label: "Лет влияния", value: "50+" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                className="p-4 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-3xl font-bold mb-1" style={{ color: accent, fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="p-5 rounded-sm inline-block" style={{ border: `1px solid ${accent}40`, background: "rgba(255,255,255,0.02)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Презентацию подготовил</p>
            <p className="text-lg font-semibold mt-1" style={{ color: accent, fontFamily: "'Playfair Display', serif" }}>Дидковский Даниил · 11 класс</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}