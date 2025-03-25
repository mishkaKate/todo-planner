export enum Filter {
  All = "All",
  Completed = "Completed",
  Active = "Active",
}

export class Task {
  text: string;
  isDone: boolean;

  constructor(text: string) {
    this.text = text;
    this.isDone = false;
  }
}
