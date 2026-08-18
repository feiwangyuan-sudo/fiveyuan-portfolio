import { site } from "@/lib/site";

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

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="主导航">
        <a href="#top" className="wordmark" aria-label="返回首页">
          <span className="wordmark-mark" />
          {site.name}
        </a>
        <div className="nav-links">
          <a href="#works">Works</a>
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

        <div className="hero-art" aria-label="抽象的科技插画">
          <div className="art-grid" />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-orb">
            <span />
            <span />
            <span />
          </div>
          <div className="art-label label-top">SYSTEM / ONLINE</div>
          <div className="art-label label-bottom">AI × FULL STACK</div>
          <div className="art-coordinate">35° 42′ N&nbsp;&nbsp; 139° 46′ E</div>
        </div>

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
    </main>
  );
}
