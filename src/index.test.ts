import AssociationTable from './index';

describe('empty map', () => {
  const map = new AssociationTable();
  it('size', () => {
    expect(map.size).toBe(0);
  });
  it('clear', () => {
    map.clear();
    expect(map.size).toBe(0);
  });
  it('inspect', () => {
    expect(map.inspect()).toBe('AssociationTable {}');
  });
});

describe('single item {"A": 1}', () => {
  const table = new AssociationTable<string, number>();
  beforeEach(() => {
    table.clear();
    table.associate('A', 1);
  });
  it('inspect', () => {
    expect(table.inspect()).toBe('AssociationTable {A => 1}');
  });
  it('size', () => {
    expect(table.size).toBe(1);
  });
  it('get', () => {
    expect(table.get('A')).toMatchObject([1]);
  });
  it('getKey', () => {
    expect(table.getKey(1)).toMatchObject(['A']);
  });
  it('getValue', () => {
    expect(table.getValue('A')).toMatchObject([1]);
  });
  it('associate', () => {
    table.associate('A', 2);
    expect(table.get('A')).toMatchObject([1, 2]);
  });
  it('clear', () => {
    table.clear();
    expect(table.size).toBe(0);
    expect(table.get('A')).toMatchObject([]);
  });
  it('delete', () => {
    table.delete('A');
    expect(table.size).toBe(0);
    expect(table.get('A')).toMatchObject([]);
  });
  it('deleteKey', () => {
    table.deleteKey('A');
    expect(table.size).toBe(0);
    expect(table.get('A')).toMatchObject([]);
  });
  it('deleteValue', () => {
    table.deleteValue(1);
    expect(table.size).toBe(0);
    expect(table.get('A')).toMatchObject([]);
  });
  it('forEach', () => {
    let iterations = 0;
    table.forEach((value, key, mapRef) => {
      iterations++;
      expect(key).toBe('A');
      expect(value).toBe(1);
      expect(mapRef.get(key)).toMatchObject([1]);
    });
    expect(iterations).toBe(table.size);
  });
  it('map', () => {
    let iterations = 0;
    const result = table.map((value, key, mapRef) => {
      iterations++;
      expect(key).toBe('A');
      expect(value).toBe(1);
      expect(mapRef.get(key)).toMatchObject([1]);
      return value;
    });
    expect(iterations).toBe(table.size);
    expect(result).toMatchObject([1]);
  });
  it('filter', () => {
    const table1 = table.filter(() => false);
    expect(table1.size).toBe(0);
    expect(table1).not.toEqual(table);
    const table2 = table.filter(() => true);
    expect(table2.size).toBe(1);
  });
  it('has', () => {
    expect(table.has('A')).toBe(true);
    expect(table.has('B')).toBe(false);
  });
  it('hasKey', () => {
    expect(table.hasKey('A')).toBe(true);
    expect(table.hasKey('B')).toBe(false);
  });
  it('hasValue', () => {
    expect(table.hasValue(1)).toBe(true);
    expect(table.hasValue(2)).toBe(false);
  });
});

