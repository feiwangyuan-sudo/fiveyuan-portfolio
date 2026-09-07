"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { site } from "@/lib/site";
import { freshOrder } from "@/lib/random";
import RandomIllustration from "@/components/random-illustration";

const GALLERY_PAGE_SIZE = 12;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m10 1.5 1.55 6.95L18.5 10l-6.95 1.55L10 18.5l-1.55-6.95L1.5 10l6.95-1.55L10 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d={direction === "left" ? "m12 4-6 6 6 6" : "m8 4 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const resetToTop = () => {
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    resetToTop();
    window.addEventListener("pageshow", resetToTop);
    return () => {
      window.removeEventListener("pageshow", resetToTop);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);
  const [photos, setPhotos] = useState<typeof site.gallery>([]);
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(photos.length / GALLERY_PAGE_SIZE);
  const visiblePhotos = photos.slice(page * GALLERY_PAGE_SIZE, (page + 1) * GALLERY_PAGE_SIZE);
  useEffect(() => { setPhotos(freshOrder(site.gallery, "fiveyuan-gallery-first")); }, []);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const selectedImage = selectedPhoto === null ? null : photos[selectedPhoto];

  const closeGallery = () => setSelectedPhoto(null);
  const showPrevious = () => {
    setSelectedPhoto((current) => current === null ? current : (current - 1 + site.gallery.length) % site.gallery.length);
  };
  const showNext = () => {
    setSelectedPhoto((current) => current === null ? current : (current + 1) % site.gallery.length);
  };

  useEffect(() => {
    if (selectedPhoto === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  return (
    <main>
      <nav className="nav shell" aria-label="主导航">
        <a href="#top" className="wordmark" aria-label="返回首页">
          <span className="wordmark-mark" />
          {site.name}
        </a>
        <div className="nav-links">
          <a href="#works">Works</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#links">Links</a>
        </div>
        <a className="nav-index" href="#links" aria-label="跳转到联系链接">
          01 <span>/</span> 01
        </a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> PERSONAL PORTFOLIO</p>
          <h1>{site.name}</h1>
          <p className="hero-description">Build things that people can feel.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#works">
              探索作品 <ArrowIcon />
            </a>
            <a className="button button-quiet" href="#links">保持联系</a>
          </div>
        </div>

        <RandomIllustration />

        <a className="scroll-hint" href="#works">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </a>
      </section>

      <section className="works-section shell" id="works">
        <div className="section-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <p className="section-index">01 — 01</p>
        </div>

        <article className="project-card">
          <div className="project-preview" aria-hidden="true">
            <div className="preview-glow" />
            <div className="browser">
              <div className="browser-top"><i /><i /><i /><span>Wowo Coffee</span></div>
              <div className="coffee-screen">
                <div className="coffee-side">
                  <b>W.</b>
                  <span />
                  <span />
                  <span />
                </div>
                <div className="coffee-content">
                  <p>Good morning,</p>
                  <h3>What&apos;s brewing?</h3>
                  <div className="coffee-items">
                    <div><em>☕</em><b>Oat Latte</b><small>¥28</small></div>
                    <div><em>◒</em><b>Cold Brew</b><small>¥25</small></div>
                    <div><em>◌</em><b>Flat White</b><small>¥26</small></div>
                  </div>
                </div>
                <div className="coffee-order">
                  <p>Your order</p>
                  <div><span>Oat Latte</span><b>¥28</b></div>
                  <div><span>Cold Brew</span><b>¥25</b></div>
                  <button>Checkout&nbsp; · &nbsp;¥53</button>
                </div>
              </div>
            </div>
            <div className="preview-note"><SparkIcon /> DESIGNED FOR A REAL FLOW</div>
          </div>

          <div className="project-content">
            <p className="eyebrow">{site.project.eyebrow}</p>
            <h2>{site.project.name}</h2>
            <p className="project-description">{site.project.description}</p>
            <div className="tags">
              {site.project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="project-links">
              <a className="text-link" href={site.project.liveUrl}>
                在线体验 <ArrowIcon />
              </a>
              <a className="text-link text-link-muted" href={site.project.sourceUrl}>
                查看源码 <ArrowIcon />
              </a>
            </div>
          </div>
        </article>
      </section>

      <section className="gallery-section shell" id="gallery" aria-label="照片墙">
        <div className="section-heading gallery-heading">
          <p className="eyebrow">PHOTO WALL</p>
          <p className="section-index">{String(site.gallery.length).padStart(2, "0")} IMAGES</p>
        </div>
        <div className="gallery-grid" id="gallery-images">
          {visiblePhotos.map((photo, index) => (
            <button
              className="gallery-item"
              key={photo.src}
              type="button"
              onClick={() => setSelectedPhoto(page * GALLERY_PAGE_SIZE + index)}
              aria-label={`查看第 ${index + 1} 张照片`}
            >
              <img src={photo.src} alt="" loading="lazy" decoding="async" />
              <span className="gallery-item-glow" aria-hidden="true" />
            </button>
          ))}
        </div>
        {pageCount > 1 && (
          <div className="gallery-load-more">
            <button className="button button-quiet" disabled={page === 0} onClick={() => setPage(page - 1)}>上一页</button>
            <span role="status">{page + 1} / {pageCount}</span>
            <button className="button button-quiet" disabled={page === pageCount - 1} onClick={() => setPage(page + 1)}>下一页</button>
          </div>
        )}
        <span className="gallery-status" role="status">
          已展示 {visiblePhotos.length} 张，共 {site.gallery.length} 张照片
        </span>
      </section>

      <section className="about-section shell" id="about">
        <p className="eyebrow">WHAT I BUILD</p>
        <div className="about-grid">
          <h2>从想法到可被<br />体验的产品。</h2>
          <div className="capabilities">
            <p>我专注于将 AI 能力、清晰的产品体验和可靠的全栈实现，组合成可真正使用的应用。</p>
            <ul>
              <li><span>01</span> AI Applications</li>
              <li><span>02</span> Full-stack Products</li>
              <li><span>03</span> Thoughtful Interfaces</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="links-section" id="links">
        <div className="shell">
          <div className="links-heading">
            <p className="eyebrow">SAY HELLO</p>
            <h2>在别处找到我。</h2>
          </div>
          <div className="link-list">
            {site.links.map((link, index) => (
              <a key={link.title} className="social-link" href={link.url} target="_blank" rel="noreferrer">
                <span className="social-number">0{index + 1}</span>
                <span className="social-name">{link.title}</span>
                <span className="social-handle">{link.handle}</span>
                <span className="social-symbol">{link.symbol}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <span>© 2026 {site.name}</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>

      {selectedImage && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="照片预览" onMouseDown={closeGallery}>
          <button className="lightbox-close" type="button" onMouseDown={(event) => event.stopPropagation()} onClick={closeGallery} aria-label="关闭预览">
            <CloseIcon />
          </button>
          <button className="lightbox-control lightbox-previous" type="button" onMouseDown={(event) => event.stopPropagation()} onClick={showPrevious} aria-label="上一张照片">
            <ChevronIcon direction="left" />
          </button>
          <img className="lightbox-image" src={selectedImage.src} alt="" onMouseDown={(event) => event.stopPropagation()} />
          <button className="lightbox-control lightbox-next" type="button" onMouseDown={(event) => event.stopPropagation()} onClick={showNext} aria-label="下一张照片">
            <ChevronIcon direction="right" />
          </button>
        </div>
      )}
    </main>
  );
}
