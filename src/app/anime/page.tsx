"use client";

import { useEffect, useState } from "react";
import { freshOrder } from "@/lib/random";

const illustrations = [1, 2, 3, 4].map((n) => ({ src: `/gallery/pink-character-0${n}.jpg` }));

export default function AnimePage() {
  const [current, setCurrent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  function refresh() {
    setFailed(false);
    setCurrent(freshOrder(illustrations.filter((image) => image.src !== current), "fiveyuan-anime-first")[0].src);
  }
  useEffect(() => { setCurrent(freshOrder(illustrations, "fiveyuan-anime-first")[0].src); }, []);
  return (
    <main className="anime-page shell">
      <a className="text-link" href="/#gallery">← 返回照片墙</a>
      <div className="anime-heading"><p className="eyebrow">RANDOM ILLUSTRATION</p><h1>偶遇一张心动。</h1></div>
      <div className="anime-frame">
        {current && !failed ? <img key={current} src={current} alt="二次元少女插画" onError={() => setFailed(true)} /> : <p role="status">{failed ? "图片加载失败，试试换一张。" : "正在准备插画…"}</p>}
      </div>
      <button className="button button-primary" onClick={refresh}>换一张 ↻</button>
      <p className="eyebrow">来自我的插画收藏</p>
    </main>
  );
}
