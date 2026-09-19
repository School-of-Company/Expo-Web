"use client";

import { useState } from "react";
import { PhoneVerify } from "@/features/phone-verify";
import Button from "@/shared/ui/Button";
import Badge from "@/shared/ui/Badge";
import Icon from "@/shared/ui/Icon";
import { mockApplications, type Application } from "@/entities/application/model/data";

export default function ApplyLookupForm() {
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState(false);
  const [searched, setSearched] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  const search = () => {
    setApplications(phone.length >= 10 ? mockApplications : []);
    setSearched(true);
  };

  const cancel = (id: string) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: "취소됨" } : a)));
  };

  return (
    <div>
      <PhoneVerify phone={phone} onPhoneChange={setPhone} verified={verified} onVerified={setVerified} />
      <Button onClick={search} disabled={!verified} fullWidth className="mt-3">
        조회
      </Button>
      <p className="mt-2 text-body-xs text-fg-3">프로토타입 데모: 인증 완료 후 조회하면 예시 신청 내역이 표시됩니다.</p>

      {searched && (
        <div className="mt-8 space-y-3">
          {applications.length === 0 ? (
            <p className="rounded-xlarge border border-dashed border-border-default p-8 text-center text-body-s text-fg-3">
              조회된 신청 내역이 없습니다.
            </p>
          ) : (
            applications.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-4 rounded-large border border-border-default bg-bg-canvas p-5"
              >
                <div>
                  <p className="text-body-l font-bold text-fg-1">{a.program}</p>
                  <p className="mt-1 text-body-s text-fg-3">{a.date}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge variant={a.status === "취소됨" ? "outlined-tertiary" : "success"} className="gap-1 px-3 py-1.5">
                    <Icon name={a.status === "취소됨" ? "x-circle" : "check-circle"} className="h-3.5 w-3.5" />
                    {a.status}
                  </Badge>
                  {a.status === "신청완료" && (
                    /* TODO: Button에 danger variant가 생기면 교체한다. */
                    <button
                      type="button"
                      onClick={() => cancel(a.id)}
                      className="rounded-small border border-danger/30 px-3 py-1.5 text-body-xs font-semibold text-danger transition-colors duration-150 ease-out hover:bg-danger/10"
                    >
                      신청 취소
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
