export enum AsyncStatus {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

export type AsyncData<T> = {
  status: AsyncStatus;
  data: T;
};
