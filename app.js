import {findAllCurrentBooks} from './queries/bookQueries.js'

const displayBooks = async () => {
    try {
        const books = await findAllCurrentBooks()
        console.log(JSON.stringify(books,null,2));
        
    } catch (error) {
        console.log(error);
        
    }
}

displayBooks()