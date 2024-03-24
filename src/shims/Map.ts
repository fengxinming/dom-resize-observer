type EntryShim = [any, any];

function findIndex(arr: any[], key: any) {
  let result = -1;
  arr.forEach((entry: EntryShim, index: number) => {
    if (entry[0] === key) {
      result = index;
      return false;
    }
  });
  return result;
}

class MapShim {
  private readonly entries_: EntryShim[] = [];

  get size() {
    return this.entries_.length;
  }

  clear(): void {
    this.entries_.splice(0);
  }

  delete(key: any): boolean {
    const { entries_ } = this;
    const index = findIndex(entries_, key);

    if (~index) {
      return !!entries_.splice(index, 1)[0];
    }
    return false;
  }

  forEach(callbackfn: (value: any, key: any, map: MapShim) => void, thisArg?: any): void {
    const { entries_ } = this;
    entries_.forEach((entry: EntryShim) => {
      if (thisArg) {
        callbackfn.call(thisArg, entry[1], entry[0], this);
      }
      else {
        callbackfn(entry[1], entry[0], this);
      }
    });
  }

  get(key: any): any {
    const { entries_ } = this;
    const index = findIndex(entries_, key);
    const entry = entries_[index];

    return entry && entry[1];
  }

  has(key: any): boolean {
    return !!~findIndex(this.entries_, key);
  }

  set(key: any, value: any): this {
    const { entries_ } = this;
    const index = findIndex(entries_, key);

    if (~index) {
      entries_[index][1] = value;
    }
    else {
      entries_.push([key, value]);
    }
    return this;
  }
}

export default typeof Map !== 'undefined'
  ? Map
  : MapShim;
