"use client";

import { useState } from "react";

import Button from "@/shared/ui/Button";
import Icon from "@/shared/ui/Icon";
import Input from "@/shared/ui/Input";

interface PhoneVerifyProps {
  phone: string;
  onPhoneChange: (value: string) => void;
  verified: boolean;
  onVerified: (value: boolean) => void;
}

// TODO: 실제 인증 API 연동. 현재는 프로토타입이라 인증번호를 검증하지 않는다.
export default function PhoneVerify({ phone, onPhoneChange, verified, onVerified }: PhoneVerifyProps) {
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");

  return (
    <div>
      <div className="flex items-end gap-2">
        <Input
          id="phone"
          type="tel"
          label="휴대폰 번호"
          required
          value={phone}
          onChange={(event) => {
            onPhoneChange(event.target.value);
            onVerified(false);
            setSent(false);
          }}
          placeholder="'-' 없이 숫자만 입력"
          disabled={verified}
          className="w-full"
        />
        <Button
          type="button"
          size="s"
          disabled={verified || phone.length < 10}
          onClick={() => setSent(true)}
          className="shrink-0 text-body-xs"
        >
          인증번호 받기
        </Button>
      </div>

      {sent && !verified && (
        <>
          <div className="mt-2 flex items-end gap-2">
            <Input
              id="phone-code"
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="인증번호 6자리 (예시: 123456)"
              className="w-full"
            />
            <Button
              type="button"
              size="s"
              disabled={code.length < 4}
              onClick={() => onVerified(true)}
              className="shrink-0 text-body-xs"
            >
              인증확인
            </Button>
          </div>
          <p className="mt-1.5 text-body-xs text-fg-3">알림톡으로 인증번호가 발송되었습니다.</p>
        </>
      )}

      {verified && (
        <p className="mt-1.5 flex items-center gap-1 text-body-xs font-semibold text-success">
          <Icon name="check" className="h-3.5 w-3.5" /> 휴대폰 인증이 완료되었습니다.
        </p>
      )}
    </div>
  );
}
