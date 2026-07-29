const db = require('../models');

async function getAllGenre(req, res) {
    try{
        const genres = await db.Genre.findAll();
        res.status(200).json(genres);
    } catch (error) {
        console.error('Error mengambil genre:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getGenreById(req, res) {
    const { id } = req.params;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre tidak ditemukan' });
        }
        res.status(200).json(genre);
    } catch (error) {
        console.error('Error mengambil genre by id:', error.message);
        res.status(500).json({ error: 'Gagal mengambil genre' });
    }
}

async function createGenre(req, res) {
    const { title } = req.body;
    try {
        const newGenre = await db.Genre.create({ title });
        res.status(201).json(newGenre);
    } catch (error) {
        console.error('Error membuat genre:', error.message);
        res.status(500).json({ error: 'Gagal membuat genre' });
    }
}

async function updateGenre(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre tidak ditemukan' });
        }
        genre.title = title;
        await genre.save();
        res.status(200).json(genre);
    } catch (error) {
        console.error('Error mengupdate genre:', error.message);
        res.status(500).json({ error: 'Gagal mengupdate genre' });
    }   
}

async function deleteGenre(req, res) {
    const { id } = req.params;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre tidak ditemukan' });
        }
        await genre.destroy();
        res.status(200).json({ message: 'Genre berhasil dihapus' });
    } catch (error) {
        console.error('Error menghapus genre:', error.message);
        res.status(500).json({ error: 'Gagal menghapus genre' });
    }   
}
module.exports = {
    getAllGenre,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
};