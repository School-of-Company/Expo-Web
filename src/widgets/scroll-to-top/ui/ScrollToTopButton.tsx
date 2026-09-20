"use client";

import Icon from "@/shared/ui/Icon";

export default function ScrollToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로 이동"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-fg-on-primary shadow-3 transition-colors duration-150 ease-out hover:bg-primary-60"
    >
      <Icon name="arrow-up" className="h-5 w-5" />
    </button>
  );
}