describe('alphabet letter => index', () => {
  const table = new AssociationTable<string, number>();
  beforeEach(() => {
    for (let i = 1; i <= 26; i++) {
      table.associate(String.fromCharCode(i + 64), i);
    }
  });

  it('size', () => {
    expect(table.size).toBe(26);
  });
  it('inspect', () => {
    expect(table.inspect()).toBe(
      'AssociationTable {' +
        'A => 1, B => 2, C => 3, D => 4, E => 5, ' +
        'F => 6, G => 7, H => 8, I => 9, J => 10, ' +
        'K => 11, L => 12, M => 13, N => 14, O => 15, ' +
        'P => 16, Q => 17, R => 18, S => 19, T => 20, ' +
        'U => 21, V => 22, W => 23, X => 24, Y => 25, ' +
        'Z => 26}'
    );
  });
  it('get', () => {
    for (let i = 1; i <= 26; i++) {
      expect(table.get(String.fromCharCode(i + 64))).toMatchObject([i]);
    }
  });
  it('getKey', () => {
    for (let i = 1; i <= 26; i++) {
      expect(table.getKey(i)).toMatchObject([String.fromCharCode(i + 64)]);
    }
  });
  it('getValue', () => {
    for (let i = 1; i <= 26; i++) {
      expect(table.getValue(String.fromCharCode(i + 64))).toMatchObject([i]);
    }
  });
  it('associate', () => {
    for (let i = 1; i <= 26; i++) {
      table.associate(String.fromCharCode(i + 96), i);
    }
    expect(table.inspect()).toBe(
      'AssociationTable {' +
        'A => 1, B => 2, C => 3, D => 4, E => 5, ' +
        'F => 6, G => 7, H => 8, I => 9, J => 10, ' +
        'K => 11, L => 12, M => 13, N => 14, O => 15, ' +
        'P => 16, Q => 17, R => 18, S => 19, T => 20, ' +
        'U => 21, V => 22, W => 23, X => 24, Y => 25, ' +
        'Z => 26, a => 1, b => 2, c => 3, d => 4, e => 5, ' +
        'f => 6, g => 7, h => 8, i => 9, j => 10, k => 11, ' +
        'l => 12, m => 13, n => 14, o => 15, p => 16, q => 17, ' +
        'r => 18, s => 19, t => 20, u => 21, v => 22, w => 23, ' +
        'x => 24, y => 25, z => 26}'
    );
  });

  it('clear', () => {
    table.clear();
    expect(table.size).toBe(0);
    for (let i = 1; i <= 26; i++) {
      expect(table.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
  });
  it('delete', () => {
    for (let i = 1; i <= 26; i++) {
      table.delete(String.fromCharCode(i + 64));
      expect(table.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
    expect(table.size).toBe(0);
  });
  it('deleteKey', () => {
    for (let i = 1; i <= 26; i++) {
      table.deleteKey(String.fromCharCode(i + 64));
      expect(table.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
    expect(table.size).toBe(0);
  });
  it('deleteValue', () => {
    for (let i = 1; i <= 26; i++) {
      table.deleteValue(i);
      expect(table.get(String.fromCharCode(i + 64))).toMatchObject([]);
    }
    expect(table.size).toBe(0);
  });
  it('forEach', () => {
    let iterations = 0;
    table.forEach((value, key, mapRef) => {
      iterations++;
      expect(table.get(key)).toMatchObject([value]);
      expect(table.getKey(value)).toMatchObject([key]);
      expect(mapRef.get(key)).toMatchObject([value]);
    });
    expect(iterations).toBe(table.size);
  });
  it('map', () => {
    let iterations = 0;
    const result = table.map((value, key, mapRef) => {
      iterations++;
      expect(table.get(key)).toMatchObject([value]);
      expect(table.getKey(value)).toMatchObject([key]);
      expect(mapRef.get(key)).toMatchObject([value]);
      return value;
    });
    expect(result).toMatchObject(Array.from(Array(26), (_, i) => i + 1));
    expect(iterations).toBe(table.size);
  });
  it('filter', () => {
    let iterations = 0;
    const table1 = table.filter((value, key, mapRef) => {
      iterations++;
      expect(table.get(key)).toMatchObject([value]);
      expect(table.getKey(value)).toMatchObject([key]);
      expect(mapRef.get(key)).toMatchObject([value]);
      return true;
    });
    expect(table1.inspect()).toMatch(table.inspect());
    expect(table1).not.toEqual(table);
    // Just results < 10
    const table2 = table.filter((value) => value < 10);
    expect(table2.map((value) => value).find((value) => value > 10)).toBe(undefined);
    expect(iterations).toBe(table.size);
  });
  it('has', () => {
    for (let i = 1; i <= 26; i++) {
      expect(table.has(String.fromCharCode(i + 64))).toBe(true); // A-Z
      expect(table.has(String.fromCharCode(i + 96))).toBe(false); // a-z
    }
  });
  it('hasKey', () => {
    for (let i = 1; i <= 26; i++) {
      expect(table.hasKey(String.fromCharCode(i + 64))).toBe(true); // A-Z
      expect(table.hasKey(String.fromCharCode(i + 96))).toBe(false); // a-z
    }
  });
  it('hasValue', () => {
    for (let i = 1; i <= 26; i++) {
      expect(table.hasValue(i)).toBe(true); // A-Z
      expect(table.hasValue(i + 100)).toBe(false); // a-z
    }
  });
});

describe('conflict scenarios', () => {
  it('{A => 1} followed by {A => 2} results in {A => 1, A => 2}', () => {
    const map = new AssociationTable<string, number>();
    map.associate('A', 1);
    map.associate('A', 2);
    expect(map.get('A')).toMatchObject([1, 2]);
    expect(map.getKey(1)).toMatchObject(['A']);
    expect(map.getKey(2)).toMatchObject(['A']);
    expect(map.size).toBe(2);
  });
  it('{A => 1} followed by {B => 1} results in {A => 1, B => 1} and getKey(1) = [A, B]', () => {
    const map = new AssociationTable<string, number>();
    map.associate('A', 1);
    map.associate('B', 1);
    expect(map.get('A')).toMatchObject([1]);
    expect(map.get('B')).toMatchObject([1]);
    expect(map.getKey(1)).toMatchObject(['A', 'B']);
    expect(map.size).toBe(2);
  });
  it('deleting 1 from {A => 1, B => 1} results in empty set', () => {
    const map = new AssociationTable<string, number>();
    map.associate('A', 1);
    map.associate('B', 1);
    map.deleteValue(1);
    expect(map.get('A')).toMatchObject([]);
    expect(map.get('B')).toMatchObject([]);
    expect(map.getKey(1)).toMatchObject([]);
    expect(map.size).toBe(0);
  });
  it('deleting A from {A => 1, B => 1} results in {B => 1}', () => {
    const map = new AssociationTable<string, number>();
    map.associate('A', 1);
    map.associate('B', 1);
    map.delete('A');
    expect(map.get('A')).toMatchObject([]);
    expect(map.get('B')).toMatchObject([1]);
    expect(map.getKey(1)).toMatchObject(['B']);
    expect(map.size).toBe(1);
  });
  it('deleting 1 from {A => 1, B => 1, A => 2, A => 2} results in {A => 2, B => 2}', () => {
    const map = new AssociationTable<string, number>();
    map.associate('A', 1);
    map.associate('B', 1);
    map.associate('A', 2);
    map.associate('B', 2);
    map.deleteValue(1);
    expect(map.get('A')).toMatchObject([2]);
    expect(map.get('B')).toMatchObject([2]);
    expect(map.getKey(1)).toMatchObject([]);
    expect(map.getKey(2)).toMatchObject(['A', 'B']);
    expect(map.size).toBe(2);
  });
});
