import { POLL_STATUSES, POLL_TYPE } from "../../helpers/pollHelpers";

interface PollDataModelParams {
  Type: POLL_TYPE;
  Status: POLL_STATUSES;
  SubValue?: string | null;
  Value?: string | number | null;
  DailyLimit?: string | null;
}

export class PollDataModel {
  Type: POLL_TYPE;
  Status: POLL_STATUSES;
  SubValue: string | null;
  Value: string | number | null;
  DailyLimit: string | null;

  constructor({
    Type,
    Status,
    SubValue = null,
    Value = null,
    DailyLimit = null,
  }: PollDataModelParams) {
    this.Type = Type;
    this.Status = Status;
    this.SubValue = SubValue;
    this.Value = Value;
    this.DailyLimit = DailyLimit;
  }
}
