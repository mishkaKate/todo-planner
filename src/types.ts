export enum Filter {
  All = "All",
  Completed = "Completed",
  Active = "Active",
}

export class Task {
  text: string;
  isDone: boolean;
  id: string;

  constructor(text: string) {
    this.text = text;
    this.isDone = false;
    this.id = String(Math.random) + String(Date.now())
  }
}
