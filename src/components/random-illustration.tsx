"use client";

import { useEffect, useState } from "react";
import { illustrations } from "@/lib/illustrations";
import { freshOrder } from "@/lib/random";

type Illustration = (typeof illustrations)[number];

export default function RandomIllustration() {
  const [image, setImage] = useState<Illustration | null>(null);
  const [failed, setFailed] = useState(false);

  function refresh() {
    setFailed(false);
    const candidates = illustrations.filter((item) => item.src !== image?.src);
    setImage(freshOrder(candidates, "fiveyuan-curated-illustration")[0]);
  }

  useEffect(() => {
    setImage(freshOrder(illustrations, "fiveyuan-curated-illustration")[0]);
  }, []);

  return (
    <section className="hero-art random-illustration" aria-label="随机插画">
      <div className="illustration-top"><span>RANDOM / INSPIRATION</span><span className="pulse" /></div>
      <div className="illustration-canvas">
        {image && !failed && (
          <img src={image.src} alt="随机二次元少女插画" onError={() => setFailed(true)} />
        )}
        {(!image || failed) && (
          <p className="illustration-status" role="status">
            {failed ? "图片加载失败，点击换一张。" : "正在准备插画…"}
          </p>
        )}
      </div>
      <div className="illustration-bottom">
        <div className="illustration-credit">
          <a href="https://www.waifu.im/" target="_blank" rel="noreferrer">图片选自 Waifu.im</a>
          {image && <a href={image.source} target="_blank" rel="noreferrer">{image.artist} ↗</a>}
        </div>
        <button type="button" className="button button-primary" onClick={refresh}>
          {failed ? "重试 ↻" : "换一张 ↻"}
        </button>
      </div>
    </section>
  );
}
