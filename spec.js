const { Item, Shop } = require('./index.js');

describe('Gilded Rose', () => {

  let items = [];
  let item;
  let GildedRose;

  beforeEach(() => {
    items = [];
  })

  describe('Normal items', () => {

    it('lowers SellIn and Quality values by 1 before sell-by date has passed', () => {

      item = new Item('Normal Item', 4, 10);
      items.push(item);
      GildedRose = new Shop(items); 
      items = GildedRose.updateQuality();

      expect(item.sellIn).toBe(3);
      expect(item.quality).toBe(9);
    });

    it('lowers Quality by 2 after sell-by date has passed', () => {
      item = new Item('Old Item', -5, 6);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(4);
    });

    it('does not allow the Quality of an item to become negative', () => {
      item = new Item('Normal Item', 4, 0);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(0);

    });

  });

  describe('Aged Brie', () => {

    it('increases Quality by 1 before sell-by date has passed', () => {
      item = new Item('Aged Brie', 10, 10);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(11);
    });

    it('increases Quality by 2 after sell-by date has passed', () => {
      item = new Item('Aged Brie', -10, 10);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(12);
    });

    it('does not permit Quality to increase over 50', () => {
      item = new Item('Aged Brie', -10, 49);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(50);
    })

  });

  describe('Backstage Passes', () => {

    const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';

    it('increases Quality by 1 before sell-by date has passed', () => {
      item = new Item(backstagePass, 20, 10);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(11);
    });

    it('increases in Quality by 2 when SellIn is between 6 and 10', () => {
      item = new Item(backstagePass, 8, 10);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(12);

      items = GildedRose.updateQuality();

      expect(item.quality).toBe(14);
    });

    it('increases in Quality by 3 when SellIn is between 0 and 5', () => {
      item = new Item(backstagePass, 3, 10);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(13);
    });

    it('drops quality to 0 when SellIn is less than 0', () => {
      item = new Item(backstagePass, 0, 40);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(0);
    });

    it('does not permit Quality to increase over 50', () => {
      item = new Item(backstagePass, 5, 49);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(50);
    })
  });

  describe('Legendary items', () => {

    const sulfuras = 'Sulfuras, Hand of Ragnaros';

    it('never decreases Quality', () => {
      item = new Item(sulfuras, 10, 80);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(80);
    });

  });

  describe('Conjured items', () => {

    it('decreases Quality by 2 when before sell-by date has passed', () => {
      item = new Item('Conjured', 10, 10);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(8);
    });

    it('decreases in Quality by 4 when after sell-by date has passed', () => {
      item = new Item('Conjured', -10, 10);
      items.push(item);
      GildedRose = new Shop(items);
      items = GildedRose.updateQuality();

      expect(item.quality).toBe(6);
    })
  })

});