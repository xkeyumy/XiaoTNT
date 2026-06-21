import LensEffect from "@/components/LensEffect";

export default function Home() {
  return (
    <main className="page-container">
      <div className="bg-glow" aria-hidden />
      <LensEffect />
      <footer className="footer-hint">
        <span className="hint-text">移动鼠标或触摸屏幕以体验透镜效果</span>
      </footer>
    </main>
  );
}
