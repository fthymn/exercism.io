export class Clock {
  myDate = new Date(2000, 1, 1, 0, 0, 0);

  hour: number = 0;
  minute: number = 0;

  constructor(hour: number, minute: number = 0) {
    this.myDate.setUTCHours(this.myDate.getUTCHours() + hour);
    this.myDate.setUTCMinutes(this.myDate.getUTCMinutes() + minute);
  }

  public toString(): string {
    return this.myDate.toLocaleTimeString([], {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  public plus(minutes: number): Clock {
    this.myDate.setUTCMinutes(this.myDate.getUTCMinutes() + minutes);
    return this;
  }

  public minus(minutes: number): Clock {
    this.myDate.setUTCMinutes(this.myDate.getUTCMinutes() - minutes);
    return this;
  }

  public equals(other: Clock): boolean {
    return other.toString() == this.toString();
  }
}
