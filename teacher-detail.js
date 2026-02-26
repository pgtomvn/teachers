document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // Lenis
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // --- INIT SCROLL TRIGGER LOGIC ---
  const initHeroScroll = () => {
    if (!$("#hero")) return;

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        pin: true,
        start: "top top",
        end: "+=100",
        scrub: 0.1,
      }
    });

    heroTl.addLabel("startSwitch")
      .to("#heroCoverLayer", { opacity: 0, scale: 1.05, duration: 0.5, ease: "power1.out" }, "startSwitch")
      .to("#heroCover", { filter: "brightness(1) contrast(1) sepia(0)", duration: 0.5, ease: "power1.out" }, "startSwitch")
      .to("#heroDetailLayer", { opacity: 1, visibility: "visible", pointerEvents: "auto", duration: 0.5, ease: "power1.out" }, "startSwitch")
      .to(".fixed-nav", { opacity: 1, visibility: "visible", pointerEvents: "auto", y: 0, duration: 0.5, ease: "power1.out" }, "startSwitch");
  };

  // --- BUTTON JUMP ---
  $("#jumpStoryBtn")?.addEventListener("click", () => {
    lenis.scrollTo("#publicMessageWall", { offset: -50 });
  });

// --- DATA FETCHING & RENDERING ---
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "co-trang"; // ID mặc định nếu không có params

  // Lấy dữ liệu từ file teachers.json
  fetch("teachers.json")
    .then(response => response.json())
    .then(TEACHERS => {
        const data = TEACHERS[id] || TEACHERS["co-trang"]; // Fallback nếu ID sai
        
        document.title = `${data.name} • Lưu Bút 12A2`;

        const setText = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
        const setSrc  = (sel, src) => { const el = $(sel); if (el) el.src = src; };
        const setHTML = (sel, html)=> { const el = $(sel); if (el) el.innerHTML = html; };

        // Đổ dữ liệu Text và Image
        setText("#tName", data.name);
        setText("#tFullNameCover", data.fullName);
        setText("#tRole", `${data.subject} • ${data.role}`);
        setText("#tRoleCover", data.role);
        setText("#tQuote", data.quote);
        setText("#aName", data.fullName);
        setText("#aSubject", data.subject);
        setSrc("#tCutout", data.cutout);
        setSrc("#fig1Img", data.fig1.src);
        setText("#fig1Cap", data.fig1.cap);

        const heroCover = $("#heroCover");
        if (heroCover) {
            heroCover.style.backgroundImage = `url('${data.cover}')`;
            heroCover.style.transform = "scale(1)";
        }

        setHTML("#aBullets", (data.bullets || []).map(b => `<li>${b}</li>`).join(""));
        setHTML("#storyBody", (data.storyA || []).map(p => `<p>${p}</p>`).join(""));
        setHTML("#storyBody2", (data.storyB || []).map(p => `<p>${p}</p>`).join(""));
        setHTML("#storyBody3", (data.storyC || []).map(p => `<p>${p}</p>`).join(""));
        setHTML("#storyBody4", (data.storyD || []).map(p => `<p>${p}</p>`).join(""));
        setHTML("#storyBody5", (data.storyE || []).map(p => `<p>${p}</p>`).join(""));
        setHTML("#bigQuote", `${data.bigQuote || ""} <span class="who" id="bigQuoteWho">— 12A2</span>`);

        const renderFigure = (figData, figId) => {
            const figEl = $(figId);
            if (!figEl) return;
            
            if (figData && figData.src && figData.src.trim() !== "") {
                figEl.style.display = "block"; 
                
                const isVideo = figData.src.match(/\.(mp4|webm|ogg|mov)$/i) || figData.type === 'video';
                
                if (isVideo) {
                    // Cấu trúc HTML cho Video có nút Play vintage
                    figEl.innerHTML = `
                        <div class="paper-clip"></div>
                        <div class="vintage-video-wrapper">
                            <video src="${figData.src}" playsinline preload="metadata"></video>
                            <button class="video-play-overlay hover-target">
                                <i class="fa-solid fa-play"></i>
                            </button>
                        </div>
                        <figcaption class="font-hand">${figData.cap || '...'}</figcaption>
                    `;
                    
                    // Logic bấm Play
                    const vid = figEl.querySelector("video");
                    const btn = figEl.querySelector(".video-play-overlay");
                    
                    btn.addEventListener("click", () => {
                        vid.play();
                        vid.setAttribute("controls", "controls"); // Hiện thanh tua video sau khi bấm play
                        btn.style.opacity = "0"; // Làm mờ nút play vintage đi
                        setTimeout(() => btn.style.display = "none", 300); // Ẩn hẳn
                    });

                } else {
                    // Cấu trúc HTML cho Ảnh bình thường
                    figEl.innerHTML = `
                        <div class="paper-clip"></div>
                        <img src="${figData.src}" alt="${figData.cap || 'Kỷ niệm 12A2'}">
                        <figcaption class="font-hand">${figData.cap || '...'}</figcaption>
                    `;
                }
            } else {
                figEl.style.display = "none"; 
            }
        };

        // Kích hoạt render 3 khối hình
        renderFigure(data.fig1, "#fig1");
        renderFigure(data.fig2, "#fig2");
        renderFigure(data.fig3, "#fig3");
        renderFigure(data.fig4, "#fig4");
        renderFigure(data.fig5, "#fig5");

        // Đổ dữ liệu Gallery
        if ($("#galleryGrid")) {
            const escAttr = (s="") => String(s)
              .replace(/&/g,"&amp;").replace(/"/g,"&quot;")
              .replace(/</g,"&lt;").replace(/>/g,"&gt;");

            $("#galleryGrid").innerHTML = (data.gallery || []).map(g => {
              const r = (Math.random() * 6 - 3).toFixed(2);
              const cap  = g.cap || "";
              const desc = g.desc || ""; 
              return `
                <div class="polaroid reveal" style="--r:${r}deg">
                  <img src="${g.src}" loading="lazy" data-cap="${escAttr(cap)}" data-desc="${escAttr(desc)}">
                  <div class="cap">${cap}</div>
                </div>
              `;
            }).join("");
        }

        // ==========================================
        // KHỞI TẠO AUDIO PLAYER
        // ==========================================
        // ==========================================
        // KHỞI TẠO AUDIO PLAYER (BẢN ĐỘ ĐĨA THAN)
        // ==========================================
        if (data.audio && data.audio.trim() !== "") {
            const audioContainer = $("#teacherAudioContainer");
            const audioEl = $("#teacherAudio");
            const playBtn = $("#audioPlayBtn");
            const audioVinyl = $("#audioVinyl");
            const audioWave = $("#audioWave"); // Lấy sóng âm
            const audioTime = $("#audioTime");
            
            // Set tên file
            setText("#audioFileName", data.audioFileName || "REC_12A2.WAV");

            audioContainer.style.display = "block"; 
            audioEl.src = data.audio;

            const formatTime = (time) => {
                if (isNaN(time)) return "00:00";
                const m = Math.floor(time / 60).toString().padStart(2, '0');
                const s = Math.floor(time % 60).toString().padStart(2, '0');
                return `${m}:${s}`;
            };

            audioEl.addEventListener("loadedmetadata", () => {
                audioTime.textContent = `00:00 / ${formatTime(audioEl.duration)}`;
            });

            audioEl.addEventListener("timeupdate", () => {
                audioTime.textContent = `${formatTime(audioEl.currentTime)} / ${formatTime(audioEl.duration)}`;
            });

            playBtn.addEventListener("click", () => {
                if (audioEl.paused) {
                    audioEl.play();
                    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    audioVinyl.classList.add("spin-animation"); 
                    audioWave.classList.add("playing"); // Bật sóng âm nhấp nhô
                } else {
                    audioEl.pause();
                    playBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-left: 2px;"></i>';
                    audioVinyl.classList.remove("spin-animation"); 
                    audioWave.classList.remove("playing"); // Tắt sóng âm
                }
            });

            audioEl.addEventListener("ended", () => {
                playBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-left: 2px;"></i>';
                audioVinyl.classList.remove("spin-animation");
                audioWave.classList.remove("playing");
                audioTime.textContent = `00:00 / ${formatTime(audioEl.duration)}`;
            });
        }

        // Khởi động các Animation phụ thuộc vào data
        runIntro(data); // Phải pass data vào để nó lấy ảnh làm intro
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu thầy cô:", error));

    /* =========================
     PHOTO LIGHTBOX (CLICK TO VIEW)
     ========================= */
  const photoModal = $("#photoModal");
  const photoView = $("#photoView");
  const photoCaption = $("#photoCaption");
  const photoClose = $("#photoClose");
  const photoFigure = $("#photoFigure");

  let activeThumbImg = null;

  const waitImgReady = (imgEl) => {
    if (!imgEl) return Promise.resolve();
    if (imgEl.complete && imgEl.naturalWidth) return Promise.resolve();
    // decode mượt hơn nếu support
    if (imgEl.decode) {
      return imgEl.decode().catch(() => new Promise(res => imgEl.onload = res));
    }
    return new Promise(res => imgEl.onload = res);
  };

  const nextTwoFrames = () => new Promise(res => {
    requestAnimationFrame(() => requestAnimationFrame(res));
  });

  const openPhoto = async (thumbImg, src, cap, desc) => {
    if (!photoModal || !photoView) return;

    activeThumbImg = thumbImg;

    // ✅ set trạng thái ẩn TRƯỚC để tránh nháy
    gsap.set(photoModal, { opacity: 0 });
    gsap.set(photoFigure, { opacity: 0, scale: 0.94, rotation: -3 });
    gsap.set(photoCaption, { opacity: 0, y: 10 });

    // show modal (chỉ bật visibility/pointer; opacity do GSAP điều khiển)
    photoModal.classList.add("show");
    photoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    lenis?.stop?.();

    // set content
    photoView.src = src;

    // ✅ cap + desc riêng (desc có thể dài)
    const safe = (s="") => String(s).replace(/</g,"&lt;").replace(/>/g,"&gt;");
    photoCaption.innerHTML = `
      ${cap ? `<div class="pc-title">${safe(cap)}</div>` : ``}
      ${desc ? `<div class="pc-desc">${safe(desc)}</div>` : ``}
    `;

    // đợi ảnh load + đợi layout ổn định (2 frame) => hết nháy
    await waitImgReady(photoView);
    await nextTwoFrames();

    const from = thumbImg.getBoundingClientRect();
    const to = photoView.getBoundingClientRect();

    const polaroid = thumbImg.closest(".polaroid");
    const rVar = polaroid ? parseFloat(getComputedStyle(polaroid).getPropertyValue("--r")) : 0;
    const startRot = Number.isFinite(rVar) ? rVar : (Math.random() * 6 - 3);

    const fly = thumbImg.cloneNode(true);
    fly.classList.add("photo-fly");
    fly.style.clipPath = "none";
    document.body.appendChild(fly);

    gsap.set(fly, {
      left: from.left, top: from.top,
      width: from.width, height: from.height,
      position: "fixed",
      rotation: startRot,
      skewX: 0, skewY: 0,
      transformOrigin: "50% 50%",
      opacity: 1,
    });

    gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => fly.remove(),
    })
    .to(photoModal, { opacity: 1, duration: 0.22 }, 0)

    // bay lên + xoay + skew
    .to(fly, {
      left: to.left, top: to.top,
      width: to.width, height: to.height,
      rotation: -12,
      skewX: 7,
      skewY: -2,
      duration: 0.62,
    }, 0)

    // settle về thẳng + nảy nhẹ
    .to(fly, {
      rotation: 0,
      skewX: 0,
      skewY: 0,
      duration: 0.85,
      ease: "elastic.out(1, 0.55)",
    }, 0.52)

    // hiện figure + caption
    .to(photoFigure, { opacity: 1, scale: 1, rotation: 0, duration: 0.30, ease: "power2.out" }, 0.62)
    .to(photoCaption, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.80)

    // fade fly sau khi figure lên => không nháy “đổi ảnh”
    .to(fly, { opacity: 0, duration: 0.12 }, 0.66);
  };

  const closePhoto = () => {
    if (!photoModal?.classList.contains("show")) return;

    // animate back to thumb (nếu còn thumb)
    const viewRect = photoView.getBoundingClientRect();
    const fly = photoView.cloneNode(true);
    fly.classList.add("photo-fly");
    document.body.appendChild(fly);

    gsap.set(fly, {
      left: viewRect.left,
      top: viewRect.top,
      width: viewRect.width,
      height: viewRect.height,
      opacity: 1,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        fly.remove();
        photoModal.classList.remove("show");
        photoModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("is-locked");
        lenis?.start?.();
        activeThumbImg = null;
      },
    });

    gsap.to(photoCaption, { opacity: 0, y: 10, duration: 0.2, ease: "power2.out" });
    gsap.to(photoFigure, { opacity: 0, scale: 0.98, duration: 0.25, ease: "power2.out" });

    // nếu thumb còn tồn tại thì bay về nó, không thì fade out
    if (activeThumbImg) {
      const to = activeThumbImg.getBoundingClientRect();
      tl.to(fly, {
        left: to.left,
        top: to.top,
        width: to.width,
        height: to.height,
        opacity: 0.8,
        duration: 0.45,
      }, 0);
    } else {
      tl.to(fly, { opacity: 0, duration: 0.25 }, 0);
    }

    tl.to(photoModal, { opacity: 0, duration: 0.25 }, 0)
      .set(photoModal, { opacity: "" }); // trả lại cho class show điều khiển
  };

  // click thumbnail (event delegation)
  const gallery = $("#galleryGrid");
  gallery?.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    const cap  = img.dataset.cap || "";
    const desc = img.dataset.desc || ""; // ✅ lấy desc

    openPhoto(img, img.getAttribute("src"), cap, desc);
  });

  // close handlers
  photoClose?.addEventListener("click", closePhoto);
  photoModal?.addEventListener("click", (e) => {
    // click ngoài figure để thoát
    if (e.target === photoModal) closePhoto();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePhoto();
  });

  // Reveal init (đừng setTimeout mù nữa)
  const initReveals = () => {
    $$(".reveal").forEach(el => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });
  };

  // --- INTRO ANIMATION ---
  const runIntro = (data) => {
    const introSection = $("#introSection");
    const stripsContainer = $("#introStrips"); // Đã thêm ID này vào HTML ở Bước 1
    const heroContent = $(".hero-center-layer");
    const cutout = $(".hero-right");

    // Nếu trang không có intro section hoặc strips container thì bỏ qua
    if (!introSection || !stripsContainer) {
      initHeroScroll();
      initReveals();
      ScrollTrigger.refresh();
      return;
    }

    gsap.set([".fixed-nav", "#heroDetailLayer"], { opacity: 0, visibility: "hidden", pointerEvents: "none" });
    gsap.set(".fixed-nav", { y: -20 });

    const stripCount = 6; // Số lượng ảnh muốn xuất hiện trong Intro
    let sourceImages = [];

    // Lấy ảnh từ gallery
    if (data.gallery && data.gallery.length > 0) {
        sourceImages = data.gallery.filter(g => !g.src.match(/\.(mp4|webm|ogg|mov)$/i)).map(g => g.src); // Chỉ lấy ảnh, bỏ qua video
    }
    
    // Nếu chưa đủ 5 ảnh, bổ sung thêm từ cover, fig1, fig2...
    if (sourceImages.length < stripCount) {
         const extraImages = [data.cover, data.fig1?.src, data.fig2?.src, data.fig3?.src].filter(Boolean);
         sourceImages = [...sourceImages, ...extraImages];
    }
    
    // Nếu vẫn không có ảnh nào (giáo viên chưa có data), dùng logo làm mặc định
    if (sourceImages.length === 0) {
        sourceImages = ["assets/logo.png"];
    }

    // Xóa rỗng container trước khi chèn để tránh bị lặp ảnh
    stripsContainer.innerHTML = "";
    const stripImgs = [];
    
    // Tạo và chèn các thẻ <img> vào DOM
    for (let i = 0; i < stripCount; i++) {
      const img = document.createElement("img");
      // Lấy ảnh tuần tự, lặp lại nếu hết mảng
      img.src = sourceImages[i % sourceImages.length]; 
      
      // Thêm fallback nếu đường dẫn ảnh bị lỗi
      img.onerror = function() {
          this.src = 'assets/logo.png';
      };

      gsap.set(img, { scale: 1.2 }); // Set trạng thái ban đầu cho GSAP
      stripsContainer.appendChild(img);
      stripImgs.push(img);
    }

    // Định nghĩa timeline animation
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        document.body.classList.remove("is-locked");
        
        // Ẩn mượt mà phần Intro thay vì display: none ngay lập tức
        gsap.to(introSection, {
            autoAlpha: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => introSection.remove() // Xóa hẳn khỏi DOM cho nhẹ
        });

        initHeroScroll();
        initReveals();
        ScrollTrigger.refresh();
      }
    });

    // Ẩn hero content lúc đầu
    tl.set([heroContent, cutout].filter(Boolean), { opacity: 0, y: 30 });

    // Hiệu ứng Intro
    tl.to(stripImgs, { 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Mở rộng ảnh (bạn có thể cần chỉnh CSS clip-path ban đầu nếu dùng cái này)
        duration: 1.2, 
        ease: "power4.inOut", 
        stagger: 0.25, 
        delay: 9 // Chờ preloader chạy xong (như logic cũ của bạn)
    }, 0) 
    .to(stripImgs, { scale: 1, duration: 3, ease: "power3.inOut", delay: 9 }, 0)
    
    // Hiện Hero content sau khi Intro xong
    .to([heroContent, cutout].filter(Boolean), { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" }, 10.5); 
  };

  // --- TO TOP ---
  $("#toTopBtn")?.addEventListener("click", () => lenis.scrollTo(0));

  // --- LOVE BTN ---
  const loveKey = `mm12a2_love_${id}`;
  const loveBtn = $("#loveBtn");
  const loveCount = $("#loveCount");
  if (loveCount) loveCount.textContent = localStorage.getItem(loveKey) || 0;
  loveBtn?.addEventListener("click", () => {
    const cur = parseInt(localStorage.getItem(loveKey) || "0", 10) + 1;
    localStorage.setItem(loveKey, cur);
    if (loveCount) loveCount.textContent = cur;
    gsap.timeline().to(loveBtn, { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 });
  });

  // --- MESSAGE WALL (GUARD NULL) ---
  const modal = $("#thanksModal");
  const wall = $("#publicWall");
  const colors = ["#fff7d1", "#ffd6d6", "#d7f3ff", "#e9ffd9", "#fff0f5"];
  const currentTeacherId = id;
  const STORAGE_KEY = `12a2_wall_${currentTeacherId}`;

  const renderNote = (note, animate = false) => {
    if (!wall) return; // ✅ chặn crash

    const div = document.createElement("div");
    div.className = "pinned-note";
    div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const rot = (Math.random() * 10 - 5).toFixed(1);
    div.style.setProperty("--r", `${rot}deg`);

    const pins = ["red", "blue", "green", "yellow"];
    const pinColor = pins[Math.floor(Math.random() * pins.length)];

    div.innerHTML = `
      <div class="pin" style="background:${pinColor}"></div>
      <div class="note-content font-hand-2">
        <b style="color:#555">${note.name}:</b><br>
        ${note.msg}
      </div>
    `;

    wall.prepend(div);

    if (animate) {
      gsap.from(div, { scale: 0.5, opacity: 0, rotation: parseFloat(rot) + 20, duration: 0.6, ease: "back.out(1.5)" });
    }
  };

  const loadSavedNotes = () => {
    if (!wall) return;
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    savedData.forEach(note => renderNote(note, false));
  };
  loadSavedNotes();

  if (modal) {
    const overlay = $("#thanksCloseOverlay"); // Lấy lớp nền mờ

    $("#openThanksBtn")?.addEventListener("click", () => modal.classList.add("show"));

    const closeModal = () => {
        modal.classList.add("closing"); // Kích hoạt CSS giấy rơi
        
        // Đợi 380ms (cho hiệu ứng chạy gần xong) rồi mới ẩn hẳn khối HTML
        setTimeout(() => {
            modal.classList.remove("show");
            modal.classList.remove("closing"); // Dọn dẹp để lần sau mở lên không bị lỗi
        }, 380); 
    };

    $("#thanksClose")?.addEventListener("click", closeModal);
    overlay?.addEventListener("click", closeModal); // Bấm ra ngoài rìa là đóng ngay

    $("#thanksSend")?.addEventListener("click", () => {
      const msg = $("#thanksMsg")?.value?.trim() || "";
      const name = ($("#thanksName")?.value?.trim() || "Ẩn danh");

      if (!msg) return alert("Dòng tin nhắn vẫn còn để trống! Nhanh tay viết vài lời gửi đến thầy/cô nào!");

      const note = { name, msg };
      renderNote(note, true);

      const old = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      old.push(note);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(old));

      if ($("#thanksMsg")) $("#thanksMsg").value = "";
      if ($("#thanksName")) $("#thanksName").value = ""; // Clear luôn tên cho sạch
      
      closeModal(); // Dùng hàm đóng
      lenis.scrollTo("#publicMessageWall", { offset: -50 });
    });
  }

  // --- PETALS (GUARD) ---
  const petalsWrap = $(".petals");
  if (petalsWrap) {
    petalsWrap.innerHTML = "";
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = Math.random() * 100 + "%";
      const size = (Math.random() * 10 + 10) + "px";
      p.style.width = size;
      p.style.height = size;
      p.style.animationDuration = (8 + Math.random() * 5).toFixed(2) + "s";
      p.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";
      petalsWrap.appendChild(p);
    }
  }

  // --- PRELOADER (CHỐNG CRASH) ---
  const preloader = document.querySelector(".pre-loader");
  const digit1 = document.querySelector(".digit-1");
  const digit2 = document.querySelector(".digit-2");
  const digit3 = document.querySelector(".digit-3");

  if (preloader && digit1 && digit2 && digit3) {
    gsap.set("nav", { y: -150 });

    function splitTextIntoSpans(selector) {
      const element = document.querySelector(selector);
      if (!element) return;
      const text = element.innerText;
      element.innerHTML = text.split("").map((char) => `<span>${char}</span>`).join("");
    }
    splitTextIntoSpans(".header h1");

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        digit3.appendChild(div);
      }
    }
    const finalDigit = document.createElement("div");
    finalDigit.className = "num";
    finalDigit.textContent = "0";
    digit3.appendChild(finalDigit);

    function animateDigit(digit, duration, delay = 1) {
      const one = digit.querySelector(".num");
      if (!one) return;
      const numHeight = one.clientHeight;
      const totalDistance = (digit.querySelectorAll(".num").length - 1) * numHeight;

      gsap.to(digit, {
        y: -totalDistance,
        duration,
        delay,
        ease: "power2.inOut",
      });
    }

    animateDigit(digit3, 5);
    animateDigit(digit2, 6);
    animateDigit(digit1, 2, 5);

    gsap.to(".progress-bar", { width: "30%", duration: 2, ease: "power4.inOut", delay: 7 });
    gsap.to(".progress-bar", {
      width: "100%",
      opacity: 0,
      duration: 2,
      delay: 8.5,
      ease: "power3.out",
      onComplete: () => gsap.set(".pre-loader", { display: "none" }),
    });

    gsap.to(".hero-imgs > img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.25,
      delay: 9,
    });

    gsap.fromTo(".hero-imgs",
      { scale: 1.2 },
      { scale: 1, duration: 3, ease: "power3.inOut", delay: 9 }
    );
    gsap.to("nav", { y: 0, duration: 1, ease: "power3.out", delay: 10 });
    gsap.to("h1 span", { top: "0px", stagger: 0.1, duration: 1, ease: "power3.out", delay: 10 });
        // ✅ END INTRO: mở khóa scroll + ẩn intro để lộ web chính
    const introSection = document.querySelector("#introSection");
    gsap.delayedCall(11.2, () => {
      document.body.classList.remove("is-locked");

      if (introSection) {
        gsap.to(introSection, {
          autoAlpha: 0,
          duration: 1.25,
          ease: "power2.out",
          onComplete: () => introSection.remove()
        });
      }

      // refresh lại layout/scrolltrigger sau khi DOM thay đổi
      lenis.resize?.();
      ScrollTrigger.refresh();
    });
  }
});
