import RandomIllustration from "@/components/random-illustration";

export default function AnimePage() {
  return (
    <main className="anime-page shell">
      <a className="text-link" href="/#gallery">← 返回照片墙</a>
      <div className="anime-heading"><p className="eyebrow">RANDOM ILLUSTRATION</p><h1>偶遇一张心动。</h1></div>
      <RandomIllustration />
    </main>
  );
}
