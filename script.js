/* 
   Speak With Joy — Healing & Joy Landing Page Interactive Logic
   Features: Header scroll, Mobile Nav, Voice simulator, Methodology wheel, Quiz scoring,
             Session card detail panels, Countdown, FAQ Accordion, Modal submission.
*/

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------- //
    // 1. HEADER & STICKY CTA SCROLL      //
    // ---------------------------------- //
    const header = document.querySelector('.header');
    const stickyCtaBar = document.getElementById('sticky-cta-bar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show sticky registration bar after scrolling down 300px
        if (window.scrollY > 300) {
            stickyCtaBar.classList.add('active');
        } else {
            stickyCtaBar.classList.remove('active');
        }
    });

    // ---------------------------------- //
    // 2. MOBILE NAVIGATION DRAWER        //
    // ---------------------------------- //
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
        
        // Rotate burger bar icon on active
        const spans = menuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ---------------------------------- //
    // 3. VOICE WAVE SIMULATOR WIDGET     //
    // ---------------------------------- //
    const voiceTestBtn = document.getElementById('voice-test-btn');
    const voiceBtnText = document.getElementById('voice-btn-text');
    const voiceWaveBars = document.querySelectorAll('.voice-wave-bar');
    const voiceStatusDot = document.querySelector('#voice-dot');
    const voiceTestPrompt = document.getElementById('voice-test-prompt');
    const voiceAnalysisResult = document.getElementById('voice-analysis-result');
    
    let isRecording = false;
    let waveInterval;
    
    if (voiceTestBtn) {
        voiceTestBtn.addEventListener('click', () => {
            if (!isRecording) {
                // Start Simulated Recording
                isRecording = true;
                voiceBtnText.innerText = "Đang ghi âm giọng của bạn...";
                voiceStatusDot.classList.add('recording');
                voiceTestPrompt.classList.remove('hidden');
                voiceAnalysisResult.classList.add('hidden');
                
                // Activate wave bars animations
                voiceWaveBars.forEach((bar, index) => {
                    bar.classList.add('active');
                    // Give random delay to simulate audio wave fluctuations
                    bar.style.animationDelay = `${index * 0.1}s`;
                });
                
                // Randomize height dynamics during simulated recording
                waveInterval = setInterval(() => {
                    voiceWaveBars.forEach(bar => {
                        const randomHeight = Math.floor(Math.random() * 75) + 15;
                        bar.style.setProperty('--h', `${randomHeight}px`);
                    });
                }, 100);
                
                // Stop and Analyze after 3.5 seconds
                setTimeout(() => {
                    stopVoiceSimulation();
                }, 3500);
                
            } else {
                // Reset state
                resetVoiceSimulation();
            }
        });
        
        function stopVoiceSimulation() {
            clearInterval(waveInterval);
            isRecording = false;
            voiceStatusDot.classList.remove('recording');
            
            // Disable wave animation classes
            voiceWaveBars.forEach(bar => {
                bar.classList.remove('active');
                bar.style.setProperty('--h', '30px'); // reset to calm state
            });
            
            // Display analysis result panel
            voiceTestPrompt.classList.add('hidden');
            voiceAnalysisResult.classList.remove('hidden');
            voiceBtnText.innerText = "Bắt đầu thử giọng lại";
        }
        
        function resetVoiceSimulation() {
            voiceAnalysisResult.classList.add('hidden');
            voiceTestPrompt.classList.remove('hidden');
            voiceBtnText.innerText = "Bắt đầu kiểm tra tiếng Anh";
            voiceWaveBars.forEach(bar => {
                bar.style.setProperty('--h', '25px');
            });
        }
    }

    // ---------------------------------- //
    // 4. INTERACTIVE METHODOLOGY WHEEL   //
    // ---------------------------------- //
    const wheelNodes = document.querySelectorAll('.wheel-node');
    const methodCards = document.querySelectorAll('.method-detail-card');
    let activeMethodIndex = 0;
    let autoRotationInterval;
    
    // Click Node Handler
    wheelNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            // Stop auto rotation once clicked
            clearInterval(autoRotationInterval);
            
            const targetId = node.getAttribute('data-target');
            activateMethodNode(targetId);
        });
    });
    
    function activateMethodNode(targetId) {
        // Toggle Active Node
        wheelNodes.forEach(n => {
            if (n.getAttribute('data-target') === targetId) {
                n.classList.add('active');
            } else {
                n.classList.remove('active');
            }
        });
        
        // Toggle Detail Card
        methodCards.forEach(card => {
            if (card.getAttribute('id') === targetId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    // Auto Rotation Carousel for Methodology Wheel
    function startMethodAutoRotation() {
        autoRotationInterval = setInterval(() => {
            activeMethodIndex = (activeMethodIndex + 1) % wheelNodes.length;
            const nextNode = wheelNodes[activeMethodIndex];
            const targetId = nextNode.getAttribute('data-target');
            activateMethodNode(targetId);
        }, 6000); // changes every 6s
    }
    
    startMethodAutoRotation();

    // ---------------------------------- //
    // 5. INTERACTIVE AUDIENCE QUIZ       //
    // ---------------------------------- //
    const quizStepPanels = document.querySelectorAll('.quiz-step');
    const quizPrevBtn = document.getElementById('quiz-prev-btn');
    const quizNextBtn = document.getElementById('quiz-next-btn');
    const quizProgress = document.getElementById('quiz-progress');
    const quizResultPanel = document.getElementById('quiz-result-panel');
    const quizRestartBtn = document.getElementById('quiz-restart-btn');
    
    // Archetype DOM targets
    const resultTitle = document.getElementById('result-archetype-title');
    const resultDesc = document.getElementById('result-archetype-description');
    const resultSuggest = document.getElementById('result-archetype-suggestion');
    
    let currentQuizStep = 1;
    const totalQuizSteps = 3;
    const quizAnswers = { q1: '', q2: '', q3: '' };
    
    // Check if current step has an answer to enable "Next" button
    function checkStepValidity() {
        const selectedOption = document.querySelector(`.quiz-step[data-step="${currentQuizStep}"] input[type="radio"]:checked`);
        quizNextBtn.disabled = !selectedOption;
    }
    
    // Add change listener to all radio options
    document.querySelectorAll('.quiz-option input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            quizAnswers[radio.name] = radio.value;
            checkStepValidity();
        });
    });
    
    // Quiz Navigation Controls
    quizNextBtn.addEventListener('click', () => {
        if (currentQuizStep < totalQuizSteps) {
            // Go to Next Step
            quizStepPanels.forEach(panel => {
                if (parseInt(panel.getAttribute('data-step')) === currentQuizStep + 1) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
            
            currentQuizStep++;
            quizPrevBtn.classList.remove('hidden');
            
            // Update Progress Bar
            const progressPct = (currentQuizStep / totalQuizSteps) * 100;
            quizProgress.style.width = `${progressPct}%`;
            
            // If it is the last step, change button text
            if (currentQuizStep === totalQuizSteps) {
                quizNextBtn.innerText = "Xem kết quả";
            }
            
            checkStepValidity();
        } else {
            // Process and Display Results
            showQuizResults();
        }
    });
    
    quizPrevBtn.addEventListener('click', () => {
        if (currentQuizStep > 1) {
            // Go to Prev Step
            quizStepPanels.forEach(panel => {
                if (parseInt(panel.getAttribute('data-step')) === currentQuizStep - 1) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
            
            currentQuizStep--;
            
            if (currentQuizStep === 1) {
                quizPrevBtn.classList.add('hidden');
            }
            
            quizNextBtn.innerText = "Tiếp tục";
            quizNextBtn.disabled = false;
            
            // Update Progress Bar
            const progressPct = (currentQuizStep / totalQuizSteps) * 100;
            quizProgress.style.width = `${progressPct}%`;
        }
    });
    
    function showQuizResults() {
        // Hide questions & nav buttons
        document.querySelector('.quiz-question-container').classList.add('hidden');
        quizPrevBtn.classList.add('hidden');
        quizNextBtn.classList.add('hidden');
        quizProgress.parentElement.classList.add('hidden');
        
        // Analyze answers
        // A corresponds to Logic/Technical block
        // B corresponds to EQ block
        // C corresponds to Traditional Loop block
        let countA = 0, countB = 0, countC = 0;
        
        Object.values(quizAnswers).forEach(val => {
            if (val === 'A') countA++;
            if (val === 'B') countB++;
            if (val === 'C') countC++;
        });
        
        let archetype = '';
        
        // Find dominant answer
        if (countA >= countB && countA >= countC) {
            archetype = 'logic';
        } else if (countB >= countA && countB >= countC) {
            archetype = 'eq';
        } else {
            archetype = 'traditional';
        }
        
        // Set content dynamically
        if (archetype === 'logic') {
            resultTitle.innerText = "Học viên Kỹ Sư Logic (Technical Logical Block)";
            resultDesc.innerText = "Bạn có đầu óc logic, đọc tài liệu chuyên ngành tốt nhưng gặp khó khăn khi phản xạ nói. Bạn thường học vẹt từ vựng, lắp ráp ngữ pháp như xếp hình LEGO nên câu nói bị khô khan, gượng gạo, thiếu nhạc điệu cảm xúc tự nhiên.";
            resultSuggest.innerHTML = "Lộ trình phù hợp nhất với bạn là <strong>Gói Premium (Group Coaching)</strong>. Kỹ thuật Kịch ứng tác (Ma Sói) và kích hoạt não phải sẽ bẻ gãy tư duy dịch logic chậm, giúp bạn nói tiếng Anh mượt mà, cảm xúc hơn.";
            
            // Pre-select group in contact form
            document.getElementById('reg-archetype').value = 'logic';
        } else if (archetype === 'eq') {
            resultTitle.innerText = "Người Nhạy Cảm EQ Cao (Unexpressed Emotional Voice)";
            resultDesc.innerText = "Bạn là người có EQ tốt, giao tiếp tiếng Việt truyền cảm nhưng khi nói tiếng Anh lại gặp rào cản tâm lý cực lớn. Bạn sợ nói sai, sợ phán xét dẫn đến tình trạng bị đơ, gượng gạo và bị đè nén năng lượng biểu cảm.";
            resultSuggest.innerHTML = "Bạn rất phù hợp với <strong>Gói Premium hoặc VVIP (Coach 1-1)</strong>. Phương pháp EQ & Nhật ký cảm xúc của Speak With Joy sẽ chữa lành nỗi sợ nói, khơi dậy sự tự tin để bạn đưa nguồn năng lượng ấm áp của mình vào tiếng Anh.";
            
            // Pre-select group in contact form
            document.getElementById('reg-archetype').value = 'eq';
        } else {
            resultTitle.innerText = "Học Viên Loay Hoay Truyền Thống (Traditional Center Hopper)";
            resultDesc.innerText = "Bạn đã đầu tư đi học ở nhiều trung tâm nhưng vẫn quay lại điểm xuất phát khi dừng học. Bạn đang phụ thuộc vào Google Translate hoặc ChatGPT, tích luỹ thêm lý thuyết từ vựng nhưng thiếu phương pháp học tập gốc.";
            resultSuggest.innerHTML = "Bạn cần <strong>Gói Standard hoặc Premium</strong>. Chương trình sẽ dạy bạn phương pháp học tập gốc tự chủ để xây dựng cuốn cẩm nang riêng và tối ưu hoá AI hiệu quả trọn đời.";
            
            // Pre-select group in contact form
            document.getElementById('reg-archetype').value = 'traditional';
        }
        
        // Show result panel
        quizResultPanel.classList.remove('hidden');
    }
    
    // Restart Quiz
    quizRestartBtn.addEventListener('click', () => {
        // Reset state
        currentQuizStep = 1;
        quizAnswers.q1 = '';
        quizAnswers.q2 = '';
        quizAnswers.q3 = '';
        
        // Uncheck all radios
        document.querySelectorAll('.quiz-option input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Reset panels
        quizResultPanel.classList.add('hidden');
        document.querySelector('.quiz-question-container').classList.remove('hidden');
        quizProgress.parentElement.classList.remove('hidden');
        quizProgress.style.width = '33%';
        
        quizStepPanels.forEach((panel, index) => {
            if (index === 0) panel.classList.remove('hidden');
            else panel.classList.add('hidden');
        });
        
        quizNextBtn.innerText = "Tiếp tục";
        quizNextBtn.classList.remove('hidden');
        quizNextBtn.disabled = true;
        quizPrevBtn.classList.add('hidden');
    });

    // ---------------------------------- //
    // 6. PERSISTENT COUNTDOWN TIMER      //
    // ---------------------------------- //
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Set a persistent target countdown date in localStorage
    // 3 days from the first time the user visits
    let countdownTarget = localStorage.getItem('speak_with_joy_countdown');
    
    if (!countdownTarget) {
        const now = new Date();
        const threeDaysLater = now.getTime() + (3 * 24 * 60 * 60 * 1000);
        localStorage.setItem('speak_with_joy_countdown', threeDaysLater);
        countdownTarget = threeDaysLater;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownTarget - now;
        
        if (distance < 0) {
            // Reset countdown target to look alive if it expires
            const newTarget = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
            localStorage.setItem('speak_with_joy_countdown', newTarget);
            countdownTarget = newTarget;
            return;
        }
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output values formatted
        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ---------------------------------- //
    // 7. SESSION CARD DETAIL PANELS      //
    // ---------------------------------- //
    const sessionCards = document.querySelectorAll('.session-card');
    const sessionDetailPanel = document.getElementById('session-detail-panel');

    const sessionData = {
        s1: {
            icon: '😊', num: 'SESSION 1',
            title: 'Speak With Joy - Tiếng Anh Hạnh Phúc',
            quote: '"Làm chủ Tiếng Anh từ nền tảng độc lập, tự tin, hạnh phúc"',
            desc: 'Giải phóng nỗi sợ giao tiếp, khơi dậy cảm hứng và xây dựng nền tảng tiếng Anh vững chắc từ gốc rễ. Bạn học cách làm chủ ngôn ngữ từ bên trong để nói tiếng Anh một cách độc lập, tự tin và tràn đầy hạnh phúc thực sự.',
            img: 'picnic.jpg'
        },
        s2: {
            icon: '🎵', num: 'SESSION 2',
            title: 'Speaking Speed & Rhythm',
            quote: '"Find your pace. Sound natural."',
            desc: 'Luyện tập nhịp điệu tiếng Anh và ngắt nghỉ đúng chỗ. Không còn tình trạng nói quá nhanh như robot hoặc quá chậm ê a. Bạn tìm được nhịp tự nhiên của mình, tạo cảm giác thoải mái và dễ chịu cho người nghe.'
        },
        s3: {
            icon: '💚', num: 'SESSION 3',
            title: 'Expressive Voice & Emotions',
            quote: '"Bring your voice to life."',
            desc: 'Đưa EQ và cảm xúc chân thật vào giọng nói tiếng Anh. Giải phóng rào cản tâm lý gượng gạo, học cách biểu đạt bằng tông giọng lên xuống giàu năng lượng cảm xúc — nói tiếng Anh mà người nghe cảm nhận được sự ấm áp và thành thật của bạn.'
        },
        s4: {
            icon: '📖', num: 'SESSION 4',
            title: 'Storytelling in Action',
            quote: '"Connect. Engage. Inspire."',
            desc: 'Ứng dụng tư duy Đạo diễn - Biên kịch để kể câu chuyện của mình bằng tiếng Anh. Kết nối sâu sắc và thu hút người đối diện thay vì chỉ trao đổi thông thường. Bạn sẽ biết cách mở đầu, xây dựng và kết thúc câu chuyện có sức hút.'
        },
        s5: {
            icon: '🌿', num: 'SESSION 5',
            title: 'Healing Voice & Resonance',
            quote: '"Speak to calm. Speak to heal."',
            desc: 'Nhận diện và chữa lành nỗi sợ giao tiếp tiếng Anh. Học cách sử dụng giọng nói có âm sắc ấm áp, tạo dựng niềm tin và sự bình an cho người nghe. Giọng nói của bạn sẽ trở thành công cụ chữa lành và kết nối tâm hồn.'
        },
        s6: {
            icon: '✨', num: 'SESSION 6',
            title: 'Inspiration & Impact',
            quote: '"Leave a lasting impression."',
            desc: 'Trình diễn tiếng Anh truyền cảm hứng. Tích hợp toàn diện các kỹ năng, rèn luyện kịch ứng tác linh hoạt để ứng biến tốt mọi tình huống đột xuất. Học viên trình bày một mini-performance tiếng Anh đầy tự tin và cảm xúc thật sự.'
        }
    };

    sessionCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-session');
            const data = sessionData[key];

            if (!data) return;

            // Highlight active card
            sessionCards.forEach(c => c.style.borderColor = '');
            card.style.borderColor = 'var(--jade)';

            // Populate panel
            document.getElementById('detail-icon').textContent = data.icon;
            document.getElementById('detail-session-num').textContent = data.num;
            document.getElementById('detail-title').textContent = data.title;
            document.getElementById('detail-quote').textContent = data.quote;
            document.getElementById('detail-desc').textContent = data.desc;

            // Show/Hide image
            const imgBox = document.getElementById('detail-image-box');
            const imgEl = document.getElementById('detail-img');
            if (data.img) {
                imgEl.src = data.img;
                imgBox.style.display = 'block';
            } else {
                imgBox.style.display = 'none';
                imgEl.src = '';
            }

            // Show panel
            sessionDetailPanel.classList.add('active');

            // Smooth scroll to panel
            setTimeout(() => {
                sessionDetailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    });

    // ---------------------------------- //
    // 8. ACCORDION FAQ SYSTEM            //
    // ---------------------------------- //
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            
            // If item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });

    // ---------------------------------- //
    // 9. REGISTRATION MODAL FORM LOGIC  //
    // ---------------------------------- //
    const registerModal = document.getElementById('register-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const successCloseBtn = document.getElementById('success-close-btn');
    const registerTriggers = document.querySelectorAll('.register-trigger-btn, .nav-cta, .mobile-cta');
    const registerForm = document.getElementById('register-form');
    const formSuccessState = document.getElementById('modal-success-state');
    const packageSelect = document.getElementById('reg-package');
    
    // Open Modal and pre-select appropriate package
    registerTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const pkg = trigger.getAttribute('data-package');
            
            if (pkg) {
                packageSelect.value = pkg;
            }
            
            registerModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        });
    });
    
    function closeModal() {
        registerModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock scroll
        
        // Reset form success screen after modal closed
        setTimeout(() => {
            registerForm.classList.remove('hidden');
            formSuccessState.classList.add('hidden');
            registerForm.reset();
        }, 400);
    }
    
    modalCloseBtn.addEventListener('click', closeModal);
    successCloseBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside overlay
    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            closeModal();
        }
    });
    
    // Form Submission Handling
    const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzp7rNs9MQsMX7rajC0Brd_uKiky-boxjE9RFzUz2kuSUl7E1ZIHL2ZmKTG-IqUlSytMQ/exec"; // Dán URL Google Apps Script Web App của bạn vào đây

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = registerForm.querySelector('.modal-submit-btn');
        const originalBtnText = submitBtn.innerText;
        
        // Loading state on button
        submitBtn.disabled = true;
        submitBtn.innerText = "Đang gửi đăng ký...";
        
        if (GOOGLE_SHEET_WEB_APP_URL && GOOGLE_SHEET_WEB_APP_URL !== "") {
            fetch(GOOGLE_SHEET_WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(new FormData(registerForm)).toString()
            })
            .then(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                
                // Show Success UI
                registerForm.classList.add('hidden');
                formSuccessState.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Lỗi khi gửi dữ liệu lên Google Sheet:', error);
                // Fallback to success state to keep a smooth user experience
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                registerForm.classList.add('hidden');
                formSuccessState.classList.remove('hidden');
            });
        } else {
            // Simulate API post response (demo mode)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                
                // Show Success UI
                registerForm.classList.add('hidden');
                formSuccessState.classList.remove('hidden');
            }, 1200);
        }
    });

    // ---------------------------------- //
    // 10. TESTIMONIAL GALLERY & LIGHTBOX //
    // ---------------------------------- //
    const toggleTestimonialsBtn = document.getElementById('toggle-testimonials-btn');
    const hiddenTestimonials = document.querySelectorAll('.testimonial-item.hidden-item');
    let isTestimonialsExpanded = false;

    if (toggleTestimonialsBtn) {
        toggleTestimonialsBtn.addEventListener('click', () => {
            isTestimonialsExpanded = !isTestimonialsExpanded;
            
            hiddenTestimonials.forEach(item => {
                if (isTestimonialsExpanded) {
                    item.classList.remove('hidden-item');
                } else {
                    item.classList.add('hidden-item');
                }
            });

            const btnText = toggleTestimonialsBtn.querySelector('span');
            if (isTestimonialsExpanded) {
                btnText.innerText = "Thu Gọn Lại";
                toggleTestimonialsBtn.classList.add('active');
            } else {
                btnText.innerText = "Xem Thêm Feedback Thực Tế";
                toggleTestimonialsBtn.classList.remove('active');
                // Scroll back to testimonials section top
                document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentImageIndex = 0;

    if (lightboxModal && lightboxImg) {
        // Function to show image in lightbox
        function showImageInLightbox(index) {
            if (index < 0 || index >= testimonialItems.length) return;
            currentImageIndex = index;
            const img = testimonialItems[index].querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        }

        // Open lightbox
        testimonialItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                showImageInLightbox(index);
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock scrolling
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightboxModal.classList.remove('active');
            // Only unlock scrolling if register modal is also closed
            const regModal = document.getElementById('register-modal');
            if (!regModal || !regModal.classList.contains('active')) {
                document.body.style.overflow = 'auto';
            }
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightboxModal.addEventListener('click', (e) => {
            // Close if click is outside the image and navigation buttons
            if (e.target === lightboxModal || e.target === lightboxModal.querySelector('.lightbox-content')) {
                closeLightbox();
            }
        });

        // Navigate images
        function navigateLightbox(direction) {
            let newIndex = currentImageIndex + direction;
            if (newIndex < 0) {
                newIndex = testimonialItems.length - 1; // Wrap around to end
            } else if (newIndex >= testimonialItems.length) {
                newIndex = 0; // Wrap around to start
            }
            showImageInLightbox(newIndex);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(-1);
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(1);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        });

        // Touch/Swipe Support for Mobile
        let touchStartX = 0;
        let touchEndX = 0;

        lightboxModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightboxModal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, { passive: true });

        function handleSwipeGesture() {
            const swipeThreshold = 50; // min distance in px
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe Left -> Next Image
                navigateLightbox(1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe Right -> Prev Image
                navigateLightbox(-1);
            }
        }
    }
});
