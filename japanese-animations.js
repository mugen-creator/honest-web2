// Premium Japanese Animation Library
class JapaneseAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initSakuraAnimation();
        this.initWaterRipples();
        this.initKanjiReveal();
        this.initScrollParallax();
        this.initHoverEffects();
        this.initLoadingSequence();
    }

    // 桜の花びらアニメーション
    initSakuraAnimation() {
        const sakuraContainer = document.createElement('div');
        sakuraContainer.className = 'sakura-container';
        sakuraContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
            overflow: hidden;
        `;
        document.body.appendChild(sakuraContainer);

        const createPetal = () => {
            const petal = document.createElement('div');
            petal.className = 'sakura-petal';
            petal.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, #ffb3ba 0%, #ff6b7a 100%);
                border-radius: 150% 0 150% 0;
                opacity: 0.7;
                left: ${Math.random() * 100}%;
                top: -20px;
                animation: sakuraFall ${8 + Math.random() * 5}s linear;
            `;

            sakuraContainer.appendChild(petal);

            petal.addEventListener('animationend', () => {
                petal.remove();
            });
        };

        // 季節や時間によって頻度を調整
        const now = new Date();
        const month = now.getMonth();
        const isSakuraSeason = month >= 2 && month <= 4; // 3月-5月

        if (isSakuraSeason) {
            setInterval(createPetal, 500);  // 桜シーズンは0.5秒ごと
        } else {
            setInterval(createPetal, 800);   // 通常は0.8秒ごと
        }

        // CSSアニメーション追加
        if (!document.querySelector('#sakuraStyles')) {
            const style = document.createElement('style');
            style.id = 'sakuraStyles';
            style.textContent = `
                @keyframes sakuraFall {
                    0% {
                        transform: translateX(0) translateY(0) rotate(0deg);
                        opacity: 0.7;
                    }
                    25% {
                        transform: translateX(50px) translateY(25vh) rotate(90deg);
                    }
                    50% {
                        transform: translateX(-30px) translateY(50vh) rotate(180deg);
                        opacity: 0.5;
                    }
                    75% {
                        transform: translateX(40px) translateY(75vh) rotate(270deg);
                    }
                    100% {
                        transform: translateX(-20px) translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 水面の波紋エフェクト
    initWaterRipples() {
        const rippleElements = document.querySelectorAll('.hero, .philosophy-section');

        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                ripple.className = 'water-ripple';

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                ripple.style.cssText = `
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border: 2px solid rgba(111, 187, 211, 0.5);
                    border-radius: 50%;
                    left: ${x - 50}px;
                    top: ${y - 50}px;
                    pointer-events: none;
                    animation: rippleExpand 2s ease-out;
                `;

                element.appendChild(ripple);

                setTimeout(() => ripple.remove(), 2000);
            });
        });

        // リップルアニメーション
        if (!document.querySelector('#rippleStyles')) {
            const style = document.createElement('style');
            style.id = 'rippleStyles';
            style.textContent = `
                @keyframes rippleExpand {
                    0% {
                        width: 100px;
                        height: 100px;
                        opacity: 1;
                    }
                    100% {
                        width: 500px;
                        height: 500px;
                        opacity: 0;
                        transform: translate(-200px, -200px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 漢字の筆順アニメーション
    initKanjiReveal() {
        const kanjiElements = document.querySelectorAll('.value-kanji, .feature-icon');

        kanjiElements.forEach(kanji => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'strokeReveal 2s ease-out forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(kanji);
        });

        // 筆順アニメーション
        if (!document.querySelector('#kanjiStyles')) {
            const style = document.createElement('style');
            style.id = 'kanjiStyles';
            style.textContent = `
                @keyframes strokeReveal {
                    0% {
                        opacity: 0;
                        transform: scale(0.8) rotate(-5deg);
                        filter: blur(5px);
                    }
                    50% {
                        opacity: 0.5;
                        transform: scale(1.1) rotate(2deg);
                        filter: blur(2px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) rotate(0deg);
                        filter: blur(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // スクロールパララックス効果
    initScrollParallax() {
        const parallaxElements = [
            { selector: '.mountain-1', speed: 0.5 },
            { selector: '.mountain-2', speed: 0.7 },
            { selector: '.mountain-3', speed: 0.9 },
            { selector: '.cloud-1', speed: 0.3 },
            { selector: '.cloud-2', speed: 0.4 },
            { selector: '.vertical-text', speed: 0.6 }
        ];

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            parallaxElements.forEach(item => {
                const element = document.querySelector(item.selector);
                if (element) {
                    const translateY = scrollY * item.speed;
                    element.style.transform = `translateY(${translateY}px)`;
                }
            });
        });
    }

    // ホバーエフェクト（墨絵風）
    initHoverEffects() {
        const cards = document.querySelectorAll('.service-card, .about-feature');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                const inkBlot = document.createElement('div');
                inkBlot.className = 'ink-blot';
                inkBlot.style.cssText = `
                    position: absolute;
                    width: 0;
                    height: 0;
                    background: radial-gradient(circle, rgba(74, 124, 133, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 0;
                    animation: inkSpread 0.6s ease-out forwards;
                `;

                this.style.position = 'relative';
                this.appendChild(inkBlot);

                setTimeout(() => inkBlot.remove(), 600);
            });
        });

        // インク広がりアニメーション
        if (!document.querySelector('#inkStyles')) {
            const style = document.createElement('style');
            style.id = 'inkStyles';
            style.textContent = `
                @keyframes inkSpread {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        width: 120%;
                        height: 120%;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ローディングシーケンス（和風）
    initLoadingSequence() {
        const loader = document.querySelector('.loading-screen');
        if (!loader) return;

        // 筆で書くような効果
        const loaderText = loader.querySelector('.loader-text');
        if (loaderText) {
            const text = loaderText.textContent;
            loaderText.textContent = '';

            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.cssText = `
                    opacity: 0;
                    display: inline-block;
                    animation: brushWrite 0.5s ${index * 0.1}s ease-out forwards;
                `;
                loaderText.appendChild(span);
            });
        }

        // 筆文字アニメーション
        if (!document.querySelector('#brushStyles')) {
            const style = document.createElement('style');
            style.id = 'brushStyles';
            style.textContent = `
                @keyframes brushWrite {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) rotate(10deg);
                        filter: blur(10px);
                    }
                    50% {
                        opacity: 0.5;
                        filter: blur(5px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotate(0deg);
                        filter: blur(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 雪のアニメーション（冬季限定）
    initSnowAnimation() {
        const now = new Date();
        const month = now.getMonth();
        const isWinter = month === 11 || month === 0 || month === 1; // 12月-2月

        if (!isWinter) return;

        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        snowContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99;
        `;
        document.body.appendChild(snowContainer);

        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: white;
                border-radius: 50%;
                opacity: ${Math.random() * 0.6 + 0.4};
                left: ${Math.random() * 100}%;
                animation: snowfall ${Math.random() * 10 + 10}s linear;
            `;

            snowContainer.appendChild(snowflake);
            snowflake.addEventListener('animationend', () => snowflake.remove());
        };

        setInterval(createSnowflake, 1000);

        // 雪アニメーション
        if (!document.querySelector('#snowStyles')) {
            const style = document.createElement('style');
            style.id = 'snowStyles';
            style.textContent = `
                @keyframes snowfall {
                    0% {
                        transform: translateY(-100px) translateX(0);
                    }
                    100% {
                        transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new JapaneseAnimations();
});