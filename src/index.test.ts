import AssociationTable from "./index";

describe("empty map", () => {
  const map = new AssociationTable();
  it("size", () => {
    expect(map.size).toBe(0);
  });
  it("clear", () => {
    map.clear();
    expect(map.size).toBe(0);
  });
  it("inspect", () => {
    expect(map.inspect()).toBe("AssociationTable {}");
  });
});

describe('single item {"A": 1}', () => {
  const map = new AssociationTable<string, number>();
  beforeEach(() => {
    map.clear();
    map.associate("A", 1);
  });
  it("inspect", () => {
    expect(map.inspect()).toBe("AssociationTable {A => 1}");
  });
  it("size", () => {
    expect(map.size).toBe(1);
  });
  it("get", () => {
    expect(map.get("A")).toMatchObject([1]);
  });
  it("getKey", () => {
    expect(map.getKey(1)).toMatchObject(["A"]);
  });
  it("getValue", () => {
    expect(map.getValue("A")).toMatchObject([1]);
  });
  it("associate", () => {
    map.associate("A", 2);
    expect(map.get("A")).toMatchObject([1, 2]);
  });
  it("clear", () => {
    map.clear();
    expect(map.size).toBe(0);
    expect(map.get("A")).toMatchObject([]);
  });
  it("delete", () => {
    map.delete("A");
    expect(map.size).toBe(0);
    expect(map.get("A")).toMatchObject([]);
  });
  it("deleteKey", () => {
    map.deleteKey("A");
    expect(map.size).toBe(0);
    expect(map.get("A")).toMatchObject([]);
  });
  it("deleteValue", () => {
    map.deleteValue(1);
    expect(map.size).toBe(0);
    expect(map.get("A")).toMatchObject([]);
  });
  it("forEach", () => {
    let iterations = 0;
    map.forEach((value, key, mapRef) => {
      iterations++;
      expect(key).toBe("A");
      expect(value).toBe(1);
      expect(mapRef.get(key)).toMatchObject([1]);
    });
    expect(iterations).toBe(map.size);
  });
  it("has", () => {
    expect(map.has("A")).toBe(true);
    expect(map.has("B")).toBe(false);
  });
  it("hasKey", () => {
    expect(map.hasKey("A")).toBe(true);
    expect(map.hasKey("B")).toBe(false);
  });
  it("hasValue", () => {
    expect(map.hasValue(1)).toBe(true);
    expect(map.hasValue(2)).toBe(false);
  });
});

