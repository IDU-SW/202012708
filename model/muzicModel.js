const fs = require('fs');
const pool = require('../lib/mySql');
const session = require('express-session');

class Muzic {}

    // Promise 예제
async function getMuzicList(req, res) {

    let sql = 'select * from music';

    const connection = await pool.getConnection(async conn => conn);
    try {
      [results] = await connection.query(sql);

      res.render('../views/muzicList', {data: results });
    } catch(e) {
      console.error(e);
    } finally {
      connection.release();
    }
  }

    async function addMuzic(req, res) {
        let title = req.body.title;
        let sinnger = req.body.sinnger;
        let year = req.body.year;
        let sql = 'insert into music (title, sinnger, year) values (?,?,?)';

        const connection = await pool.getConnection(async conn => conn);
        try {
        [results] = await connection.query(sql, [title, sinnger, year]);

        } catch(e) {
        console.error(e);
        } finally {
        connection.release();
        }
        res.redirect('/muzics');
    }

    async function updateMuzic(req, res) {
        let id = req.body.id;
        let title = req.body.title;
        let sinnger = req.body.sinnger;
        let year = req.body.year;

        let sql = 'update music set title = ?, sinnger = ?, year = ? where id = ?';

        const connection = await pool.getConnection(async conn => conn);
        try {
            [results] = await connection.query(sql, [title, sinnger, year, id]);
            res.render('../views/updateComplete', {data: results });
        } catch(e) {
            console.error(e);
        } finally {
            connection.release();
        }
    }

    async function updateDetailMuzic(req, res) {
        let idx = req.query.idx;
        let sql = 'select * from music where id = ?';

        const connection = await pool.getConnection(async conn => conn);
        try {
        [results] = await connection.query(sql, [idx]);
        res.render('../views/updateMuzic', {info: results[0] });
        } catch(e) {
        console.error(e);
        } finally {
        connection.release();
        }
    }

    async function deleteMuzic(req, res) {
        let idx = req.query.idx;
        let sql = 'delete from music where id = ?';

        const connection = await pool.getConnection(async conn => conn);
        try {
        [results] = await connection.query(sql, [idx]);


        } catch(e) {
        console.error(e);
        } finally {
        connection.release();
        }
        res.redirect('/muzics');
    }

    // Promise - Reject
    async function getmuzicDetail(req, res) {
        let idx = req.query.idx;
        let sql = 'select * from music where id = ?';

        const connection = await pool.getConnection(async conn => conn);
        try {
        [results] = await connection.query(sql, [idx]);

        res.render('../views/muzicDetail', {info: results[0] });
        } catch(e) {
        console.error(e);
        } finally {
        connection.release();
        }
    }

    async function login(req, res) {
        let id = req.body.id;
        let pw = req.body.pw;
        let sql = 'select * from login where userid = ? and pw = ?';

        const connection = await pool.getConnection(async conn => conn);
        try {
        [results] = await connection.query(sql, [id, pw]);
        if(results[0]){
            req.session.userid = id
        }
        } catch(e) {
        console.error(e);
        } finally {
        connection.release();
        }
    }

module.exports = {
    getMuzicList:getMuzicList,
    addMuzic:addMuzic,
    updateMuzic:updateMuzic,
    deleteMuzic:deleteMuzic,
    getmuzicDetail:getmuzicDetail,
    updateDetailMuzic:updateDetailMuzic,
    login:login
}