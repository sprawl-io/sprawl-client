export class Task {
  taskId: string;
  owner: string;
  title: string;
  body: string;
  expDuration: number;
  workedTime: number;
  isFinished: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastWorkStartAt: string;
}
