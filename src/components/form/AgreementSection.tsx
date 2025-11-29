"use client";

import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const AgreementSection = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const privacyAgree = !!watch("privacyAgree");
  const useAgree = !!watch("useAgree");
  const emailAgree = !!watch("emailAgree");

  const isAllChecked = privacyAgree && useAgree && emailAgree;

  const handleAllConsentClick = () => {
    const newValue = !isAllChecked;
    setValue("privacyAgree", newValue, { shouldValidate: true });
    setValue("useAgree", newValue, { shouldValidate: true });
    setValue("emailAgree", newValue);
  };

  const handleCheckClick = (
    field: "privacyAgree" | "useAgree" | "emailAgree",
    checked: boolean,
  ) => {
    setValue(field, checked, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* 전체 동의 */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="allAgree"
          checked={isAllChecked}
          onCheckedChange={() => handleAllConsentClick()}
        />
        <Label htmlFor="allAgree" className="cursor-pointer font-medium">
          전체동의
        </Label>
      </div>

      <div className="ml-1 h-px bg-gray-200" />

      {/* 개별 항목 */}
      <div className="ml-6 space-y-3 text-sm">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="useAgree"
            checked={useAgree}
            onCheckedChange={(checked) => handleCheckClick("useAgree", checked === true)}
          />
          <div>
            <Label htmlFor="useAgree">이용약관 동의 (필수)</Label>
            {errors.useAgree && (
              <p className="mt-1 text-xs text-red-500">{errors.useAgree.message as string}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="privacyAgree"
            checked={privacyAgree}
            onCheckedChange={(checked) => handleCheckClick("privacyAgree", checked === true)}
          />
          <div>
            <Label htmlFor="privacyAgree">개인정보 수집 및 이용 동의 (필수)</Label>
            {errors.privacyAgree && (
              <p className="mt-1 text-xs text-red-500">{errors.privacyAgree.message as string}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="emailAgree"
            checked={emailAgree}
            onCheckedChange={(checked) => handleCheckClick("emailAgree", checked === true)}
          />
          <div>
            <Label htmlFor="emailAgree">마케팅 활용 및 이메일 광고 수신 동의 (선택)</Label>
          </div>
        </div>
      </div>
    </div>
  );
};
