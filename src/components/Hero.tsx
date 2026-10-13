import Image from 'next/image'

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-6">
      <div className="grid items-center gap-6 rounded-2xl bg-base-100 p-6 shadow-sm ring-1 ring-base-300 sm:p-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-primary">আজকের বাজার দর</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে
          </h1>
          <p className="mt-3 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ ও মাংসের দেশজুড়ে বাজারভিত্তিক দাম জানুন। কোথায় দাম কমেছে,
            কোথায় বেড়েছে, সবই এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm mt-6 sm:btn-md">
            সব পণ্য দেখুন
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="ফল ও সবজিতে ভরা একটি ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-xs"
          />
        </div>
      </div>
    </section>
  )
}