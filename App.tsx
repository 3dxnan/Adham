import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Skull,
  MessageSquare,
  UserX,
  ShieldCheck,
  Star,
  Gift,
  EyeOff,
  RotateCcw,
  Clock,
  MapPin,
} from "lucide-react";

// Component لتأثير الكتابة
const TypewriterText = ({ text }: { text: string }) => {
  const chars = text.split("");
  return (
    <motion.div
      style={{
        color: "#FFD700",
        fontWeight: "bold",
        fontSize: "22px",
        marginTop: "15px",
        textAlign: "center",
        textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.08 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const App = () => {
  const [step, setStep] = useState(-1);
  const [adhamMemory, setAdhamMemory] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [trickStep, setTrickStep] = useState(0);
  const [showTrickButtons, setShowTrickButtons] = useState(true);
  const [isBlurred, setIsBlurred] = useState(true);
  const [giftOpened, setGiftOpened] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [skipCount, setSkipCount] = useState(0);

  const finalPlayerRef = useRef<HTMLVideoElement>(null);

  // استخدام UseRef للـ Audio لضمان استقرارها
  const glowSfx = useRef(
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
    )
  );
  const prankAudio = useRef(
    new Audio(
      "https://res.cloudinary.com/dj36afflz/video/upload/v1770741008/%D8%AE%D9%87%D9%87%D9%87%D9%87%D9%87%D9%87_yq6dc1.mp3"
    )
  );

  const calculateFriendshipDuration = () => {
    const startDate = new Date("2019-02-04");
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  };

  const duration = calculateFriendshipDuration();

  const lyricsData = [
    { time: 2, text: "I don't know what to do. Don't know what to do." },
    { time: 6, text: "You can act like a man." },
    { time: 8, text: "what's the matter with you?" },
    {
      time: 11,
      text: "is this how you turn a Hollywood finocchio who cries like a women?",
    },
    { time: 16, text: "what can I do? what can I do?" },
    { time: 19, text: "Listen" },
    { time: 20, text: "يااه طول الليل، مش حاسس شئ" },
    { time: 23, text: "كنت فاهم جولي ليه" },
    { time: 24, text: "برضه اديت" },
    { time: 25, text: "ما مينفعش نبقى زمايل وتعوزو جنيه" },
    { time: 28, text: "انتو مفكريني خاين ولا ايه؟" },
    { time: 31, text: "بتقولو بتضحو عشان مين؟" },
    { time: 32, text: "هه، عشاني؟" },
    { time: 33, text: "انتو بتطسو يا بني ادمين" },
    { time: 35, text: "انتوا كلابي" },
    { time: 36, text: "بقدر احسسهم بالحب من غير ما اقول بحبهم" },
    { time: 39, text: "وممش بقدر احس بحبهم مهما قالو بيحبوني" },
    { time: 42, text: "انا شوفت منكو كل ده وعديت والله" },
    { time: 44, text: "مرضتش ارده بمثله عشان اتربيت والله" },
    { time: 46, text: "بتستكتروها عليا ليه؟ ما انا شقيت والله" },
    { time: 49, text: "يا شوية بهايم كنت عايزلكو الخير والله" },
    { time: 52, text: "لا مؤاخذه احنا رجاله حره، مش شبه امك" },
    { time: 55, text: "فلوسكو تحرم على بطوننا، سيبناها وغورنا" },
    { time: 57, text: "ورب الكون احنا عالسنه، يا باشا ابصملك" },
    { time: 60, text: "مش عايزين منكو حاجه ادعولنا اما نروح التربه" },
    { time: 63, text: "لا تفكروني ببلعها اما تيجو بطبل" },
    { time: 66, text: "ده انتو هتعدموني العافيه لو كان ليكم ضهر" },
    { time: 68, text: "بنده عالكلاب يقربو اما اجيب الطفح" },
    { time: 71, text: "هما ميعرفوش يخرفو عشان ليهم اب" },
    { time: 74, text: "خلق ولاد زباله شغاله في الحلق حوش" },
    { time: 76, text: "سكة السلامه نتفارق لو منضفوش" },
    { time: 79, text: "انتو هتخيبو ولا ايه مين دول اللي يكحلو رموشي؟" },
    { time: 82, text: "انا هسيبلكو الموقع في رساله ابقو عدو نشوف" },
    { time: 85, text: "طول الليل، مش حاسس شئ" },
    { time: 87, text: "كنت فاهم جولي ليه، وبرضو اديت" },
    { time: 89, text: "ما مينفعش نبقى زمايل وتعوزو جنيه" },
    { time: 92, text: "انتو مفكريني خاين ولا ايه؟" },
    { time: 95, text: "بتقولو بتضحو عشان مين؟" },
    { time: 97, text: "هه، عشاني؟" },
    { time: 98, text: "انتو بتطسو يا بني ادمين" },
    { time: 99, text: "انتو كلابي" },
    { time: 100, text: "بقدر احسسهم بالحب من غير ما اقول بحبهم" },
    { time: 103, text: "ومش بقدر احس حبهم مهما قالو بيحبوني" },
  ];

  const totalSteps = 17;
  const progress = ((step + 1) / totalSteps) * 100;

  useEffect(() => {
    if (step >= 0) glowSfx.current.play().catch(() => {});
    if (step === 14) setSkipCount(0);
  }, [step]);

  const handleTimeUpdate = () => {
    if (finalPlayerRef.current) {
      const currentTime = finalPlayerRef.current.currentTime;
      setVideoTime(currentTime);
      const triggers = [26, 40, 46, 49, 56];
      if (triggers.some((t) => Math.abs(currentTime - t) < 0.2)) {
        glowSfx.current.play().catch(() => {});
      }
    }
  };

  const getCurrentLyric = () => {
    const lyric = [...lyricsData].reverse().find((l) => videoTime >= l.time);
    return lyric ? lyric.text : "";
  };

  const handlePrankSound = () => {
    prankAudio.current.volume = 1.0;
    prankAudio.current.currentTime = 0;
    prankAudio.current.play().catch(() => {});
  };

  const handleSkipLogic = () => {
    if (skipCount < 5) {
      setSkipCount(skipCount + 1);
    } else {
      prankAudio.current.pause();
      setStep(15);
    }
  };

  // Styles
  const glassStyle: React.CSSProperties = {
    background: "rgba(10, 10, 10, 0.9)",
    backdropFilter: "blur(25px)",
    borderRadius: "30px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    padding: "40px 25px",
    textAlign: "center",
    maxWidth: "450px",
    width: "90%",
    color: "#ffffff",
    position: "relative",
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.05)",
  };

  const btnStyle: React.CSSProperties = {
    background: "#ffffff",
    color: "#000000",
    border: "none",
    padding: "16px 20px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "15px",
    width: "100%",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {step >= 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "rgba(255,255,255,0.1)",
            zIndex: 100,
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              height: "100%",
              background: "#fff",
              boxShadow: "0 0 15px #fff",
            }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05 }}
          style={glassStyle}
        >
          {step === -1 && (
            <div>
              <ShieldCheck
                size={50}
                style={{ marginBottom: "20px", margin: "0 auto" }}
              />
              <h1 style={{ fontSize: "26px", fontWeight: "900" }}>
                رأس مال الجدعنة
              </h1>
              <p style={{ color: "#aaa", margin: "15px 0" }}>
                الأرشيف ده عشان يفكرك بمواقف وذكريات عدينا فيها سوا..
              </p>
              <button onClick={() => setStep(0)} style={btnStyle}>
                افتح الأرشيف
              </button>
            </div>
          )}

          {step === 0 && (
            <div>
              <img
                src="https://res.cloudinary.com/dj36afflz/image/upload/v1770645824/IMG-20190204-WA0012_xzlyyy.jpg"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  marginBottom: "20px",
                }}
              />
              <h2>فاكر اول مرة قعدنا مع بعض؟</h2>
              <button onClick={() => setStep(1)} style={btnStyle}>
                ايوا يعم فاكر
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <Skull
                size={60}
                style={{ marginBottom: "20px", margin: "0 auto" }}
              />
              <h2>لو انا موت هتكتئب؟</h2>
              <button onClick={() => setStep(2)} style={btnStyle}>
                هموت معاك يسطا
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <MapPin
                size={60}
                color="#ff4d4d"
                style={{ marginBottom: "20px", margin: "0 auto" }}
              />
              <h2 style={{ fontSize: "22px" }}>
                لو انا فعلا يسطا رجعت سوريا وبكلمك بجد ممكن تجيلي او حابب تقول
                ايه؟
              </h2>
              <button
                onClick={() => setStep(3)}
                style={{ ...btnStyle, background: "#ff4d4d", color: "#fff" }}
              >
                هزعل اوي يسطا!
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <img
                src="https://res.cloudinary.com/dj36afflz/image/upload/v1770575134/558865818_18400126855138068_5228198888365262855_n_lryjdl.jpg"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  marginBottom: "15px",
                }}
              />
              <h2>الصورة دي بنظرك حلوة؟؟</h2>
              {showTrickButtons ? (
                <div>
                  <button
                    onClick={() => (trickStep === 3 ? setStep(4) : null)}
                    style={btnStyle}
                  >
                    {trickStep === 3
                      ? "طيب ارجع للاجابة الاولى يلا"
                      : "معاك حق الصورة خرا فعلا"}
                  </button>
                  {trickStep !== 3 && (
                    <button
                      onClick={() => {
                        if (trickStep === 0) setTrickStep(1);
                        else {
                          setTrickStep(2);
                          setShowTrickButtons(false);
                          setTimeout(() => {
                            setTrickStep(3);
                            setShowTrickButtons(true);
                          }, 2000);
                        }
                      }}
                      style={{
                        ...btnStyle,
                        background: "none",
                        color: "#fff",
                        border: "1px solid #fff",
                      }}
                    >
                      {trickStep === 0 ? "فشخ بجد" : "متااااكدددد يسطا؟"}
                    </button>
                  )}
                </div>
              ) : (
                <p
                  style={{
                    color: "#ff4d4d",
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  بس انا شايف غير كدا...
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <img
                src="https://res.cloudinary.com/dj36afflz/image/upload/v1770646416/V5wYIFgQVNR8BQxsHB9-TIa8FKRy0j0vtSI2BwNFe2I_go4lht.gif"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  marginBottom: "20px",
                }}
              />
              <h2 style={{ fontSize: "20px" }}>(اتمنى تنجز من الموضوع دا)</h2>
              <button onClick={() => setStep(5)} style={btnStyle}>
                مختلهاش تضرب في دماغي يا عدنان
              </button>
            </div>
          )}

          {step === 5 && (
            <div>
              <MessageSquare
                size={50}
                style={{ marginBottom: "20px", margin: "0 auto" }}
              />
              <h2>اي اكتر موقف فاكره لينا ومعلق معاك؟</h2>
              <textarea
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #333",
                  borderRadius: "15px",
                  padding: "15px",
                  color: "#fff",
                  marginTop: "15px",
                }}
                rows={3}
                value={adhamMemory}
                onChange={(e) => setAdhamMemory(e.target.value)}
                placeholder="اكتب الموقف..."
              />
              <button
                onClick={() => setStep(6)}
                disabled={!adhamMemory}
                style={{ ...btnStyle, opacity: adhamMemory ? 1 : 0.5 }}
              >
                تفتكر هنساه؟
              </button>
            </div>
          )}

          {step === 6 && (
            <div>
              <UserX
                size={50}
                style={{ marginBottom: "20px", margin: "0 auto" }}
              />
              <h2>اوقات يسطا بتقول افيهات بتحسسني بتقل دمك</h2>
              <video
                autoPlay
                loop
                playsInline
                style={{ width: "100%", borderRadius: "15px" }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770574748/%D8%AA%D8%A7%D9%85%D8%B1_%D8%A7%D9%84%D8%AC%D9%8A%D8%A7%D8%B1_%D8%AA%D8%B5%D8%AF%D9%82_%D8%A7%D9%86%D8%AA_%D8%B9%D9%8A%D9%84_%D8%A8%D8%B6%D8%A7%D9%86_gnj4e3.mp4"
                  type="video/mp4"
                />
              </video>
              <button
                onClick={() =>
                  clickCount < 3 ? setClickCount(clickCount + 1) : setStep(7)
                }
                style={btnStyle}
              >
                انا كدا كدا بضان ({clickCount}/4)
              </button>
            </div>
          )}

          {step === 7 && (
            <div>
              <video
                autoPlay
                loop
                playsInline
                style={{ width: "100%", borderRadius: "15px" }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770645825/VID-20240516-WA0025_iagrhn.mp4"
                  type="video/mp4"
                />
              </video>
              <h2 style={{ fontSize: "18px", marginTop: "15px" }}>
                (يعني مثلا زي هنا وانت فاكر انها تضحك وعامل نفسك جي اي اف)
              </h2>
              <button onClick={() => setStep(8)} style={btnStyle}>
                معاك حق بس انت ضحكت!
              </button>
            </div>
          )}

          {step === 8 && (
            <div>
              <video
                autoPlay
                loop
                playsInline
                style={{ width: "100%", borderRadius: "15px" }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770645838/20231126_153448_t7bnvu.mp4"
                  type="video/mp4"
                />
              </video>
              <h2 style={{ fontSize: "18px", marginTop: "15px" }}>
                (من ارشيف 2023 وكنت اتمنى تلعب معاهم ودي تجارب ضيعناها سوا)
              </h2>
              <button onClick={() => setStep(9)} style={btnStyle}>
                انا شرموط فعلا (انت مش انا)
              </button>
            </div>
          )}

          {step === 9 && (
            <div>
              <video
                autoPlay
                loop
                playsInline
                style={{
                  height: "400px",
                  width: "auto",
                  borderRadius: "15px",
                  margin: "0 auto",
                }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770645836/99_16_b2d46k.mp4"
                  type="video/mp4"
                />
              </video>
              <h2 style={{ fontSize: "16px", marginTop: "15px" }}>
                (حاجة مثلا زي كدا متلقهاش غير عندي وفي ملفات ابستين)
              </h2>
              <button onClick={() => setStep(10)} style={btnStyle}>
                كنت بتقول ايه؟؟
              </button>
            </div>
          )}

          {step === 10 && (
            <div>
              <video
                autoPlay
                loop
                playsInline
                style={{ width: "100%", borderRadius: "15px" }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770645839/20221121_232339_wzgf2i.mp4"
                  type="video/mp4"
                />
              </video>
              <h2 style={{ fontSize: "18px", marginTop: "15px" }}>
                (لما تقفل بتكون كتلة بضان)
              </h2>
              <button onClick={() => setStep(11)} style={btnStyle}>
                هعديها بمزاجي
              </button>
            </div>
          )}

          {step === 11 && (
            <div>
              <video
                autoPlay
                loop
                playsInline
                style={{ width: "100%", borderRadius: "15px" }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770645823/VID_54081003_012752_749_x4kihx.mp4"
                  type="video/mp4"
                />
              </video>
              <p style={{ fontSize: "18px", margin: "15px 0" }}>
                برضوا من الحاجات اللي كنت معاك فيها وجربناها بس عايز اعرف وانت
                بتتفرج على الفيديو دا شعورك ايه دلوقتي؟
              </p>
              <button
                onClick={() => setStep(12)}
                style={{ ...btnStyle, fontSize: "13px" }}
              >
                1- انا راضي دلوقتي جدا وحاسس برضى
              </button>
              <button
                onClick={() => setStep(12)}
                style={{ ...btnStyle, fontSize: "13px" }}
              >
                2- اه كان نفسي اكمل
              </button>
              <button
                onClick={() => setStep(12)}
                style={{ ...btnStyle, fontSize: "13px" }}
              >
                3- جاوب انت لو حابب
              </button>
            </div>
          )}

          {step === 12 && (
            <div>
              <h2
                style={{
                  fontSize: "16px",
                  marginBottom: "15px",
                  color: "#ff4d4d",
                }}
              >
                حاول متخليش حد جمبك لان صورة دي حصرية
              </h2>
              <div
                style={{
                  position: "relative",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dj36afflz/image/upload/v1770648146/20221113_184938_cy7bcw.jpg"
                  style={{
                    width: "100%",
                    filter: isBlurred ? "blur(25px)" : "none",
                    transition: "0.5s",
                  }}
                />
                {isBlurred && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <EyeOff size={40} style={{ marginBottom: "10px" }} />
                    <button
                      onClick={() => setIsBlurred(false)}
                      style={{
                        ...btnStyle,
                        width: "auto",
                        padding: "10px 20px",
                      }}
                    >
                      عرض الصورة
                    </button>
                  </div>
                )}
              </div>
              {!isBlurred && (
                <button onClick={() => setStep(13)} style={btnStyle}>
                  يدين اممممممممممممممي يعدنان
                </button>
              )}
            </div>
          )}

          {step === 13 && (
            <div>
              <video
                autoPlay
                loop
                playsInline
                style={{ width: "100%", borderRadius: "15px" }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770648987/%D9%83%D9%84_%D8%B3%D9%86%D9%87_%D9%88%D8%A3%D9%85%D9%87_%D9%85%D8%AD%D9%85%D8%AF_%D8%A8%D8%AE%D9%8A%D8%B1_%D9%88%D8%B3%D8%B9%D8%A7%D8%AF%D9%87_%D9%88%D8%A8%D8%B9%D9%88%D8%AF%D8%A7%D9%87_%D8%A7%D9%84%D8%A3%D9%8A%D8%A7%D9%85_%EF%B8%8F_%D8%B1%D9%85%D8%B6%D8%A7%D9%86_%D9%83%D8%B1%D9%8A%D9%85_%D8%AA%D9%88%D8%A7%D9%85_%D9%85%D8%B5%D8%B1_%D8%B4%D9%87%D8%A7%D8%A8_%D9%88%D8%B4%D8%A7%D9%87%D8%B1_%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D9%85_%D8%A7%D9%84%D9%86%D8%A8%D8%B7%D8%B4%D9%89_oiwchn.mp4"
                  type="video/mp4"
                />
              </video>
              <p style={{ marginTop: "15px" }}>
                كل سنة وانت طيب ورمضان كريم واتمنى بجد تلتزم في رمضان وربنا
                يهديك يارب انا وانت
              </p>
              {!giftOpened ? (
                <div
                  onClick={() => setGiftOpened(true)}
                  style={{ cursor: "pointer", marginTop: "20px" }}
                >
                  <Gift
                    size={50}
                    color="#FFD700"
                    style={{ margin: "0 auto" }}
                  />
                  <p style={{ color: "#FFD700", fontSize: "12px" }}>
                    دوس ع الهدية
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    marginTop: "20px",
                    padding: "10px",
                    border: "1px dashed #FFD700",
                    borderRadius: "10px",
                  }}
                >
                  <h3 style={{ color: "#FFD700" }}>قلب اخوووووووك ❤️</h3>
                  <button
                    onClick={() => setStep(14)}
                    style={{ ...btnStyle, background: "#FFD700" }}
                  >
                    كمل للأخير
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {step === 14 && (
            <div
              style={{
                padding: "20px",
                background: "rgba(255, 0, 0, 0.1)",
                borderRadius: "20px",
                border: "1px solid rgba(255,0,0,0.3)",
              }}
            >
              <p
                style={{
                  color: "#ff4d4d",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                (اوعا تدوس هنا يسطا بلاش عشان مفيش حاجة .. هتتخطى ولا تدوس؟)
              </p>
              <button
                onClick={handlePrankSound}
                style={{ ...btnStyle, background: "#ff4d4d", color: "#fff" }}
              >
                هتدوس ولا تتخطى؟
              </button>
              <button
                onClick={handleSkipLogic}
                style={{
                  ...btnStyle,
                  background: "none",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
              >
                {skipCount === 0 ? "تخطي" : `باقي ${6 - skipCount} ضغطات`}
              </button>
            </div>
          )}

          {step === 15 && (
            <div>
              <Clock
                size={50}
                color="#FFD700"
                style={{ marginBottom: "20px", margin: "0 auto" }}
              />
              <h2
                style={{
                  color: "#FFD700",
                  fontSize: "24px",
                  fontWeight: "900",
                }}
              >
                عداد صحوبيتنا
              </h2>
              <p style={{ color: "#aaa", marginBottom: "25px" }}>
                من أول يوم عرفتك فيه في 4 فبراير 2019
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,215,0,0.1)",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "1px solid #FFD700",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#FFD700",
                    }}
                  >
                    {duration.years}
                  </div>
                  <div style={{ fontSize: "12px" }}>سنين</div>
                </div>
                <div
                  style={{
                    background: "rgba(255,215,0,0.1)",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "1px solid #FFD700",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#FFD700",
                    }}
                  >
                    {duration.months}
                  </div>
                  <div style={{ fontSize: "12px" }}>شهور</div>
                </div>
                <div
                  style={{
                    background: "rgba(255,215,0,0.1)",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "1px solid #FFD700",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#FFD700",
                    }}
                  >
                    {duration.days}
                  </div>
                  <div style={{ fontSize: "12px" }}>أيام</div>
                </div>
              </div>
              <p style={{ marginTop: "25px", fontStyle: "italic" }}>
                "العمر بيعدي بس الجدعنة بتفضل"
              </p>
              <button
                onClick={() => setStep(16)}
                style={{ ...btnStyle, background: "#FFD700" }}
              >
                شوف الفيديو الأخير ❤️
              </button>
            </div>
          )}

          {step === 16 && (
            <div>
              <video
                autoPlay
                loop
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  border: "2px solid #FFD700",
                }}
              >
                <source
                  src="https://res.cloudinary.com/dj36afflz/video/upload/v1770645825/VID_64550815_235143_882_fvqp5f.mp4"
                  type="video/mp4"
                />
              </video>
              <h2 style={{ fontSize: "18px", marginTop: "15px" }}>
                (طيب ودلوقتي واحنا في 2026 كمان سنة تشوف نفسك عملت ايه فعلا؟)
              </h2>
              <button onClick={() => setStep(17)} style={btnStyle}>
                آخر محطة ❤️
              </button>
            </div>
          )}

          {step === 17 && (
            <div style={{ width: "100%" }}>
              <motion.h3
                animate={{
                  opacity: [0.6, 1, 0.6],
                  textShadow: ["0 0 5px #fff", "0 0 20px #fff", "0 0 5px #fff"],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ color: "#fff", fontSize: "25px" }}
              >
                (هتلاقي هنا في رسايل مخصوص ليك)
              </motion.h3>
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#000",
                }}
              >
                <video
                  ref={finalPlayerRef}
                  onTimeUpdate={handleTimeUpdate}
                  controls
                  style={{ width: "100%" }}
                >
                  <source
                    src="https://res.cloudinary.com/dj36afflz/video/upload/v1770649462/videoplayback_trhtd1.mp4"
                    type="video/mp4"
                  />
                </video>
                <div
                  style={{
                    position: "absolute",
                    bottom: "12%",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                  <AnimatePresence>
                    {getCurrentLyric() && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          background: "rgba(0,0,0,0.7)",
                          color: "#fff",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          fontSize: "13px",
                        }}
                      >
                        {getCurrentLyric()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div style={{ marginTop: "20px", minHeight: "110px" }}>
                <AnimatePresence mode="wait">
                  {videoTime >= 26 && videoTime < 39 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        padding: "15px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "15px",
                        border: "1px solid #444",
                      }}
                    >
                      <strong>بيجاد بيقول:</strong> ما ينفعش نبقى زمايل وتعوزوا
                      جنية .. وانت من اكتر صحاب ليا شوفتك وانت بطبق الجملة دي مع
                      صحابنا لانك عمرك ما بخلت عليهم
                    </motion.div>
                  )}
                  {videoTime >= 40 && videoTime < 45 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        padding: "15px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "15px",
                        border: "1px solid #444",
                      }}
                    >
                      <strong>بيجاد بيقول:</strong> مش بقدر أحس بحبهم مهما قالوا
                      بيحبوني .. كون متأكد دايما ان كان على الاشخاص فا انت عارف
                      قد ايه بنحبك ولو على البنت اتاكد ان هتيجي البنت اللي تحسسك
                      بي دا وتنسيك كل اللي فات يسطا عشان والله انت عقليتك مختلفة
                      عن شباب كتير
                    </motion.div>
                  )}
                  {videoTime >= 56 && (
                    <TypewriterText text="ركز في باقي ليركس وعايزك تحسها ليك" />
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setStep(-1)}
                style={{
                  ...btnStyle,
                  background: "none",
                  color: "#fff",
                  border: "1px solid #fff",
                }}
              >
                إعادة الذكريات <RotateCcw size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
