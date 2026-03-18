document.addEventListener('DOMContentLoaded', () => {
    /*scroll*/
    const revealEls = document.querySelectorAll('.reveal, .reveal-left');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-left')];
                    const idx = siblings.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, idx * 100);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshol: 0.12, rootMargin: '0px 0px -40px 0px'}
    );
    revealEls.forEach(el => observer.observe(el));

    /*hero*/
     const heroTitle = document.querySelector('.hero__title');
     if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        requestAnimationFrame(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'none';
        });
     }

     /*smooth scroll*/
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
     });

     /*card tilt 3d*/
     document.querySelectorAll('.card, .team-card').forEach(card => {
        card.addEventListener('mausemove', (e) => {
            const rect= card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width /2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) *4;
            const rotY = ((x - cx) / cx) *-4;
            card.style.transform = 'translateY(-6px) perspective (800px) rotateX(${rotX}deg) rotateY(${rotY}deg)'
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
     });

     /*button ripple*/
     const rippleStyle = document.createElement('style');
     rippleStyle.textContent = '@keyframes ripple {to {transform: scale(2.5); opacity: 0;}}';
     document.head.appendChild(rippleStyle);

     document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position: absolute; width: ${size}px; height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255, 255, 255, 0.25); border-radius: 50%;
                transform: scale(0); animation: ripple 0.55s ease-out forwards;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.style.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
     });

     /*ticker pause al hover*/
     const ticker = document.querySelector('.tech__ticker-iner');
     if (ticker) {
        ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
        ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
     }

     /*parallax hero*/
     const heroBg = document.querySelector('.hero__bg-grid');
     window.addEventListener('scroll', () => {
        if (heroBg && window.scrollY < window.innerHeight) {
            heroBg.style.transform = 'translateY(${window.scrollY * 0.3}px)';
        }
     }, {passive: true});

     const gmailBtn = document.querySelector('.btn--gmail');
if (gmailBtn) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    gmailBtn.href = 'mailto:se.tech.solution07@mail.com?subject=Consulta%20S%26E%20Tech%20Solutions';
  } else {
    gmailBtn.href = 'https://mail.google.com/mail/?view=cm&to=se.tech.solution07@mail.com&su=Consulta%20S%26E%20Tech%20Solutions';
  }
}
});
