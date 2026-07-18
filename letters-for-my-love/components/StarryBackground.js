import { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Create stars
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.angle += this.twinkleSpeed;
        this.opacity = 0.5 + 0.5 * Math.sin(this.angle);
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        
        // Glow for larger stars
        if (this.size > 1.5) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Create shooting stars
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 8 + 4;
        this.angle = Math.random() * Math.PI / 4 + Math.PI / 6;
        this.opacity = 1;
        this.active = false;
        this.timer = 0;
        this.waitTime = Math.random() * 5000 + 2000;
      }

      update() {
        if (!this.active) {
          this.timer += 16;
          if (this.timer > this.waitTime) {
            this.active = true;
            this.timer = 0;
          }
          return;
        }

        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.opacity -= 0.01;

        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        if (!this.active) return;
        
        const gradient = ctx.createLinearGradient(
          this.x, this.y,
          this.x - this.length * Math.cos(this.angle),
          this.y - this.length * Math.sin(this.angle)
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - this.length * Math.cos(this.angle),
          this.y - this.length * Math.sin(this.angle)
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bright tip
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create nebulae/aurora effect
    class Nebula {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.6 + canvas.height * 0.1;
        this.radius = Math.random() * 200 + 100;
        this.color = `hsla(${Math.random() * 40 + 270}, 80%, 50%, 0.05)`;
        this.speed = Math.random() * 0.2 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.angle += this.speed * 0.01;
        this.x += Math.sin(this.angle) * 0.2;
        this.y += Math.cos(this.angle) * 0.1;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `hsla(280, 80%, 60%, 0.08)`);
        gradient.addColorStop(0.5, `hsla(260, 70%, 40%, 0.05)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
      }
    }

    // Initialize stars
    for (let i = 0; i < 200; i++) {
      stars.push(new Star());
    }

    // Initialize shooting stars
    const shootingStars = [];
    for (let i = 0; i < 3; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Initialize nebulae
    const nebulae = [];
    for (let i = 0; i < 5; i++) {
      nebulae.push(new Nebula());
    }

    // Animation loop
    const animate = () => {
      // Dark royal purple gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0015');
      gradient.addColorStop(0.3, '#1a0033');
      gradient.addColorStop(0.6, '#2d004d');
      gradient.addColorStop(0.8, '#1a0033');
      gradient.addColorStop(1, '#0a0015');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach(nebula => {
        nebula.update();
        nebula.draw();
      });

      // Draw shooting stars
      shootingStars.forEach(star => {
        star.update();
        star.draw();
      });

      // Draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: '#0a0015' }}
    />
  );
}
