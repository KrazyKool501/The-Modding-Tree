addLayer("Leaves", {
    name: "Leaves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Leaves", // Name of prestige currency
    baseResource: "Acorns", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Leaves', 21)) mult = mult.times(2)
        if (hasUpgrade('Leaves', 22)) mult = mult.times(upgradeEffect('Leaves', 22))
        if (hasUpgrade('Leaves', 23)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for leaves", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Double Trouble",
            description: "Double your acorn gain",
            cost: new Decimal(1),
        },  
        12: {
            title: "Triple Trouble",
            description: "Triple your acorn gain",
            cost: new Decimal(2),
            unlocked() {
                return hasUpgrade('Leaves', 11);
            },
        },    
        13: {
            title: "Exponential Acorns",
            description: "Increase acorn gain based on your acorns",
            cost: new Decimal(4),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                return hasUpgrade('Leaves', 12);
            },
        },   
        14: {
            title: "More Leaves, More Acorns",
            description: "Increase acorn gain based on your leaves",
            cost: new Decimal(8),
            effect() {
                return player[this.layer].points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                return hasUpgrade('Leaves', 13);
            },
        }, 
        21: {
            title: "A Leaf Boost?",
            description: "Double your leaf gain",
            cost: new Decimal(12),
            unlocked() {
                return hasUpgrade('Leaves', 14);
            },
        },  
        22: {
            title: "More Acorns, More Leaves",
            description: "Increase leaf gain based on your acorns",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                return hasUpgrade('Leaves', 21);
            },
        },
        23: {
            title: "2 Currency Boost",
            description: "Double your acorns and leaves",
            cost: new Decimal(65),
            unlocked() {
                return hasUpgrade('Leaves', 22);
            },
        }, 
        24: {
            title: "The Row 2 Finale",
            description: "10x your acorns",
            cost: new Decimal(125),
            unlocked() {
                return hasUpgrade('Leaves', 23);
            },
        },  
    },
})
