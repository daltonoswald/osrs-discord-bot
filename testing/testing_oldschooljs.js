// import { Hiscores } from 'oldschooljs';
const { Hiscores, Items, Monsters, Wiki, Clues } = require('oldschooljs')

async function fetchHiScores(username) {
    try {
        const response = await Hiscores.fetch(username)
        if (response) {
            console.log(`Results for ${username}`)
            console.log(response)
        } else {
            console.log('Error fetching')
        }
    } catch (error) {
        console.log('Error in catch')
        console.error(error)
    }
}

fetchHiScores('Daithex')
// fetchHiScores('daitheDaithe')

async function fetchItemByName(item) {
    try {
        const response = Items.get(item);
        if (response) {
            console.log(`Results for ${item}`)
            console.log(response)
        } else {
            console.log('Error fetching')
        }
    } catch (error) {
        console.log('Error in catch')
        console.error(error)
    }
}

// fetchItemByName('Twisted Bow')
// fetchItemByName('prayer potion(4')

async function simKillcount(boss, kc) {
    try {
        // boss = boss.toLowerCase()
        // boss = boss.charAt(0).toUpperCase() + String(level).slice(1).toLowerCase();
        // console.log(boss.toLowerCase())
        const response = Monsters.find(monster => monster.aliases.includes(boss.toLowerCase())).kill(kc)
        // const response = Monsters.Vorkath.kill(kc);
        if (response) {
            console.log(`Results for ${kc} kills of ${boss}`)
            let loot = response.map
            for (const [key, value] of loot) {
                let name = Items.get(key)
                loot.set(name.name, value)
                if (typeof key === 'number') {
                    loot.delete(key)
                }
            }
            console.log(loot)
        } else {
            console.log('Error fetching')
        }
    } catch (error) {
        console.log('Error in catch')
        console.error(error)
    }
}

// simKillcount('Vorkath', 10)
// simKillcount("vyrewatch", 1000)
// simKillcount('cerb', 10)

async function simClue(level, kc) {
    try {
        level = level.charAt(0).toUpperCase() + String(level).slice(1).toLowerCase();
        const response = Clues[level].open(kc);
        if (response) {
            console.log(`Results for ${kc} ${level} Clues`)
            // console.log(response)
            let loot = response.map
            for (const [key, value] of loot) {
                let name = Items.get(key)
                loot.set(name.name, value)
                if (typeof key === 'number') {
                    loot.delete(key)
                }
            }
            console.log(loot)
        } else {
            console.log('Error fetching')
        }
    } catch (error) {
        console.error(error)
    }
}

// simClue('master', 10)

async function wikiSearch(search) {
    try {
        const response = await Wiki.search(search)
        if (response) {
            console.log(`Results for ${search}`)
            console.log(response)
            console.log(`Search found these pages: ${response.map(page => page.title)}`)
        } else {
            console.log('Error fetching')
        }
    } catch (error) {
        console.error(error)
    }
}

// wikiSearch('tob')
