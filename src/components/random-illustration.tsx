"use client";
import { useCallback, useEffect, useRef, useState } from "react";
type Illustration = { id: number; url: string; source: string; artists: { name: string }[]; isNsfw: boolean };
export default function RandomIllustration() {
  const [image, setImage] = useState<Illustration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const previous = useRef<number | null>(null);
  const refresh = useCallback(async () => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    const timeout = setTimeout(() => request.abort(), 20000);
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams({ IncludedTags: "waifu", IsNsfw: "False", IsAnimated: "False", OrderBy: "Random", PageSize: "1", ByteSize: "<2000000" });
      let excluded = previous.current;
      try { excluded ??= Number(sessionStorage.getItem("fiveyuan-online-illustration")) || null; } catch {}
      if (excluded) params.set("ExcludedIds", String(excluded));
      const response = await fetch(`https://api.waifu.im/images?${params}`, { cache: "no-store", signal: request.signal });
      if (!response.ok) throw new Error("Image service unavailable");
      const data = await response.json();
      const next: Illustration = data.items?.[0];
      if (!next || next.isNsfw !== false || next.id === excluded || new URL(next.url).origin !== "https://cdn.waifu.im") throw new Error("Invalid image");
      await new Promise<void>((resolve, reject) => {
        const preload = new window.Image();
        const cleanup = () => { preload.onload = null; preload.onerror = null; request.signal.removeEventListener("abort", abort); };
        const abort = () => { cleanup(); preload.src = ""; reject(new Error("Aborted")); };
        preload.onload = () => { cleanup(); resolve(); };
        preload.onerror = () => { cleanup(); reject(new Error("Image load failed")); };
        request.signal.addEventListener("abort", abort, { once: true });
        if (request.signal.aborted) { abort(); return; }
        preload.src = next.url;
      });
      if (controller.current !== request || request.signal.aborted) return;
      previous.current = next.id;
      try { sessionStorage.setItem("fiveyuan-online-illustration", String(next.id)); } catch {}
      setImage(next);
    } catch {
      if (controller.current === request) setError("暂时没有加载成功，点击重试。");
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
    return () => { controller.current?.abort(); controller.current = null; };
  }, [refresh]);
  const source = image?.source?.startsWith("https://") ? image.source : "https://www.waifu.im/";
  return (
    <section className="hero-art random-illustration" aria-label="网络随机插画" aria-busy={loading}>
      <div className="illustration-top"><span>RANDOM / INSPIRATION</span><span className="pulse" /></div>
      <div className="illustration-canvas">
        {image && <img src={image.url} alt="随机二次元少女插画" />}
        {(loading || error) && <p className="illustration-status" role="status">{loading ? "正在寻找下一张心动…" : error}</p>}
      </div>
      <div className="illustration-bottom">
        <div className="illustration-credit">
          <a href="https://www.waifu.im/" target="_blank" rel="noreferrer">图片来自 Waifu.im</a>
          {image && <a href={source} target="_blank" rel="noreferrer">{image.artists?.map((artist) => artist.name).join(" / ") || "查看原图"} ↗</a>}
        </div>
        <button type="button" className="button button-primary" disabled={loading} onClick={() => void refresh()}>{loading ? "加载中…" : error ? "重试 ↻" : "换一张 ↻"}</button>
      </div>
    </section>
  );
}
