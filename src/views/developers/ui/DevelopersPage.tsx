import { developerProjects } from "@/entities/developer";
import DeveloperBoard from "./DeveloperBoard";

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <DeveloperBoard projects={developerProjects} />
    </div>
  );
}
