@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-white text-gray-900 antialiased;
  }
}

@layer components {
  .prose {
    @apply max-w-none;
  }
  
  .prose p {
    @apply mb-4 leading-relaxed;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-rose-300 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-rose-400;
}

/* Smooth loading transitions */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms ease-in;
}
/* Floating hearts animation for celebration */
@keyframes floatHeart {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  100% {
    transform: translateY(-110vh) rotate(720deg);
    opacity: 0;
  }
}