describe("alphabet letter => index", () => {
  const map = new AssociationTable<string, number>();
  beforeEach(() => {
    for (let i = 1; i <= 26; i++) {
      map.associate(String.fromCharCode(i + 64), i);
    }
  });

  it("size", () => {
    expect(map.size).toBe(26);
  });
  it("inspect", () => {
    expect(map.inspect()).toBe(
      "AssociationTable {" +
        "A => 1, B => 2, C => 3, D => 4, E => 5, " +
        "F => 6, G => 7, H => 8, I => 9, J => 10, " +
        "K => 11, L => 12, M => 13, N => 14, O => 15, " +
        "P => 16, Q => 17, R => 18, S => 19, T => 20, " +
        "U => 21, V => 22, W => 23, X => 24, Y => 25, " +
        "Z => 26}"
    );
  });
  it("get", () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.get(String.fromCharCode(i + 64))).toMatchObject([i]);
    }
  });
  it("getKey", () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.getKey(i)).toMatchObject([String.fromCharCode(i + 64)]);
    }
  });
  it("getValue", () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.getValue(String.fromCharCode(i + 64))).toMatchObject([i]);
    }
  });
  it("associate", () => {
    for (let i = 1; i <= 26; i++) {
      map.associate(String.fromCharCode(i + 96), i);
    }
    expect(map.inspect()).toBe(
      "AssociationTable {" +
        "A => 1, B => 2, C => 3, D => 4, E => 5, " +
        "F => 6, G => 7, H => 8, I => 9, J => 10, " +
        "K => 11, L => 12, M => 13, N => 14, O => 15, " +
        "P => 16, Q => 17, R => 18, S => 19, T => 20, " +
        "U => 21, V => 22, W => 23, X => 24, Y => 25, " +
        "Z => 26, a => 1, b => 2, c => 3, d => 4, e => 5, " +
        "f => 6, g => 7, h => 8, i => 9, j => 10, k => 11, " +
        "l => 12, m => 13, n => 14, o => 15, p => 16, q => 17, " +
        "r => 18, s => 19, t => 20, u => 21, v => 22, w => 23, " +
        "x => 24, y => 25, z => 26}"
    );
  });

  it("clear", () => {
    map.clear();
    expect(map.size).toBe(0);
    for (let i = 1; i <= 26; i++) {
      expect(map.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
  });
  it("delete", () => {
    for (let i = 1; i <= 26; i++) {
      map.delete(String.fromCharCode(i + 64));
      expect(map.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
    expect(map.size).toBe(0);
  });
  it("deleteKey", () => {
    for (let i = 1; i <= 26; i++) {
      map.deleteKey(String.fromCharCode(i + 64));
      expect(map.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
    expect(map.size).toBe(0);
  });
  it("deleteValue", () => {
    for (let i = 1; i <= 26; i++) {
      map.deleteValue(i);
      expect(map.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
    expect(map.size).toBe(0);
  });
  it("forEach", () => {
    let iterations = 0;
    map.forEach((value, key, mapRef) => {
      iterations++;
      expect(map.get(key)).toMatchObject([value]);
      expect(map.getKey(value)).toMatchObject([key]);
      expect(mapRef.get(key)).toMatchObject([value]);
    });
    expect(iterations).toBe(map.size);
  });
  it("has", () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.has(String.fromCharCode(i + 64))).toBe(true); // A-Z
      expect(map.has(String.fromCharCode(i + 96))).toBe(false); // a-z
    }
  });
  it("hasKey", () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.hasKey(String.fromCharCode(i + 64))).toBe(true); // A-Z
      expect(map.hasKey(String.fromCharCode(i + 96))).toBe(false); // a-z
    }
  });
  it("hasValue", () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.hasValue(i)).toBe(true); // A-Z
      expect(map.hasValue(i + 100)).toBe(false); // a-z
    }
  });
});

describe("conflict scenarios", () => {
  it("{A => 1} followed by {A => 2} results in {A => 1, A => 2}", () => {
    const map = new AssociationTable<string, number>();
    map.associate("A", 1);
    map.associate("A", 2);
    expect(map.get("A")).toMatchObject([1, 2]);
    expect(map.getKey(1)).toMatchObject(["A"]);
    expect(map.getKey(2)).toMatchObject(["A"]);
    expect(map.size).toBe(2);
  });
  it("{A => 1} followed by {B => 1} results in {A => 1, B => 1} and getKey(1) = [A, B]", () => {
    const map = new AssociationTable<string, number>();
    map.associate("A", 1);
    map.associate("B", 1);
    expect(map.get("A")).toMatchObject([1]);
    expect(map.get("B")).toMatchObject([1]);
    expect(map.getKey(1)).toMatchObject(["A", "B"]);
    expect(map.size).toBe(2);
  });
  it("deleting 1 from {A => 1, B => 1} results in empty set", () => {
    const map = new AssociationTable<string, number>();
    map.associate("A", 1);
    map.associate("B", 1);
    map.deleteValue(1);
    expect(map.get("A")).toMatchObject([]);
    expect(map.get("B")).toMatchObject([]);
    expect(map.getKey(1)).toMatchObject([]);
    expect(map.size).toBe(0);
  });
  it("deleting A from {A => 1, B => 1} results in {B => 1}", () => {
    const map = new AssociationTable<string, number>();
    map.associate("A", 1);
    map.associate("B", 1);
    map.delete("A");
    expect(map.get("A")).toMatchObject([]);
    expect(map.get("B")).toMatchObject([1]);
    expect(map.getKey(1)).toMatchObject(["B"]);
    expect(map.size).toBe(1);
  });
  it("deleting 2 from {A => 1, B => 1, A => 2, A => 2} results in {A => 2, B => 2}", () => {
    const map = new AssociationTable<string, number>();
    map.associate("A", 1);
    map.associate("B", 1);
    map.associate("A", 2);
    map.associate("B", 2);
    map.deleteValue(1);
    expect(map.get("A")).toMatchObject([2]);
    expect(map.get("B")).toMatchObject([2]);
    expect(map.getKey(1)).toMatchObject([]);
    expect(map.getKey(2)).toMatchObject(["A", "B"]);
    expect(map.size).toBe(2);
  });
});
