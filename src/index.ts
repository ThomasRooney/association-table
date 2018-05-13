export interface IAssociationTable<K, V> {
  readonly size: number; // returns the total number of associations
  get: (key: K) => V[]; // returns associated values
  getKey: (value: V) => K[]; // returns associated keys
  getValue: (key: K) => V[]; // returns associated values
  associate: (key: K, value: V) => this; // adds an association between key and value
  clear: () => void; // resets the association table
  delete: (key: K) => boolean; // Deletes all associations related to the given key. Returns true if any associations existed and were been removed, or false if none were found.
  deleteKey: (key: K) => boolean; // Deletes all associations related to the given key. Returns true if any associations existed and were been removed, or false if none were found
  deleteValue: (value: V) => boolean; // Deletes all associations related to the given value. Returns true if any associations existed and were been removed, or false if none were found
  forEach: (
    callbackfn: (value: V, key: K, table: IAssociationTable<K, V>) => void,
    thisArg?: any
  ) => void; // executes the provided callback once for each association
  has: (key: K) => boolean; // Returns true if any associations with the specified key exists; otherwise false.
  hasKey: (key: K) => boolean; // Returns true if any associations with the specified key exists; otherwise false.
  hasValue: (value: V) => boolean; // Returns true if any associations with the specified value exists; otherwise false.
  [Symbol.toStringTag]: "AssociationTable"; // used in util.inspect / console.log
  inspect: () => string; // A utility function to inspect current contents as a string
}

class AssociationTable<K, V> implements IAssociationTable<K, V> {
  public [Symbol.toStringTag]: "AssociationTable";

  private associationsKToV: Map<K, V[]> = new Map<K, V[]>();
  private associationsVToK: Map<V, K[]> = new Map<V, K[]>();
  private numberOfAssociations = 0;

  get size() {
    return this.numberOfAssociations / 2; // number of associations should always be divisible by two
  }
  public get = (key: K) => Array.from(this.associationsKToV.get(key) || []); // Array.from used to keep the Map's array internal, avoiding possibility an array modification after API call
  public getKey = (value: V) =>
    Array.from(this.associationsVToK.get(value) || []); // Array.from used to keep the Map's array internal, avoiding possibility an array modification after API call
  public getValue = (key: K) => this.get(key);
  public associate = (key: K, value: V) => {
    let keyArray: K[] | undefined = this.associationsVToK.get(value);
    let valueArray: V[] | undefined = this.associationsKToV.get(key);

    if (!keyArray) {
      keyArray = [];
      this.associationsVToK.set(value, keyArray);
    }
    if (!valueArray) {
      valueArray = [];
      this.associationsKToV.set(key, valueArray);
    }

    if (!keyArray.includes(key)) {
      keyArray.push(key);
      this.numberOfAssociations += 1;
    }
    if (!valueArray.includes(value)) {
      valueArray.push(value);
      this.numberOfAssociations += 1;
    }
    return this;
  };
  public clear = () => {
    this.associationsKToV.clear();
    this.associationsVToK.clear();
    this.numberOfAssociations = 0;
  };
  public delete = (key: K) => {
    const valueArray: V[] | undefined = this.associationsKToV.get(key);

    if (!valueArray) {
      return false;
    }
    valueArray.forEach(value => {
      const keyArray = this.associationsVToK.get(value) as K[];
      this.numberOfAssociations -= 1;
      keyArray.splice(keyArray.indexOf(key), 1);
      if (keyArray.length === 0) {
        this.associationsVToK.delete(value);
      }
    });
    this.numberOfAssociations -= valueArray.length;
    this.associationsKToV.delete(key);
    return true;
  };
  public deleteKey = (key: K) => this.delete(key);
  public deleteValue = (value: V) => {
    const keyArray: K[] | undefined = this.associationsVToK.get(value);

    if (!keyArray) {
      return false;
    }
    keyArray.forEach(key => {
      const valueArray = this.associationsKToV.get(key) as V[];
      this.numberOfAssociations -= 1;
      valueArray.splice(valueArray.indexOf(value), 1);
      if (valueArray.length === 0) {
        this.associationsKToV.delete(key);
      }
    });
    this.numberOfAssociations -= keyArray.length;
    this.associationsVToK.delete(value);
    return true;
  };
  public forEach = (
    callbackfn: (value: V, key: K, table: IAssociationTable<K, V>) => void,
    thisArg?: any
  ) => {
    this.associationsKToV.forEach((valueArray, key) => {
      valueArray.forEach(value => {
        callbackfn.apply(thisArg, [value, key, this]);
      });
    });
  };
  public has = (key: K) => this.associationsKToV.has(key);
  public hasKey = (key: K) => this.has(key);
  public hasValue = (value: V) => this.associationsVToK.has(value);
  public hasAssociation(key: K, value: V) {
    this.get(key).includes(value);
  }
  public inspect = () => {
    let str = "AssociationTable {";
    let entry = 0;
    this.forEach((value, key) => {
      entry++;
      str += "" + key.toString() + " => " + value.toString() + "";
      if (entry < this.size) {
        str += ", ";
      }
    });
    str += "}";
    return str;
  };
}

export default AssociationTable;
