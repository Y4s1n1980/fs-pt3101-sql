const directorsQueries = require('./directors')
const moviesQueries = require('./movies')
const joinsQueries = require('./directors_movies')

const checkQueries = async (queries, title) => {
    console.info(`===== ${title.toUpperCase()} =====\n`)
    for await(const [name, query] of Object.entries(queries)) {
        try {
            const result = await query()
            console.info(`> ${name} result: `, result, '\n')
        } catch(error) {
            console.info(`> something bad happens with ${name}!`)
            console.error(error)
        }
    }
    console.info('==========\n')
}

const checkQueriesByArgs = async (...queries) => {
    const queriesJoined = { ...directorsQueries, ...moviesQueries, ...joinsQueries }

    console.info(`===== Queries By Args =====\n`)
    for await (const query of queries) {
        try {
            const result = await queriesJoined[query]()
            console.info(`> ${query} result: `, result, '\n')
        } catch(error) {
            console.info(`> something bad happens with ${query}!`)
            console.error(error)
        }
    }
    console.info('==========\n')
}

const main = async () => {
    try {
        const [, , ...args] = process.argv

        if(args.length) {
            return await checkQueriesByArgs(...args)
        }

        await checkQueries(directorsQueries, 'directors')
        await checkQueries(moviesQueries, 'movies')
        await checkQueries(joinsQueries, 'joins')
    } catch(error) {
        console.info('> Something went wrong! 💣')
        console.error(error)
    }
}

main()