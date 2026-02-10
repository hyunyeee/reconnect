import { MatchFormData } from "@/schemas/matchSchema";
import { MatchInfo, MatchChannel } from "@/hooks/query/useMatch";

export function toMatchFormData(info: MatchInfo, channel: MatchChannel): MatchFormData {
  if (channel === "insta") {
    return {
      channel: "insta",
      targetName: info.targetName,
      targetPhone: info.targetPhone,
      requesterDesire: info.requesterDesire,
      targetInsta: info.targetInsta ?? "",
    };
  }

  return {
    channel: "tiktok",
    targetName: info.targetName,
    targetPhone: info.targetPhone,
    requesterDesire: info.requesterDesire,
    targetTiktok: info.targetTiktok ?? "",
  };
}
