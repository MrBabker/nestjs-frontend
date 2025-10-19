// pages/index.js
'use client'
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const [birdImg, setBirdImg] = useState(null);

  const bird = { x: 100, y: 200, width: 40, height: 30, velocity: 0 };
  const pipes = [];
  const gravity = 0.15; // خفف الجاذبية لتسهل التحكم
  const jump = -5;
  const pipeWidth = 80;
  const pipeGap = 350; // زود الفجوة لتسهيل المرور
  const pipeSpeed = 2;
  let score = 0;

  useEffect(() => {
    // تحميل صورة الطائر
    const img = new Image();
    img.src = "/bird.png"; // ضع صورة الطائر في public/bird.png
    img.onload = () => setBirdImg(img);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    // إنشاء أول أنبوب
    pipes.push({ x: canvas.width, gapY: Math.random() * (canvas.height - pipeGap - 100) + 50 });

    // التحكم بالنقر أو اللمس
    const handleMove = (e) => {
      bird.velocity = jump;
    };
    window.addEventListener("mousedown", handleMove);
    window.addEventListener("touchstart", handleMove);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // حركة الطائر
      bird.velocity += gravity;
      bird.y += bird.velocity;

      // رسم الطائر
      if (birdImg) ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
      else {
        ctx.fillStyle = "yellow";
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
      }

      // حركة ورسم الأنابيب
      pipes.forEach((p, i) => {
        p.x -= pipeSpeed;
        ctx.fillStyle = "green";
        ctx.fillRect(p.x, 0, pipeWidth, p.gapY);
        ctx.fillRect(p.x, p.gapY + pipeGap, pipeWidth, canvas.height - p.gapY - pipeGap);

        // تحقق الاصطدام
        if (
          bird.x + bird.width > p.x &&
          bird.x < p.x + pipeWidth &&
          (bird.y < p.gapY || bird.y + bird.height > p.gapY + pipeGap)
        ) {
          restart();
        }

        // تسجيل النقاط
        if (p.x + pipeWidth === bird.x) score += 1;
      });

      // إزالة الأنابيب القديمة وإضافة جديدة
      if (pipes[pipes.length - 1].x < canvas.width - 300) {
        pipes.push({ x: canvas.width, gapY: Math.random() * (canvas.height - pipeGap - 100) + 50 });
      }
      if (pipes[0].x + pipeWidth < 0) pipes.shift();

      // اصطدام بالأرض أو الأعلى
      if (bird.y + bird.height > canvas.height || bird.y < 0) restart();

      // عرض النقاط
      ctx.fillStyle = "black";
      ctx.font = "30px Arial";
      ctx.fillText("Score: " + score, 20, 50);

      animationId = requestAnimationFrame(gameLoop);
    };

    const restart = () => {
      bird.y = canvas.height / 2;
      bird.velocity = 0;
      pipes.length = 0;
      pipes.push({ x: canvas.width, gapY: Math.random() * (canvas.height - pipeGap - 100) + 50 });
      score = 0;
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousedown", handleMove);
      window.removeEventListener("touchstart", handleMove);
    };
  }, [birdImg]);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
}
