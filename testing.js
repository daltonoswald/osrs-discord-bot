async function fetchData(username) {
    const url = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${username}`
    try {
        const response = await fetch(url, {
            method: "GET",
        })
        if (response.ok) {
            const data = await response.json()
            console.log(`Data for ${username}`)
            // console.log(data.skills)
            console.log(data.activities)
        }
    } catch (error) {
        console.error(error)
    }
}

// fetchData('Daithex');
// fetchData('ha meeb dude');

async function fetchItem(item) {
    // const url = `https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${item}`
    try {
        const response = await fetch(url, {
            method: "GET",
        })
        if (response.ok) {
            const data = await response.json()
            console.log(`Data for ${item}`)
            console.log(data)
        } else {
            console.log(response)
        }
    } catch (error) {
        console.error(error)
    }
}

// Twisted Bow
// fetchItem(20997)
fetchItem('TwistedBow')
