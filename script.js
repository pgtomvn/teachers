document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    // --- 0. LENIS SMOOTH SCROLL ---
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

      /* =========================
     TEACHER BOARD DATA (BY GRADE)
     ========================= */

    const TEACHERS_BY_GRADE = {
        10: [
        { id:"co-lam", name:"Cô Lam", subjects:["Chủ nhiệm", "Tiếng Pháp"], image: "assets/teachers/10_co_lam/avatar.jpg" },
        { id:"co-lien", name:"Cô Liên", subjects:["Tiếng Anh"], image: "assets/teachers/10_co_lien/avatar.jpg" },
        { id:"thay-khoa", name:"Thầy Khoa", subjects:["Toán học"], image: "assets/teachers/10_thay_khoa/avatar.jpg" },
        { id:"co-duyen", name:"Cô Duyên", subjects:["Ngữ văn"], image: "assets/teachers/10_co_duyen/avatar.jpg" },
        { id:"thay-tai", name:"Thầy Tài", subjects:["Vật lý"], image: "assets/teachers/10_thay_tai/avatar.jpg" },
        { id:"thay-danh", name:"Thầy Danh", subjects:["Hoá học"], image: "assets/teachers/10_11_thay_danh/avatar.jpg" },
        { id:"thay-dung", name:"Thầy Dũng", subjects:["Địa lý"], image: "assets/teachers/10_thay_dung/avatar.jpg" },
        { id:"thay-thai", name:"Thầy Thái", subjects:["Công nghệ"], image: "assets/teachers/10_thay_thai/avatar.jpg" },
        { id:"thay-suyen", name:"Thầy Suyền", subjects:["Tin học"], image: "assets/teachers/10_11_12_thay_suyen/avatar.jpg" },
        { id:"thay-khang", name:"Thầy Khang", subjects:["Thể dục"], image: "assets/teachers/10_11_12_thay_khang/avatar.jpg" },
        { id:"co-men", name:"Cô Mến", subjects:["Giáo dục Quốc phòng"], image: "assets/teachers/10_11_co_men/avatar.jpg" },
        { id:"co-dao", name:"Cô Đào", subjects:["Lịch sử"], image: "assets/teachers/10_11_co_dao/avatar.jpg" },
        { id:"thay-phuong", name:"Thầy Phương", subjects:["Kinh tế - Pháp luật"], image: "assets/teachers/10_12_thay_phuong/avatar.jpg" },
        ],
        11: [
        { id:"co-hang", name:"Cô Hằng", subjects:["Chủ nhiệm","Địa lý"], image: "assets/teachers/11_co_hang/avatar.jpg" },
        { id:"co-dung", name:"Cô Dung", subjects:["Tiếng Anh"], image: "assets/teachers/11_co_dung/avatar.jpg" },
        { id:"thay-nam-quoc", name:"Thầy Quốc", subjects:["Tiếng Anh"], image: "assets/teachers/11_thay_nam_quoc/avatar.jpg" },
        { id:"co-binh", name:"Cô Bình", subjects:["Toán học"], image: "assets/teachers/11_co_binh/avatar.jpg" },
        { id:"thay-quoc-anh", name:"Thầy Quốc Anh", subjects:["Toán học"], image: "assets/teachers/11_thay_quoc_anh/avatar.jpg" },
        { id:"co-mai", name:"Cô Mai", subjects:["Ngữ văn"], image: "assets/teachers/11_co_mai/avatar.jpg" },
        { id:"co-oanh", name:"Cô Oanh", subjects:["Vật lý"], image: "assets/teachers/11_co_oanh/avatar.jpg" },
        { id:"thay-vo-quoc", name:"Thầy Quốc", subjects:["Vật lý"], image: "assets/teachers/11_thay_vo_quoc/avatar.jpg" },
        { id:"thay-danh", name:"Thầy Danh", subjects:["Hoá học"], image: "assets/teachers/10_11_thay_danh/avatar.jpg" },
        { id:"thay-cuong", name:"Thầy Cường", subjects:["Công nghệ"], image: "assets/teachers/11_12_thay_cuong/avatar.jpg" },
        { id:"thay-suyen", name:"Thầy Suyền", subjects:["Tin học"], image: "assets/teachers/10_11_12_thay_suyen/avatar.jpg" },
        { id:"thay-khang", name:"Thầy Khang", subjects:["Thể dục"], image: "assets/teachers/10_11_12_thay_khang/avatar.jpg" },
        { id:"co-dao", name:"Cô Đào", subjects:["Lịch sử"], image: "assets/teachers/10_11_co_dao/avatar.jpg" },
        { id:"co-men", name:"Cô Mến", subjects:["Giáo dục Quốc phòng"], image: "assets/teachers/10_11_co_men/avatar.jpg" },
        { id:"co-chau", name:"Cô Châu", subjects:["Kinh tế - Pháp luật"], image: "assets/teachers/11_co_chau/avatar.jpg" },
        ],
        12: [
        { id:"co-trang", name:"Cô Trang", subjects:["Chủ nhiệm","Toán học"], image: "assets/teachers/12_co_trang/avatar.jpg", featured:true },
        { id:"co-huong", name:"Cô Hương", subjects:["Tiếng Anh"], image: "assets/teachers/12_co_huong/avatar.jpg", featured:true },
        { id:"co-thang", name:"Cô Thắng", subjects:["Ngữ văn"], image: "assets/teachers/12_co_thang/avatar.jpg"  },
        { id:"co-tuyen", name:"Cô Tuyên", subjects:["Vật lý"], image: "assets/teachers/12_co_tuyen/avatar.jpg"  },
        { id:"co-ha", name:"Cô Hà", subjects:["Hoá học"], image: "assets/teachers/12_co_ha/avatar.jpg"  },
        { id:"thay-tuan", name:"Thầy Tuấn", subjects:["Địa lý"], image: "assets/teachers/12_thay_tuan/avatar.jpg" },
        { id:"thay-cuong", name:"Thầy Cường", subjects:["Công nghệ"], image: "assets/teachers/11_12_thay_cuong/avatar.jpg" },
        { id:"thay-suyen", name:"Thầy Suyền", subjects:["Tin học"], image: "assets/teachers/10_11_12_thay_suyen/avatar.jpg" },
        { id:"thay-khang", name:"Thầy Khang", subjects:["Thể dục"], image: "assets/teachers/10_11_12_thay_khang/avatar.jpg" },
        { id:"co-hanh", name:"Cô Hạnh", subjects:["Lịch sử"], image: "assets/teachers/12_co_hanh/avatar.jpg" },
        { id:"thay-son", name:"Thầy Sơn", subjects:["Giáo dục Quốc phòng"], image: "assets/teachers/12_thay_son/avatar.jpg" },
        { id:"thay-phuong", name:"Thầy Phương", subjects:["Kinh tế - Pháp luật"], image: "assets/teachers/10_12_thay_phuong/avatar.jpg" },
        ],
    };

    const doodles = [
        // Máy bay giấy nét thanh
        `<svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
        // Cụm 3 ngôi sao lấp lánh nhỏ
        `<svg viewBox="0 0 50 50"><path d="M10 0 L13 10 L23 13 L13 16 L10 26 L7 16 L-3 13 L7 10 Z"/><path d="M40 20 L42 25 L47 27 L42 29 L40 34 L38 29 L33 27 L38 25 Z" transform="scale(0.6) translate(20, 20)"/><path d="M10 0 L13 10 L23 13 L13 16 L10 26 L7 16 L-3 13 L7 10 Z" transform="scale(0.4) translate(60, 80)"/></svg>`,
        // Vòng lặp xoắn ốc (swirl)
        `<svg viewBox="0 0 100 100"><path d="M10 50 C 10 20, 40 20, 50 50 C 60 80, 90 80, 90 50" stroke-dasharray="4 4"/></svg>`,
        // Mũi tên cong vẽ tay
        `<svg viewBox="0 0 100 100"><path d="M10 80 Q 50 10 90 60 M 70 60 L 90 60 L 80 40"/></svg>`
    ];

    // Update lenis scroll hook để khi scroll thì ẩn preview luôn
    lenis.off?.("scroll");
    lenis.on("scroll", () => {
        hideTeacherPreview();
        ScrollTrigger.update();
    });


    // --- 2. SMART NAVBAR (Ẩn hiện khi scroll) ---
    const nav = $(".fixed-nav");
    let lastScrollY = window.scrollY;
    
    window.addEventListener("scroll", () => {
        if (!nav) return;
        const currentScrollY = window.scrollY;
        
        // Nếu ở trên cùng -> Hiện nhưng trong suốt (hoặc xử lý style riêng)
        if (currentScrollY < 50) {
            nav.classList.add("visible-nav");
            nav.classList.remove("hidden-nav", "scrolled");
        } else {
            nav.classList.add("scrolled");
            // Scroll xuống -> Ẩn
            if (currentScrollY > lastScrollY) {
                nav.classList.remove("visible-nav");
                nav.classList.add("hidden-nav");
            } 
            // Scroll lên -> Hiện
            else {
                nav.classList.remove("hidden-nav");
                nav.classList.add("visible-nav");
            }
        }
        lastScrollY = currentScrollY;
    });

    // --- 3. CINEMATIC INTRO ---
    const introContainer = $("#cinematic-intro");
    const introVideo = $("#introVideo");
    
    if (introContainer && introVideo) {
        document.body.classList.add("is-locked");
        introVideo.play().catch(() => { introVideo.muted = true; introVideo.play(); });

        const tl = gsap.timeline({ onComplete: finishIntro });
        tl.addLabel("start");
        tl.to({val: 2026}, {
            val: 2023,
            duration: 5.5, // Tốc độ chậm vừa phải
            ease: "power1.inOut", // Kiểu chuyển động nhẹ nhàng hơn
            delay: 1,
            snap: "val",
            onUpdate: function() { $("#yearCounter").innerText = this.targets()[0].val; }
        }, "start"); // Bắt đầu ngay tại mốc "start"
        tl.to(".line-1", {opacity:1, y:0, duration: 1.5}, "start+=2.5")
            .to(".line-2", {opacity:1, y:0, duration: 1.5}, "+=0.2") // Hiện dòng 2 ngay sau dòng 1 chút xíu
            .to({}, {duration: 0}) // Dừng lại ngắm nghía lâu hơn chút (1.5s)
            .to("#whiteFlash", {opacity:1, duration:0.3}); // Chớp trắng nhanh dứt khoát

        function finishIntro() {
            gsap.set(introContainer, {display: "none"});
            document.body.classList.remove("is-locked");
            const nav = document.querySelector(".fixed-nav");
            if(nav) nav.classList.remove("hidden-nav"); 
            if(nav) nav.classList.add("visible-nav");
            gsap.to("#whiteFlash", {opacity:0, duration:3});
            gsap.from("#hero .hero-photo", { scale: 1.2, duration: 2.5, ease: "power2.out" });
            gsap.from(".hero-content-center", { y: 50, opacity: 0, duration: 1.5, delay: 0.5 });

            // ==========================================
            // LOGIC PHÁT NHẠC NỀN RANDOM (PLAYLIST THÔNG MINH)
            // ==========================================
            const bgMusic = document.getElementById("bg-music");
            if (bgMusic) {
                const playlist = [
                    "assets/ost.mp3",
                    "assets/ost2.mp3",
                    "assets/ost3.mp3",
                    "assets/ost4.mp3",
                    "assets/ost5.mp3"
                ];

                let currentSong = ""; // Lưu lại bài đang hát

                // Hàm chọn bài và phát
                const playNextRandomSong = () => {
                    let randomSong;
                    // Bốc thăm cho đến khi bài mới KHÔNG TRÙNG với bài vừa hát
                    do {
                        randomSong = playlist[Math.floor(Math.random() * playlist.length)];
                    } while (randomSong === currentSong);
                    
                    currentSong = randomSong; // Cập nhật bài đang hát
                    bgMusic.src = currentSong; // Gắn link nhạc
                    bgMusic.play().catch(e => console.log("Đang chờ người dùng tương tác..."));
                };

                bgMusic.volume = 0.3; // Volume nhỏ
                
                // 1. Gọi hàm để phát bài đầu tiên khi web vừa load xong Intro
                playNextRandomSong();

                // 2. LẮNG NGHE SỰ KIỆN HẾT BÀI: Cứ hễ hát xong là tự gọi lại hàm bốc thăm bài mới
                bgMusic.addEventListener('ended', playNextRandomSong);

                // 3. Dự phòng trường hợp trình duyệt chặn Autoplay lúc đầu
                document.body.addEventListener('click', function playOnInteraction() {
                    if (bgMusic.paused) {
                        bgMusic.play();
                    }
                    document.body.removeEventListener('click', playOnInteraction); 
                }, { once: true });
            }
        }
        $("#skipCinematicBtn").addEventListener("click", () => tl.progress(1));
        window.addEventListener("keydown", (e) => {
             if (document.body.classList.contains("is-locked") && e.key === "Enter") tl.progress(1);
        });
    }

    // --- 4. HERO PARALLAX ---
    const hero = $("#hero");
    if (hero) {
        gsap.to(".hero-photo", {
            yPercent: 15, scale: 1, ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
        });
        $("#goLaneBtn").addEventListener("click", () => gsap.to(window, { duration: 1.5, scrollTo: "#lane", ease: "power2.inOut" }));
    }

    function buildScatter(grade, mountId) {
        const mount = document.getElementById(mountId);
        if (!mount) return;

        const list = TEACHERS_BY_GRADE[grade] || [];
        
        // KỊCH BẢN DÁN ẢNH TỰ NHIÊN: Tạo thành 1 dải sóng nhấp nhô, đè nhẹ nhàng
        // s: Độ to nhỏ, r: Góc nghiêng, y: Lên xuống (vh), ml: Cách trái (vw), z: Lớp trên/dưới
        const naturalLayout = [
            { s: 0.9, r: -7, y: -22,  ml: "-2vw",    z: 10 }, // Thẻ 1: Khởi đầu, hơi cao
            { s: 0.8, r: 6,  y: 25,  ml: "-15vw", z: 12 }, // Thẻ 2: Thấp xuống, hơi đè góc thẻ 1
            { s: 1.17, r: 4, y: 0,  ml: "4vw",  z: 11 }, // Thẻ 3: To hơn xíu, cách ra 1 tí
            { s: 0.83, r: -4,  y: -25, ml: "-2vw",   z: 10 }, // Thẻ 4: Nhô cao, đè thẻ 3
            { s: 0.92, r: -1, y: 17,  ml: "1vw",    z: 13 }, // Thẻ 5: Thấp hẳn xuống
            { s: 1.08, r: 5, y: 4,   ml: "0.5vw", z: 16 }, // Thẻ 6: To bự, nằm lưng chừng
            { s: 0.94, r: 1,  y: -20, ml: "4vw",    z: 10 }, // Thẻ 7: Hơi cao, tạo khoảng thở
            { s: 1.00, r: -5, y: 20,  ml: "-10vw", z: 14 }, // Thẻ 8: Thấp, đè thẻ 7
            { s: 1.08, r: -2,  y: -1,  ml: "-2vw",  z: 13 }, // Thẻ 9: Ngay ngắn ở giữa
            { s: 0.9, r: -7, y: -22,  ml: "5vw",    z: 10 }, // Thẻ 10: Vút lên cao
            { s: 0.8, r: 6,  y: 25,  ml: "-15vw", z: 12 }, // Thẻ 11: Thấp xuống
            { s: 1.1, r: 7, y: -6,  ml: "3vw",    z: 12 }, // Thẻ 12: Giữa
            { s: 1.05, r: -6,  y: 15, ml: "4vw", z: 10 } , // Thẻ 13: Chốt sổ
            { s: 0.92, r: 15,  y: -5, ml: "-1.3vw", z: 13 }
        ];

        mount.innerHTML = list.map((t, index) => {
            const subjectsText = (t.subjects || []).join(" • ");
            
            // Lấy vị trí từ kịch bản dán ảnh (Lặp lại nếu số giáo viên nhiều hơn 13)
            const layout = naturalLayout[index % naturalLayout.length];
            
            // Random băng keo để tạo độ chân thực (từ -8 độ đến 8 độ)
            const tapeR = (Math.random() * 16 - 8).toFixed(2);

            // Xử lý giao diện riêng cho Lớp 12 (Dùng giấy note kẻ ô và keo vàng)
            const isGrade12 = grade === 13;
            const cardClass = isGrade12 ? "note-paper" : "pin-label";
            const tapeClass = isGrade12 ? "tape yellow-tape" : "tape";

            return `
                <a class="${cardClass} hover-target ${t.featured ? "featured" : ""}" 
                   href="teacher-detail.html?id=${t.id}"
                   style="--s: ${layout.s}; --r: ${layout.r}deg; --y: ${layout.y}vh; --ml: ${layout.ml}; --z: ${layout.z}; --tape-r: ${tapeR}deg;"
                >
                    <span class="${tapeClass}" aria-hidden="true"></span>
                    
                    ${!isGrade12 ? `
                        <div class="photo-placeholder">
                            ${t.image ? `<img src="${t.image}" alt="Ảnh ${t.name}" loading="lazy">` : `<i class="fa-solid fa-user-tie"></i>`}
                        </div>
                    ` : ''}
                    
                    <span class="label-text">
                        <span class="label-name">${t.name}</span>
                        <span class="label-sub">${subjectsText}</span>
                    </span>
                </a>
            `;
        }).join("");
    }

    // 🔴 CHÚ Ý SỐ 1: Phải gọi hàm in ảnh ra TRƯỚC khi khởi tạo thanh cuộn GSAP
    buildScatter(10, "scatter10");
    buildScatter(11, "scatter11");
    buildScatter(12, "scatter12");

    // Yêu cầu trình duyệt cập nhật lại bản vẽ
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });

    // --- 5. HORIZONTAL SCROLL & ANIMATIONS ---
    const lane = $("#lane");
    if (lane) {
        const world = lane.querySelector(".horizontal-world");
        const halls = gsap.utils.toArray(".exhibit-hall", world);
        
        const horizontalTween = gsap.to(world, {
            x: () => -(world.scrollWidth - window.innerWidth),
            ease: "none"    ,
            scrollTrigger: {
                trigger: lane, 
                start: "top top", 
                end: () => "+=" + world.scrollWidth,
                pin: true, 
                scrub: 1, 
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const idx = Math.round(self.progress * (halls.length - 1));
                    $$(".p-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
                }
            }
        });

        halls.forEach((hall) => {
            // Card Parallax
            const cards = hall.querySelectorAll(".t-pin, .memory-polaroid");
            if(cards.length) {
                gsap.from(cards, {
                    y: 100, opacity: 0, rotation: 10, stagger: 0.1, duration: 1, ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: hall, containerAnimation: horizontalTween,
                        start: "left 70%", toggleActions: "play none none reverse"
                    }
                });
            }
            // Doodle Animation (Vẽ tay)
            const doodle = hall.querySelector(".doodle-circle path");
            if(doodle) {
                gsap.to(doodle, {
                    strokeDashoffset: 0, duration: 1.5, ease: "power2.out",
                    scrollTrigger: {
                        trigger: hall, containerAnimation: horizontalTween,
                        start: "left 60%", toggleActions: "play none none reverse"
                    }
                });
            }
            if (hall.classList.contains("grade-12")) {
                const decor = hall.querySelector(".decor-layer");
                if (decor) {
                    gsap.to(decor, { /* ... */ });
                }

                const c1 = hall.querySelector(".cluster-1");
                if (c1) {
                    gsap.from(c1, { /* ... */ });
                }

                const c3 = hall.querySelector(".cluster-3");
                if (c3) {
                    gsap.from(c3, { /* ... */ });
                }
            }

        });

        // Paper Planes
        const p1 = $(".p1");
        const p2 = $(".p2");
        if(p1 && p2) {
            gsap.to(p1, { x: window.innerWidth + 200, y: -200, rotation: 45, ease: "power1.inOut", scrollTrigger: { trigger: ".grade-12", containerAnimation: horizontalTween, start: "left 90%", end: "right 10%", scrub: 2 } });
            gsap.to(p2, { x: window.innerWidth + 100, y: -100, rotation: 20, ease: "power1.inOut", scrollTrigger: { trigger: ".grade-12", containerAnimation: horizontalTween, start: "left 80%", end: "right 0%", scrub: 3 } });
        }
    }

    // --- 6. MAP MODAL ---
    const mapBtn = $("#mapBtn");
    const mapModal = $("#mapModal");
    const mapClose = $("#mapClose");
    if(mapBtn) {
        mapBtn.addEventListener("click", () => { mapModal.classList.add("show"); });
        mapClose.addEventListener("click", () => { mapModal.classList.remove("show"); });
        $$(".station").forEach(btn => {
            btn.addEventListener("click", () => {
                mapModal.classList.remove("show");
                const jump = btn.dataset.jump;
                if (jump === "hero") gsap.to(window, {duration: 1, scrollTo: 0});
                else if (jump === "outro") gsap.to(window, {duration: 1.5, scrollTo: "#outro"});
                else if (jump === "lane") {
                    const hallIndex = parseInt(btn.dataset.hall || 0);
                    
                    const laneSec = document.querySelector("#lane");
                    const world = document.querySelector(".horizontal-world");
                    const targetHall = document.querySelectorAll(".exhibit-hall")[hallIndex];

                    if (laneSec && world && targetHall) {
                        // 1. Tọa độ bắt đầu cuộn của toàn bộ khu vực Lane
                        const laneTop = laneSec.offsetTop;
                        
                        // 2. Tổng quãng đường ngang thực tế có thể cuộn (tránh chia cho 0 nếu màn hình quá to)
                        const maxScrollX = Math.max(world.scrollWidth - window.innerWidth, 1);
                        
                        // 3. Tỉ lệ phần trăm vị trí ngang của Ga mục tiêu so với tổng thể (tối đa 100%)
                        const progress = Math.min(targetHall.offsetLeft / maxScrollX, 1);
                        
                        // 4. Quy đổi ra quãng đường cuộn dọc (bằng đúng world.scrollWidth theo config ScrollTrigger của bạn)
                        const targetScroll = laneTop + (progress * world.scrollWidth);

                        // Cuộn mượt mà đến đúng vị trí
                        gsap.to(window, {duration: 1.5, scrollTo: targetScroll, ease: "power2.inOut"});
                    }
                }
            });
        });
    }

    // --- 7. GUESTBOOK (NÂNG CẤP LÊN FIREBASE) ---
    // Khởi tạo cấu hình (Dán phần code bạn copy ở Bước 1 vào đây)
    const firebaseConfig = {
        apiKey: "AIzaSyCzOoObrdCHZ_EhId-eYYrcPiQmP0dB6xc",
        authDomain: "a2k28-memories.firebaseapp.com",
        projectId: "a2k28-memories",
        storageBucket: "a2k28-memories.firebasestorage.app",
        messagingSenderId: "537440353527",
        appId: "1:537440353527:web:77f8e8936a01d2d75727f2",
        measurementId: "G-X92M9L8QVK"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    const notesEl = $("#notes");
    const gbBtn = $("#gbBtn");
    const colors = ["#fff7d1", "#ffd6d6", "#d7f3ff", "#e9ffd9", "#fff0f5"];
    
    const renderNote = (note) => {
        const el = document.createElement("div");
        el.className = "note";
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        el.innerHTML = `<div class="meta">${note.name}</div><div class="msg">${note.msg}</div>`;
        notesEl.prepend(el);
        gsap.from(el, { y: 20, opacity: 0, scale: 0.8, duration: 0.4, ease: "back.out(1.5)" });
    };

    if(gbBtn) {
        // Tự động kéo tin nhắn từ Firebase về hiển thị
        db.collection("main_board").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
            notesEl.innerHTML = ""; // Xóa bảng cũ
            
            // 1. IN LỜI NHẮN MẶC ĐỊNH ĐẦU TIÊN
            renderNote({ 
                name: "Ối Zồi Ôi Con Tôi Học A2", 
                msg: "Hãy để lại những dòng lưu bút thật đẹp tại đây nhé!" 
            });

            // 2. IN CÁC LỜI NHẮN TỪ DATABASE
            snapshot.forEach((doc) => {
                renderNote(doc.data());
            });
        });

        // Bắn dữ liệu lên Firebase khi click gửi
        gbBtn.addEventListener("click", () => {
            const name = $("#gbName").value || "Ẩn danh";
            const msg = $("#gbMsg").value;
            if(!msg) return alert("Viết gì đó đi cậu ơi!");

            // Hàm add() của Firebase sẽ tự động tạo ID và lưu
            db.collection("main_board").add({
                name: name,
                msg: msg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Lấy giờ chuẩn của máy chủ
            });

            $("#gbForm").reset();
            playSound('snd-click'); 
        });
    }
    
    // Petals
    const petalsWrap = $(".petals");
    if (petalsWrap) {
        petalsWrap.innerHTML = "";
        for (let i = 0; i < 16; i++) {
            const p = document.createElement("span");
            p.className = "petal";
            p.style.left = Math.random() * 100 + "%";
            p.style.animationDuration = (6 + Math.random() * 6).toFixed(2) + "s";
            p.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
            petalsWrap.appendChild(p);
        }
    }

    // ==========================================
    // HỆ THỐNG ÂM THANH (SOUND EFFECTS)
    // ==========================================
    const playSound = (id) => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.currentTime = 0; // Trả về đầu bài để spam click không bị lỗi
            audio.play().catch(e => console.log("Trình duyệt chặn autoplay âm thanh:", e));
        }
    };

    // 1. Âm thanh nút chung (Click mở/chuyển hướng)
    $$('.nav-btn, #mapBtn, .station, #gbBtn').forEach(btn => {
        btn.addEventListener('click', () => playSound('snd-click'));
    });

    // 2. Âm thanh nút đóng (Close)
    $$('#mapClose').forEach(btn => {
        btn.addEventListener('click', () => playSound('snd-close'));
    });

    // 3. Âm thanh khởi hành chuyến tàu
    const goLaneBtn = $("#goLaneBtn");
    if (goLaneBtn) {
        goLaneBtn.addEventListener('click', () => {
            playSound('snd-train');
        });
    }

    // 4. Âm thanh chụp ảnh khi click Card Thầy Cô
    // Vì card thầy cô được tạo bằng JS (động), ta phải bắt sự kiện click toàn trang
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.pin-label, .note-paper');
        if (card) {
            e.preventDefault(); // Chặn việc chuyển trang ngay lập tức
            playSound('snd-photo'); // Phát âm thanh tách cái
            
            const href = card.getAttribute('href');
            // Chờ 350ms cho âm thanh kêu xong rồi mới chuyển trang
            setTimeout(() => {
                window.location.href = href;
            }, 350); 
        }
    });

    $$('[data-link]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Chặn hành động mặc định
            const url = this.getAttribute('data-link');
            
            // Kích hoạt âm thanh click (nếu có gọi ở phần trên rồi thì có thể bỏ qua dòng playSound dưới đây)
            playSound('snd-click'); 

            // Đợi 300ms (0.3s) để nghe trọn vẹn âm thanh click rồi mới chuyển trang
            setTimeout(() => {
                window.location.href = url;
            }, 300); 
        });
    });
});

// ==========================================
    // KHIÊN PHÒNG THỦ: CHỐNG CHUỘT PHẢI & F12
    // ==========================================
    
    // 1. Chặn menu chuột phải (Context Menu)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // 2. Chặn các phím tắt phổ biến để mở DevTools và View Source
    document.addEventListener('keydown', function(e) {
        // Chặn F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Chặn Ctrl+Shift+I (Mở Inspect)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }

        // Chặn Ctrl+Shift+J (Mở Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }

        // Chặn Ctrl+Shift+C (Mở Inspect Element)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }

        // Chặn Ctrl+U (Mở View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
    });