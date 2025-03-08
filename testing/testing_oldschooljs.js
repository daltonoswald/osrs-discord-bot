// import { Hiscores } from 'oldschooljs';
const { Hiscores, Items, Monsters, Wiki } = require('oldschooljs')

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

async function fetchItemByName(item) {
    try {
        const response = await Items.get(item);
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

async function simKillcount(boss, kc) {
    try {
        // boss = boss.toLowerCase()
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

async function wikiSearch(search) {
    try {
        // const response = Monsters.find(monster => monster.name.aliases.includes(monster).kill(kc))
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

// fetchHiScores('Daithex')
// fetchHiScores('daitheDaithe')
// fetchItemByName('Twisted Bow')
// fetchItemByName('prayer potion(4')
// simKillcount('Vorkath', 1)
// simKillcount('Nex', 50)
// wikiSearch('drakes')

simKillcount('hunleff', 10)

// console.log(Monsters.find(monster => monster.aliases.includes('corp')).kill(100))