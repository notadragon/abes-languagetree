addLayer("n", {
    name: "nouns", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "nouns", // Name of prestige currency
    baseResource: "words", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        exp = new Decimal(1).div(2)
        if (hasUpgrade("n",12)) {
            exp = exp.add(new Decimal(1).div(10))
        }
        if (hasMilestone("n",0)) {
            exp = exp.add(new Decimal(1).div(10))
        }
        if (hasMilestone("n",2)) {
            exp = exp.add(new Decimal(1).div(10))
        }
        return exp
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for nouns", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Getting Started",
            description: "+0.5 words/Sec",
            cost: new Decimal(1),
        },        
        12: {
            title: "Protesting",
            description: "+0.1 Noun Exponent",
            cost: new Decimal(3),
        },        
        13: {
            title: "More Progress",
            description: "x2 words/Sec",
            cost: new Decimal(6),
        },        
        14: {
            title: "Even More Progress",
            description: "x2 words/Sec",
            cost: new Decimal(15),
        },       
        15: {
            title: "Something New",
            description: "Unlock Noun Milestones 1-4",
            cost: new Decimal(20),
        },       
        21: {
            unlocked() { return hasMilestone("n",3) },
            title: "Finishing Touch",
            description: "x3 words/Sec",
            cost: new Decimal(250),
        },       
        22: {
            unlocked() { return hasMilestone("n",3) },
            title: "More New Stuff",
            description: "Unlock Pronouns",
            cost: new Decimal(375),
        },       
    },

    milestones: {
        0: {
            unlocked() { return hasUpgrade('n', 15) },
            requirementDescription: "Typewriter",
            effectDescription: "Get 40 Nouns<br/>+0.1 Noun Exponent",
            done() { return this.unlocked() && player[this.layer].points.gte(40) }
        },
        1: {
            unlocked() { return hasUpgrade('n', 15) },
            requirementDescription: "Bad Mobile Phone",
            effectDescription: "Get 70 Nouns<br/>x3 words/Sec",
            done() { return this.unlocked() && player[this.layer].points.gte(70) }
        },
        2: {
            unlocked() { return hasUpgrade('n', 15) },
            requirementDescription: "Regular Mobile Phone",
            effectDescription: "Get 135 Nouns<br/>+0.1 Noun Exponent",
            done() { return this.unlocked() && player[this.layer].points.gte(135) }
        },
        3: {
            unlocked() { return hasUpgrade('n', 15) },
            requirementDescription: "More Space",
            effectDescription: "Get 200 Nouns<br/>Unlock 2 Upgrades",
            done() { return this.unlocked() && player[this.layer].points.gte(200) }
        },
    },        
})
