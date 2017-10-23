class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this._minQuality = 0;
    this._maxQuality = 50;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (this._isLegendary(item)) {
        continue;
      }

      this._decreaseSellIn(item);

      if (this._degradesNormally(item)) {
        this._degradeQuality(item, 1);
      } else if (this._improvesOverTime(item)) {
        this._increaseQuality(item, 1);

        if (this._isBackstagePass(item)) {
          if (this._tenDaysOrLess(item)) {
            this._increaseQuality(item, 1);
          }
          if (this._fiveDaysOrLess(item)) {
            this._increaseQuality(item, 1);
          }
        }
      } else if (this._degradesTwiceAsFast(item)) {
        this._degradeQuality(item, 2);
      }

      if (this._passedSellBy(item)) {
        if (this._isAgedBrie(item)) {
          this._increaseQuality(item, 1);
        } else if (this._isBackstagePass(item)) {
          this._setQualityToZero(item);
        } else if (this._degradesTwiceAsFast(item)) {
          this._degradeQuality(item, 2);
        } else {
          this._degradeQuality(item, 1);
        }
      }

    }

    return this.items;
  }

  _degradesNormally(item) {
    return !this._improvesOverTime(item) && !this._isConjured(item);
  }

  _improvesOverTime(item) {
    return this._isAgedBrie(item) || this._isBackstagePass(item);
  }

  _degradesTwiceAsFast(item) {
    return this._isConjured(item);
  }

  _passedSellBy(item) {
    return item.sellIn < 0;
  }

  _isLegendary(item) {
    const sulfuras = 'Sulfuras, Hand of Ragnaros';
    return item.name === sulfuras;
  }

  _isAgedBrie(item) {
    return item.name === 'Aged Brie';
  }

  _isBackstagePass(item) {
    const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
    return item.name === backstagePass;
  }

  _isConjured(item) {
    // "Conjured" items defined here as items with name as "Conjured"
    const conjured = 'Conjured';
    return item.name === conjured;
  }

  _degradeQuality(item, amount) {
    const degraded = item.quality - amount;
    item.quality = Math.max(this._minQuality, degraded);
  }

  _increaseQuality(item, amount) {
    const increased = item.quality + amount;
    item.quality = Math.min(this._maxQuality, increased);
  }

  _setQualityToZero(item) {
    item.quality = 0;
  }

  _tenDaysOrLess(item) {
    return item.sellIn <= 10 && item.sellIn >= 0;
  }

  _fiveDaysOrLess(item) {
    return item.sellIn <= 5 && item.sellIn >= 0;
  }

  _decreaseSellIn(item) {
    item.sellIn--;
  }
}

const shop = new Shop([ new Item('Aged Brie', 100, 100) ])
shop.updateQuality();
console.log(shop.items);

module.exports.Item = Item;
module.exports.Shop = Shop;
