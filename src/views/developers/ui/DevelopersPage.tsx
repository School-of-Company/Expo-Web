import { developerProjects } from "@/entities/developer/model/data";
import DeveloperBoard from "./DeveloperBoard";

/** 소개 패널이 페이지 제목 역할을 하므로 다른 섹션 페이지와 달리 PageHero를 두지 않는다. */
export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <DeveloperBoard projects={developerProjects} />
    </div>
  );
}
